export const SITE_URL = 'https://xj3.tech';
export const SITE_NAME = '许君山 Xu Junshan · 华北水利水电大学 AI 本科 · 个人主页';
export const SITE_DESCRIPTION =
  '许君山 (Xu Junshan)，华北水利水电大学 (NCWU) 人工智能专业 2026 届本科生，拟进入杭州电子科技大学 (HDU) 攻读硕士。专注 LLM Agent (LangGraph)、本地 RAG (向量 + BM25 + RRF 混合检索)、飞书陪伴 Agent、Java 后端 (Spring Boot)；研究 OpenClaw / DeerFlow / Claude Code / Hermes 等开源 Agent 框架的源码与上下文压缩设计。';

export const PERSON_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Xu Junshan',
  alternateName: ['许君山', 'Junshan Xu'],
  givenName: 'Junshan',
  familyName: 'Xu',
  url: SITE_URL,
  image: `${SITE_URL}/profile.jpg`,
  jobTitle: 'AI Application Developer / Backend Engineer',
  description:
    'AI undergraduate (Class of 2026) at North China University of Water Resources and Electric Power and incoming postgraduate at Hangzhou Dianzi University, focused on LLM agents, local RAG systems, and Java backend engineering.',
  disambiguatingDescription:
    'Software engineer and AI undergraduate based in China. Not affiliated with any homonymous academic researcher.',
  nationality: 'Chinese',
  alumniOf: [
    {
      '@type': 'CollegeOrUniversity',
      name: 'North China University of Water Resources and Electric Power',
      sameAs:
        'https://en.wikipedia.org/wiki/North_China_University_of_Water_Resources_and_Electric_Power',
    },
  ],
  affiliation: {
    '@type': 'CollegeOrUniversity',
    name: 'Hangzhou Dianzi University',
    sameAs: 'https://en.wikipedia.org/wiki/Hangzhou_Dianzi_University',
  },
  email: 'mailto:yuaiccc@aliyun.com',
  knowsAbout: [
    'LLM Agent',
    'LangGraph',
    'RAG',
    'Retrieval-Augmented Generation',
    'Hybrid Retrieval',
    'BM25',
    'Vector Search',
    'LangChain',
    'Feishu Open Platform',
    'GraphRAG',
    'Hugging Face',
    'PyTorch',
    'Dify',
    'OCR',
    'Python',
    'Go',
    'Java',
    'Spring Boot',
    'MyBatis',
    'Redis',
    'MySQL',
    'RabbitMQ',
    'Node.js',
    'TypeScript',
    'Next.js',
    'React',
    'Vue',
    'OpenClaw',
    'DeerFlow',
    'Claude Code',
    'Hermes',
  ],
  sameAs: [
    SITE_URL,
    'https://github.com/yuaiccc',
    'https://x.com/Hakikeioak',
  ],
};
