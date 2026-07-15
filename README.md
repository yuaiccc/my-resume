# Xu Junshan Resume

Personal resume and engineering portfolio built with Next.js.

The site supports a persistent English / Chinese switch, responsive layouts, dark and accessibility modes, and a Feishu QR contact entry.

## Live Site

- <https://xj3.tech>

## Featured Projects

- Feishuye (飞书叶): a Go companion agent with DeepSeek context planning, Feishu Open Platform integration, OceanBase hybrid retrieval, multimodal memory, and an embedded React console.
- Japanese Word Master: LangGraph agent, hybrid RAG, Supabase-backed account data, Turnstile, rate limiting, and OKX payment verification.
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
