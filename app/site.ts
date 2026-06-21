export const SITE_URL = 'https://xj3.tech';
export const SITE_NAME = 'Xu Junshan (许君山) | AI & Backend Engineer';
export const SITE_DESCRIPTION =
  'Xu Junshan (许君山) — AI undergraduate at North China University of Water Resources and Electric Power (Class of 2026), incoming postgraduate at Hangzhou Dianzi University. Builds LLM agents with LangGraph, local RAG (hybrid retrieval + rerank) and Java backend services; studies the source code of OpenClaw, DeerFlow, Claude Code, and Hermes.';

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
    'Hugging Face',
    'PyTorch',
    'Dify',
    'OCR',
    'Python',
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
