export const SITE_URL = 'https://xj3.tech';
export const SITE_NAME = '许君山的CV | Xu Junshan';
export const SITE_DESCRIPTION =
  '许君山的个人简历主页，聚焦 Java 后端、AI 应用与全栈开发，展示开源贡献、项目经历、技术栈与联系方式。';

export const PERSON_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: '许君山',
  alternateName: 'Xu Junshan',
  url: SITE_URL,
  image: `${SITE_URL}/profile.jpg`,
  jobTitle: 'Java 后端开发 / AI 应用开发',
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: '华北水利水电大学',
  },
  email: 'mailto:yuaiccc@aliyun.com',
  telephone: '157-7937-5847',
  knowsAbout: [
    'Java',
    'Spring Boot',
    'Python',
    'React',
    'Next.js',
    'OCR',
    'AI',
    'Redis',
    'MySQL',
  ],
  sameAs: [
    SITE_URL,
    'https://github.com/yuaiccc',
  ],
};
