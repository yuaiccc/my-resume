# SeekDB resume-knowledge index

This directory turns the resume site's static content (projects, experience,
capabilities, languages) into a **vector-searchable knowledge base** using
[SeekDB](https://github.com/oceanbase/seekdb) — the AI-native single-node
member of the OceanBase family, driven here through the OceanBase Qoder skill.

The point: give the site a data foundation on which we can later add a
"semantic search my work" `/api/search` route, without wiring up a hosted
vector service.

## Files

| Path | Purpose |
|---|---|
| [`data/resume_knowledge.csv`](../../data/resume_knowledge.csv) | 17-row structured knowledge base extracted from `app/page.tsx` + `app/OpenSourceProjects.tsx`. The `content` column is the text to be vectorized. |
| `scripts/seekdb/import.sh` | Vectorize the CSV and load it into SeekDB (collection `resume_knowledge`). |
| `scripts/seekdb/query.sh` | Run hybrid fulltext + semantic search against the collection. |

## Schema

Columns in the CSV → SeekDB collection:

- `id` — stable row identifier (also collection primary key)
- `category` — `Selected Project` / `Open Source` / `Experience` / `Education` / `Capability` / `Language`
- `title`, `period`, `tech`, `link` — scalar metadata (usable with `--where`)
- `content` — long-form prose, **the column that gets embedded**

Embedding model: `all-MiniLM-L6-v2`, 384 dimensions (SeekDB default).

## Quick start

```bash
# 1. Install prerequisites (one-time)
pip install pyseekdb pandas openpyxl

# 2. Import (creates ~/.seekdb embedded store, collection = resume_knowledge)
./scripts/seekdb/import.sh

# 3. Ask the resume things
./scripts/seekdb/query.sh "who has hands-on OceanBase experience?"
./scripts/seekdb/query.sh "hybrid retrieval and reranking work"
./scripts/seekdb/query.sh "Japanese language ability"
./scripts/seekdb/query.sh --where '{"category":{"$eq":"Open Source"}}' "agent"
```

Sample queries the index answers well:

| Natural-language query | Row it should surface |
|---|---|
| "graph-based memory for a chatbot" | `proj-feishu-companion` |
| "RAG evaluation harness" | `oss-arklab` |
| "PyTorch OCR training pipeline" | `proj-scene-text` |
| "Spring Boot API work" | `exp-hualan` / `cap-java-backend` |
| "reads Japanese" | `lang-ja` |

## How to regenerate

If the resume changes, edit `data/resume_knowledge.csv` (or rebuild it from
`app/page.tsx`), then rerun:

```bash
./scripts/seekdb/import.sh
```

The importer replaces the `resume_knowledge` collection in place.

## Next step (not yet wired in)

Expose this collection through a Next.js route handler at
`app/api/search/route.ts` that shells out to `query.sh` (or, better, calls
`pyseekdb` in a small companion service). The site's UI can then ship a
"Ask my resume" search box that returns matching projects/skills by meaning
instead of substring.
