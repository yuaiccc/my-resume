export const SITE_URL = 'https://xj3.tech';
export const SITE_NAME = 'Xu Junshan | Personal Site';
export const SITE_DESCRIPTION =
  'Personal website of Xu Junshan, focused on Java backend engineering, AI applications, open-source work, selected projects, and contact information.';

export const PERSON_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Xu Junshan',
  alternateName: '许君山',
  url: SITE_URL,
  image: `${SITE_URL}/profile.jpg`,
  jobTitle: 'Java Backend Engineer / AI Application Developer',
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'North China University of Water Resources and Electric Power',
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
