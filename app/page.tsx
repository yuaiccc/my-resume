import Image from 'next/image';
import AccessibilityToggle from './AccessibilityToggle';
import InteractiveEffects from './InteractiveEffects';
import OpenSourceProjects from './OpenSourceProjects';
import ScrollProgress from './ScrollProgress';
import { PERSON_SCHEMA } from './site';
import ThemeToggle from './ThemeToggle';
import VisitorBadge from './VisitorBadge';

type IconProps = { className?: string };

type TechItem = {
  name: string;
  icon: string;
  invertDark?: boolean;
};

type TechGroup = {
  title: string;
  items: TechItem[];
};

const TECH_GROUPS: TechGroup[] = [
  {
    title: 'Backend & Data',
    items: [
      { name: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg' },
      { name: 'Spring', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg' },
      { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg' },
      { name: 'R', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/r/r-original.svg' },
      { name: 'MySQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg' },
      { name: 'Redis', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg' },
    ],
  },
  {
    title: 'Frontend',
    items: [
      { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg' },
      { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' },
      { name: 'Next.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg', invertDark: true },
      { name: 'Tailwind CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg' },
    ],
  },
  {
    title: 'DevOps & Tools',
    items: [
      { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg' },
      { name: 'Linux', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg' },
      { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg' },
      { name: 'Vercel', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg', invertDark: true },
      { name: 'IntelliJ IDEA', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/intellij/intellij-original.svg' },
      { name: 'VS Code', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg' },
    ],
  },
];

const TechBadge = ({ name, icon, invertDark }: TechItem) => (
  <li className="group/list-item">
    <span className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5 transition-all duration-300 hover:scale-105 hover:border-slate-300 hover:shadow-sm dark:border-slate-700 dark:bg-slate-800 dark:hover:border-slate-600">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img 
        src={icon} 
        alt={name} 
        className={`w-5 h-5 ${invertDark ? 'dark:invert' : ''}`}
      />
      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{name}</span>
    </span>
  </li>
);

const MailIcon = ({ className = 'w-4 h-4' }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden="true">
    <rect x="3.25" y="5.25" width="17.5" height="13.5" rx="2.5" />
    <path d="M4 7.5L12 13.25L20 7.5" />
  </svg>
);

const PhoneIcon = ({ className = 'w-4 h-4' }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden="true">
    <path d="M6.6 3.75h2.55c.46 0 .87.3 1 .74l.94 3.14a1.1 1.1 0 0 1-.29 1.09l-1.5 1.5a14.35 14.35 0 0 0 4.48 4.48l1.5-1.5c.3-.3.75-.4 1.16-.27l3.07.94c.44.13.74.54.74 1v2.55a1.8 1.8 0 0 1-1.8 1.8h-.9C9.8 20.95 3.05 14.2 3.05 6.45v-.9a1.8 1.8 0 0 1 1.8-1.8H6.6Z" />
  </svg>
);

const GithubIcon = ({ className = 'w-4 h-4' }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M12 2C6.48 2 2 6.6 2 12.26c0 4.53 2.87 8.37 6.84 9.72.5.1.68-.22.68-.49 0-.24-.01-.88-.01-1.72-2.78.62-3.37-1.37-3.37-1.37-.46-1.2-1.12-1.52-1.12-1.52-.91-.64.07-.63.07-.63 1.01.08 1.55 1.07 1.55 1.07.9 1.6 2.36 1.13 2.93.86.09-.67.35-1.13.64-1.39-2.22-.26-4.56-1.15-4.56-5.13 0-1.13.39-2.06 1.03-2.78-.11-.26-.45-1.31.1-2.73 0 0 .84-.28 2.75 1.06A9.2 9.2 0 0 1 12 7.25c.83 0 1.67.12 2.45.36 1.9-1.34 2.74-1.06 2.74-1.06.56 1.42.22 2.47.11 2.73.64.72 1.03 1.65 1.03 2.78 0 3.99-2.34 4.86-4.57 5.12.36.32.69.95.69 1.92 0 1.39-.01 2.5-.01 2.84 0 .27.18.6.69.49A10.28 10.28 0 0 0 22 12.26C22 6.6 17.52 2 12 2Z" />
  </svg>
);

const GlobeIcon = ({ className = 'w-4 h-4' }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden="true">
    <circle cx="12" cy="12" r="9" />
    <path d="M3.5 12h17" />
    <path d="M12 3a14 14 0 0 1 0 18a14 14 0 0 1 0-18Z" />
  </svg>
);

export default function Resume() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(PERSON_SCHEMA) }}
      />
      <ScrollProgress />
      <InteractiveEffects />
      <div className="min-h-screen bg-slate-100 dark:bg-slate-950 py-10 px-4 sm:px-6 lg:px-8 font-sans text-gray-800 dark:text-gray-100 transition-colors duration-300">
        <div className="resume-card relative max-w-4xl mx-auto bg-white dark:bg-gray-900 shadow-lg rounded-xl overflow-hidden transition-colors duration-300 ring-1 ring-slate-200 dark:ring-slate-800">
          {/* === 头部信息 === */}
          <header className="hero-ambient relative isolate overflow-hidden bg-slate-900 text-white p-8 md:p-10 transition-colors duration-300">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -left-10 top-0 h-36 w-36 rounded-full bg-cyan-400/20 blur-3xl" />
              <div className="ambient-orb absolute right-0 top-6 h-40 w-40 rounded-full bg-blue-500/20 blur-3xl" />
              <div className="ambient-orb-delayed absolute left-1/3 bottom-[-2.5rem] h-44 w-44 rounded-full bg-violet-500/20 blur-3xl" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_45%),linear-gradient(135deg,rgba(148,163,184,0.08),transparent_55%)]" />
            </div>
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="hero-avatar-glow relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden flex-shrink-0 shadow-lg ring-1 ring-white/10">
                  <Image
                    src="/profile.jpg"
                    alt="Xu Junshan"
                    fill
                    sizes="(max-width: 768px) 80px, 96px"
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="text-center md:text-left">
                  <h1 className="text-3xl font-bold tracking-tight">Xu Junshan</h1>
                  <p className="mt-1 text-base text-blue-300 font-medium font-mono">Class of 2026 · AI Undergraduate</p>
                  <div className="mt-3 flex flex-wrap justify-center md:justify-start gap-4 text-sm text-gray-300">
                    <span>North China University of Water Resources and Electric Power · Artificial Intelligence</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2 text-sm text-gray-300 text-center md:text-right">
                <a
                  href="mailto:yuaiccc@aliyun.com"
                  className="hover:text-white transition inline-flex items-center justify-center md:justify-end gap-2"
                >
                  <MailIcon />
                  <span>yuaiccc@aliyun.com</span>
                </a>
                <a
                  href="tel:157-7937-5847"
                  className="hover:text-white transition inline-flex items-center justify-center md:justify-end gap-2"
                >
                  <PhoneIcon />
                  <span>157-7937-5847</span>
                </a>
                <a
                  href="https://github.com/yuaiccc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition inline-flex items-center justify-center md:justify-end gap-2"
                >
                  <GithubIcon />
                  <span>github.com/yuaiccc</span>
                </a>
                <a
                  href="https://xj3.tech"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 font-bold inline-flex items-center justify-center md:justify-end gap-2"
                >
                  <GlobeIcon />
                  <span>xj3.tech</span>
                </a>
              </div>
            </div>
          </header>

          <div className="p-8 md:p-12 space-y-10">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-3">
                <ThemeToggle />
                <AccessibilityToggle />
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Personal site focused on engineering work, open source, and AI projects.
              </p>
            </div>

            <OpenSourceProjects />

            <section className="animate-fade-in-up delay-200">
              <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 border-l-4 border-blue-400 pl-4 mb-6">Highlights</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div
                  data-spotlight-card
                  className="interactive-card bg-blue-50 dark:bg-blue-900/30 p-5 rounded-lg border border-blue-100 dark:border-blue-800 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
                >
                  <h3 className="font-bold text-blue-700 dark:text-blue-300 mb-2 flex items-center gap-2"><span>🌍</span> Languages</h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                    <span className="font-bold text-slate-900 dark:text-slate-100">English CET-6 (538)</span>: comfortable using English in day-to-day collaboration and technical discussions.<br />
                    <span className="font-bold text-slate-900 dark:text-slate-100">Japanese JLPT N3</span>: able to read basic technical materials and adapt to Japan-facing development contexts.
                  </p>
                </div>
                <div
                  data-spotlight-card
                  className="interactive-card bg-blue-50 dark:bg-blue-900/30 p-5 rounded-lg border border-blue-100 dark:border-blue-800 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
                >
                  <h3 className="font-bold text-blue-700 dark:text-blue-300 mb-2 flex items-center gap-2"><span>⚙️</span> Engineering Workflow</h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                    Strong with <span className="font-bold">Git, Linux, and Docker</span> workflows; experienced in cross-platform dependency debugging; productive with AI-native tools such as Trae, Claude Code, and Codex.
                  </p>
                </div>
              </div>
            </section>

            <section className="animate-fade-in-up delay-300">
              <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 border-l-4 border-blue-400 pl-4 mb-6">Tech Stack</h2>
              <div
                data-spotlight-card
                className="interactive-card bg-slate-50 dark:bg-slate-900 p-6 rounded-xl border border-gray-200 dark:border-gray-800 space-y-6"
              >
                {TECH_GROUPS.map((group) => (
                  <div key={group.title} className="space-y-3">
                    <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-[0.14em] font-mono">
                      {group.title}
                    </h3>
                    <ul className="flex flex-wrap gap-3" aria-label={group.title}>
                      {group.items.map((item) => (
                        <TechBadge key={item.name} {...item} />
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            <section className="animate-fade-in-up delay-400">
              <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 border-l-4 border-blue-400 pl-4 mb-6">Education</h2>
              <div className="p-5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors border border-transparent hover:border-gray-100 dark:hover:border-gray-700">
                <div className="flex flex-col sm:flex-row justify-between sm:items-baseline mb-2">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">North China University of Water Resources and Electric Power</h3>
                  <span className="text-sm text-gray-500 dark:text-gray-400 font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">Sep 2022 - Jun 2026</span>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-2">B.Eng. in Artificial Intelligence / <span className="font-medium text-blue-500">GPA: 3.16</span> / Member of the Communist Youth League</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 inline-block px-3 py-1 rounded-full border border-blue-100 dark:border-blue-800">
                  Academic Excellence Scholarship
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">
                  <span className="font-medium">Core coursework:</span> Operating Systems, Data Structures, Linear Algebra, Natural Language Processing, Computer Networks, and Software Engineering
                </p>
              </div>
            </section>

            <section className="animate-fade-in-up delay-500">
              <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 border-l-4 border-blue-400 pl-4 mb-6">Capabilities</h2>
              <div className="space-y-4">
                <div className="group p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors border border-transparent hover:border-gray-100 dark:hover:border-gray-700">
                  <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-1 group-hover:text-blue-500 transition-colors">Java Backend Foundations</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Comfortable with Java fundamentals including HashMap, JUC, and JVM concepts; experienced in building production-style applications with <span className="font-medium text-blue-500">Spring Boot + MyBatis</span>; familiar with MVC and RESTful design.</p>
                </div>
                <div className="group p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors border border-transparent hover:border-gray-100 dark:hover:border-gray-700">
                  <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-1 group-hover:text-blue-500 transition-colors">Data and Middleware</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Working knowledge of <span className="font-medium text-blue-500">MySQL</span> covering indexing, transactions, and SQL tuning; hands-on with <span className="font-medium text-blue-500">Redis</span> data structures and caching patterns; familiar with RabbitMQ for asynchronous decoupling.</p>
                </div>
                <div className="group p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors border border-transparent hover:border-gray-100 dark:hover:border-gray-700">
                  <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-1 group-hover:text-blue-500 transition-colors">DevOps and Delivery</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Comfortable with automated deployment through <span className="font-medium text-blue-500">Vercel CI/CD + GitHub</span>; familiar with common Linux workflows and Nginx configuration.</p>
                </div>
              </div>
            </section>

            <section className="animate-fade-in-up delay-600">
              <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 border-l-4 border-blue-400 pl-4 mb-6">Selected Projects</h2>

              <div
                data-spotlight-card
                className="interactive-card mb-6 p-5 rounded-lg border border-gray-100 dark:border-gray-700 hover:shadow-md hover:border-blue-200 dark:hover:border-blue-800 transition-all duration-300 group"
              >
                <div className="flex flex-col sm:flex-row justify-between sm:items-baseline mb-2">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-500 transition-colors">Mall E-commerce Admin System</h3>
                  <span className="text-sm text-gray-500 dark:text-gray-400 font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded mt-2 sm:mt-0">Jan 2026 - Feb 2026</span>
                </div>
                <p className="text-sm text-blue-500 font-medium mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-500" />
                  Java Backend Development | Spring Boot + Redis + JWT + MySQL
                </p>
                <ul className="list-disc list-outside ml-5 space-y-2.5 text-sm text-gray-700 dark:text-gray-300">
                  <li><span className="font-bold text-slate-800 dark:text-slate-100">Environment setup:</span> Independently bootstrapped the local development environment, resolving cross-origin and environment consistency issues in a front-end/back-end separated architecture.</li>
                  <li><span className="font-bold text-slate-800 dark:text-slate-100">API delivery:</span> Implemented product management and authentication APIs with a <span className="font-semibold text-slate-900 dark:text-slate-200">Controller-Service-Mapper</span> architecture, using <span className="font-semibold text-slate-900 dark:text-slate-200">Swagger</span> for collaborative debugging.</li>
                  <li><span className="font-bold text-slate-800 dark:text-slate-100">Security:</span> Built stateless authentication with <span className="font-semibold text-slate-900 dark:text-slate-200">Spring Security + JWT</span>, including permission interception and token renewal strategies.</li>
                </ul>
              </div>

              <div
                data-spotlight-card
                className="interactive-card p-5 rounded-lg border border-gray-100 dark:border-gray-700 hover:shadow-md hover:border-blue-200 dark:hover:border-blue-800 transition-all duration-300 group"
              >
                <div className="flex flex-col sm:flex-row justify-between sm:items-baseline mb-2">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-500 transition-colors">Multilingual Scene Text Recognition System</h3>
                  <span className="text-sm text-gray-500 dark:text-gray-400 font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded mt-2 sm:mt-0">Dec 2025 - Present</span>
                </div>
                <p className="text-sm text-blue-500 font-medium mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-500" />
                  End-to-end Owner | Python + PyTorch + Linux
                </p>
                <ul className="list-disc list-outside ml-5 space-y-2.5 text-sm text-gray-700 dark:text-gray-300">
                  <li><span className="font-bold text-slate-800 dark:text-slate-100">Data engineering:</span> Cleaned and assembled a corpus of <span className="font-bold text-blue-600 dark:text-blue-400">1.13 million lines</span>; fixed rendering bugs in open-source tooling and generated more than 100,000 high-quality synthetic training samples.</li>
                  <li><span className="font-bold text-slate-800 dark:text-slate-100">Performance tuning:</span> Converted large collections of small images into an <span className="font-semibold text-slate-900 dark:text-slate-200">LMDB dataset</span>, pushed <span className="font-semibold text-slate-900 dark:text-slate-200">batch size to 768</span>, and reduced validation time from hours to minutes.</li>
                  <li><span className="font-bold text-slate-800 dark:text-slate-100">Model outcome:</span> Reached <span className="font-bold text-blue-600 dark:text-blue-400">98.3%</span> validation accuracy and solved recognition issues involving overlapping Traditional Chinese and Japanese characters.</li>
                </ul>
              </div>
            </section>

            <section className="animate-fade-in-up delay-700">
              <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 border-l-4 border-blue-400 pl-4 mb-6">Experience</h2>

              <div className="mb-6 p-5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors border border-transparent hover:border-gray-100 dark:hover:border-gray-700 relative">
                <div className="absolute left-0 top-6 w-1 h-full bg-gray-200 dark:bg-gray-700 -ml-2 hidden sm:block" />
                <div className="flex flex-col sm:flex-row justify-between sm:items-baseline mb-2 relative">
                  <div className="absolute left-[-13px] top-1.5 w-3 h-3 rounded-full bg-blue-400 hidden sm:block" />
                  <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">Shaanxi Blue Ocean Information Technology</h3>
                  <span className="text-sm text-gray-500 dark:text-gray-400 font-mono">Sep 2025 - Oct 2025</span>
                </div>
                <p className="text-sm text-blue-500 font-medium mb-2">Software Engineering Intern / Backend</p>
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                  Participated in requirement reviews for an enterprise OA system, implemented business APIs with Spring Boot, standardized response wrappers, and independently resolved Maven dependency conflicts during front-end integration.
                </p>
              </div>

              <div className="p-5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors border border-transparent hover:border-gray-100 dark:hover:border-gray-700 relative">
                <div className="absolute left-0 top-6 w-1 h-full bg-gray-200 dark:bg-gray-700 -ml-2 hidden sm:block" />
                <div className="flex flex-col sm:flex-row justify-between sm:items-baseline mb-2 relative">
                  <div className="absolute left-[-13px] top-1.5 w-3 h-3 rounded-full bg-blue-400 hidden sm:block" />
                  <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">Henan Hualan Information Technology Group</h3>
                  <span className="text-sm text-gray-500 dark:text-gray-400 font-mono">Apr 2025 - Jun 2025</span>
                </div>
                <p className="text-sm text-blue-500 font-medium mb-2">LLM Application Intern</p>
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                  Deployed large language models in Linux environments, benchmarked inference speed, and designed AI agent workflows on Coze to validate end-to-end business scenarios.
                </p>
              </div>
            </section>

            <footer className="mt-12 pt-8 pb-4 border-t border-gray-200 dark:border-gray-700 text-center text-sm text-gray-400 space-y-6">
              <div className="flex justify-center">
                <VisitorBadge />
              </div>
              <p>© 2026 Xu Junshan.</p>
            </footer>
          </div>
        </div>
      </div>
    </>
  );
}
