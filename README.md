# Xu Junshan Resume

Personal resume and engineering portfolio built with Next.js.

## Live Site

- <https://xj3.tech>

## Featured Projects

- Japanese Word Master: LangGraph agent, hybrid RAG, Supabase-backed account data, Turnstile, rate limiting, and OKX payment verification.
- Feishu Companion Bot: Go + Feishu Open Platform companion agent with GraphRAG memory, OceanBase / MySQL-compatible storage, and an embedded React console.
- Multilingual Scene Text Recognition: PyTorch OCR training pipeline and multilingual synthetic-data workflow.

## Local Development

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

## Content

- `app/page.tsx`: resume content and selected projects.
- `app/OpenSourceProjects.tsx`: expandable open-source project cards.
- `app/site.ts`: SEO metadata and structured profile text.
- `public/Xu_Junshan_Resume.pdf`: downloadable static resume.

## Verification

```bash
npm run lint
npm run build
```
