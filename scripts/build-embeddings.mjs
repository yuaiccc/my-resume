#!/usr/bin/env node
/**
 * Build `data/resume_index.json` from `data/resume_knowledge.csv`.
 *
 * Uses the `jina` CLI (https://github.com/jina-ai/cli) to embed each row's
 * `content` column with `retrieval.passage` task hint, then writes a compact
 * JSON index that `app/api/search/route.ts` loads at cold start.
 *
 * Requires:
 *   - `jina` on PATH (uv tool install jina-cli)
 *   - JINA_API_KEY in env (or in .env.local)
 *
 * Run:
 *   npm run build:index
 */

import { spawnSync } from 'node:child_process';
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const REPO_ROOT = resolve(new URL('..', import.meta.url).pathname);
const CSV_PATH = resolve(REPO_ROOT, 'data/resume_knowledge.csv');
const OUT_PATH = resolve(REPO_ROOT, 'data/resume_index.json');
const MODEL = process.env.JINA_MODEL || 'jina-embeddings-v3';
const PASSAGE_TASK = 'retrieval.passage';

function loadEnvLocal() {
  const envFile = resolve(REPO_ROOT, '.env.local');
  if (!existsSync(envFile)) return;
  for (const line of readFileSync(envFile, 'utf8').split('\n')) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (!m) continue;
    const [, key, rawValue] = m;
    if (process.env[key]) continue;
    const value = rawValue.replace(/^['"]|['"]$/g, '');
    process.env[key] = value;
  }
}

/** Minimal RFC 4180 CSV parser (handles quoted fields and embedded commas / newlines / "" escapes). */
function parseCsv(text) {
  const rows = [];
  let field = '';
  let row = [];
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') { field += '"'; i++; }
        else { inQuotes = false; }
      } else {
        field += c;
      }
    } else {
      if (c === '"') inQuotes = true;
      else if (c === ',') { row.push(field); field = ''; }
      else if (c === '\n') { row.push(field); rows.push(row); row = []; field = ''; }
      else if (c === '\r') { /* skip */ }
      else field += c;
    }
  }
  if (field.length > 0 || row.length > 0) { row.push(field); rows.push(row); }
  const header = rows.shift();
  return rows
    .filter((r) => r.length === header.length && r.some((cell) => cell.trim() !== ''))
    .map((r) => Object.fromEntries(header.map((h, idx) => [h, r[idx]])));
}

function passageText(title, tech, content) {
  const bits = [title];
  if (tech && tech.trim()) bits.push(`(${tech})`);
  bits.push(content);
  return bits.filter(Boolean).join('\n');
}

function pickZh(row, key) {
  // fall back to the en field if the zh column is blank, so the index stays
  // symmetric (each language always has 17 vectors) and search never 404s
  const zh = (row[`${key}_zh`] || '').trim();
  return zh || row[key] || '';
}

function embed(text) {
  const args = ['embed', text, '--model', MODEL, '--task', PASSAGE_TASK, '--json'];
  const result = spawnSync('jina', args, { encoding: 'utf8', env: process.env });
  if (result.status !== 0) {
    process.stderr.write(result.stderr || '');
    throw new Error(`jina embed exited with ${result.status}`);
  }
  const parsed = JSON.parse(result.stdout);
  // CLI's --json shape: { data: [{ embedding: [...] }, ...], model, usage } or { embedding: [...] }
  const vec =
    parsed?.data?.[0]?.embedding ??
    parsed?.embeddings?.[0] ??
    parsed?.embedding ??
    (Array.isArray(parsed) ? parsed[0]?.embedding ?? parsed[0] : null);
  if (!Array.isArray(vec)) {
    throw new Error(`unexpected jina embed output: ${result.stdout.slice(0, 200)}`);
  }
  return { vector: vec, resolvedModel: parsed?.model ?? MODEL };
}

function main() {
  loadEnvLocal();
  if (!process.env.JINA_API_KEY) {
    console.error('error: JINA_API_KEY not set. Put it in .env.local or export it, then rerun.');
    process.exit(1);
  }
  if (!existsSync(CSV_PATH)) {
    console.error(`error: CSV not found at ${CSV_PATH}`);
    process.exit(1);
  }

  const rows = parseCsv(readFileSync(CSV_PATH, 'utf8'));
  console.log(`csv rows : ${rows.length}`);
  console.log(`model    : ${MODEL}`);
  console.log(`task     : ${PASSAGE_TASK}`);
  console.log();

  const records = [];
  let resolvedModel = MODEL;
  let dimensions = 0;
  const total = rows.length * 2; // en + zh
  let step = 0;
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];

    // --- en pass ---
    step += 1;
    const enPassage = passageText(row.title, row.tech, row.content);
    process.stdout.write(`  [${step.toString().padStart(2)}/${total}] ${row.id.padEnd(24)} en ... `);
    const { vector: enVec, resolvedModel: m1 } = embed(enPassage);
    resolvedModel = m1;
    dimensions = enVec.length;
    console.log(`ok (${enVec.length}d)`);

    // --- zh pass ---
    step += 1;
    const zhTitle = pickZh(row, 'title');
    const zhTech = pickZh(row, 'tech');
    const zhContent = pickZh(row, 'content');
    const zhPassage = passageText(zhTitle, zhTech, zhContent);
    process.stdout.write(`  [${step.toString().padStart(2)}/${total}] ${row.id.padEnd(24)} zh ... `);
    const { vector: zhVec } = embed(zhPassage);
    console.log(`ok (${zhVec.length}d)`);

    records.push({
      id: row.id,
      category: row.category,
      link: row.link,
      en: {
        title: row.title,
        period: row.period,
        tech: row.tech,
        content: row.content,
        embedding: enVec,
      },
      zh: {
        title: zhTitle,
        period: pickZh(row, 'period'),
        tech: zhTech,
        content: zhContent,
        embedding: zhVec,
      },
    });
  }

  const index = {
    model: resolvedModel,
    dimensions,
    task: PASSAGE_TASK,
    generated_at: new Date().toISOString(),
    records,
  };
  writeFileSync(OUT_PATH, JSON.stringify(index) + '\n');
  const bytes = readFileSync(OUT_PATH).byteLength;
  console.log();
  console.log(`wrote ${OUT_PATH} (${(bytes / 1024).toFixed(1)} KB, ${records.length} records)`);
}

main();
