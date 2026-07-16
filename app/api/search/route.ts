import { NextRequest, NextResponse } from 'next/server';
import indexData from '@/data/resume_index.json';

// Runs on Vercel Node runtime so `import` of the pre-built index bundles the
// JSON into the function payload (no filesystem read at cold start).
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type Record = {
  id: string;
  category: string;
  title: string;
  period: string;
  tech: string;
  link: string;
  content: string;
  embedding: number[];
};

type Index = {
  model: string;
  dimensions: number;
  task: string;
  generated_at: string | null;
  records: Record[];
};

const INDEX = indexData as unknown as Index;

// Pre-normalize the passage vectors once so /search is just a dot product.
const NORMALIZED: { record: Record; norm: number[] }[] = INDEX.records.map((r) => ({
  record: r,
  norm: normalize(r.embedding),
}));

function normalize(vec: number[]): number[] {
  let sumSq = 0;
  for (let i = 0; i < vec.length; i++) sumSq += vec[i] * vec[i];
  const len = Math.sqrt(sumSq) || 1;
  const out = new Array<number>(vec.length);
  for (let i = 0; i < vec.length; i++) out[i] = vec[i] / len;
  return out;
}

function dot(a: number[], b: number[]): number {
  let s = 0;
  const n = Math.min(a.length, b.length);
  for (let i = 0; i < n; i++) s += a[i] * b[i];
  return s;
}

async function embedQuery(query: string, apiKey: string): Promise<number[]> {
  const res = await fetch('https://api.jina.ai/v1/embeddings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: INDEX.model || 'jina-embeddings-v3',
      task: 'retrieval.query',
      input: [query],
    }),
    cache: 'no-store',
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`jina embeddings API ${res.status}: ${text.slice(0, 200)}`);
  }
  const json = await res.json();
  const vec = json?.data?.[0]?.embedding;
  if (!Array.isArray(vec)) throw new Error('unexpected jina API response shape');
  return vec;
}

export async function GET(request: NextRequest) {
  const query = (request.nextUrl.searchParams.get('q') || '').trim();
  const topK = Math.min(
    Math.max(Number(request.nextUrl.searchParams.get('k') || '5') | 0, 1),
    10,
  );

  if (!query) {
    return NextResponse.json({ error: 'missing ?q= parameter' }, { status: 400 });
  }
  if (query.length > 400) {
    return NextResponse.json({ error: 'query too long (max 400 chars)' }, { status: 400 });
  }
  if (NORMALIZED.length === 0) {
    return NextResponse.json(
      { error: 'index is empty — run `npm run build:index` first' },
      { status: 503 },
    );
  }

  const apiKey = process.env.JINA_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: 'server missing JINA_API_KEY env var' },
      { status: 500 },
    );
  }

  let queryVec: number[];
  try {
    queryVec = await embedQuery(query, apiKey);
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'embed failed' },
      { status: 502 },
    );
  }
  const q = normalize(queryVec);

  const scored = NORMALIZED.map(({ record, norm }) => ({
    id: record.id,
    category: record.category,
    title: record.title,
    period: record.period,
    tech: record.tech,
    link: record.link,
    content: record.content,
    score: dot(q, norm),
  }));
  scored.sort((a, b) => b.score - a.score);

  return NextResponse.json(
    {
      query,
      model: INDEX.model,
      results: scored.slice(0, topK),
    },
    { headers: { 'Cache-Control': 'no-store' } },
  );
}
