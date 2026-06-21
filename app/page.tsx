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
    title: 'AI & ML',
    items: [
      { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg' },
      { name: 'PyTorch', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pytorch/pytorch-original.svg' },
      { name: 'Hugging Face', icon: 'https://cdn.simpleicons.org/huggingface/FFD21E' },
      { name: 'LangChain', icon: 'https://cdn.simpleicons.org/langchain/1C3C3C', invertDark: true },
      { name: 'LangGraph', icon: 'https://cdn.simpleicons.org/langchain/1C3C3C', invertDark: true },
      { name: 'Ollama', icon: 'https://cdn.simpleicons.org/ollama/000000', invertDark: true },
      { name: 'Dify', icon: 'https://cdn.simpleicons.org/dify/000000', invertDark: true },
      { name: 'FastAPI', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg' },
    ],
  },
  {
    title: 'Frontend',
    items: [
      { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg' },
      { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' },
      { name: 'Next.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg', invertDark: true },
      { name: 'Vue', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vuejs/vuejs-original.svg' },
      { name: 'Tailwind CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg' },
    ],
  },
  {
    title: 'Backend & Data',
    items: [
      { name: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg' },
      { name: 'Spring', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg' },
      { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg' },
      { name: 'Express', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg', invertDark: true },
      { name: 'MySQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg' },
      { name: 'SQLite', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sqlite/sqlite-original.svg' },
      { name: 'Redis', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg' },
      { name: 'RabbitMQ', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/rabbitmq/rabbitmq-original.svg' },
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

const GithubIcon = ({ className = 'w-4 h-4' }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M12 2C6.48 2 2 6.6 2 12.26c0 4.53 2.87 8.37 6.84 9.72.5.1.68-.22.68-.49 0-.24-.01-.88-.01-1.72-2.78.62-3.37-1.37-3.37-1.37-.46-1.2-1.12-1.52-1.12-1.52-.91-.64.07-.63.07-.63 1.01.08 1.55 1.07 1.55 1.07.9 1.6 2.36 1.13 2.93.86.09-.67.35-1.13.64-1.39-2.22-.26-4.56-1.15-4.56-5.13 0-1.13.39-2.06 1.03-2.78-.11-.26-.45-1.31.1-2.73 0 0 .84-.28 2.75 1.06A9.2 9.2 0 0 1 12 7.25c.83 0 1.67.12 2.45.36 1.9-1.34 2.74-1.06 2.74-1.06.56 1.42.22 2.47.11 2.73.64.72 1.03 1.65 1.03 2.78 0 3.99-2.34 4.86-4.57 5.12.36.32.69.95.69 1.92 0 1.39-.01 2.5-.01 2.84 0 .27.18.6.69.49A10.28 10.28 0 0 0 22 12.26C22 6.6 17.52 2 12 2Z" />
  </svg>
);

const XIcon = ({ className = 'w-4 h-4' }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231L18.244 2.25Zm-1.161 17.52h1.833L7.084 4.126H5.117l11.966 15.644Z" />
  </svg>
);

const ClaudeIcon = ({ className = 'w-3.5 h-3.5 inline-block align-[-2px]' }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="#D97757" className={className} aria-hidden="true">
    <rect x="11" y="2" width="2" height="20" rx="1" />
    <rect x="2" y="11" width="20" height="2" rx="1" />
    <g transform="rotate(45 12 12)">
      <rect x="11" y="3.5" width="2" height="17" rx="1" />
      <rect x="3.5" y="11" width="17" height="2" rx="1" />
    </g>
  </svg>
);

const OpenAiIcon = ({ className = 'w-3.5 h-3.5 inline-block align-[-2px]' }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={`${className} text-slate-900 dark:text-slate-100`} aria-hidden="true">
    <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728v5.6775a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654 2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z" />
  </svg>
);

const FLAG_BASE = 'h-3.5 w-auto rounded-[2px] shadow-[0_0_0_0.5px_rgba(0,0,0,0.15)] inline-block align-[-2px]';

const GbFlag = ({ className = FLAG_BASE }: IconProps) => (
  <svg viewBox="0 0 30 20" className={className} aria-label="United Kingdom" role="img">
    <rect width="30" height="20" fill="#012169" />
    <path d="M0,0 L30,20 M30,0 L0,20" stroke="#ffffff" strokeWidth="3" />
    <path d="M0,0 L30,20 M30,0 L0,20" stroke="#C8102E" strokeWidth="1.4" />
    <rect x="13" width="4" height="20" fill="#ffffff" />
    <rect y="8" width="30" height="4" fill="#ffffff" />
    <rect x="14" width="2" height="20" fill="#C8102E" />
    <rect y="9" width="30" height="2" fill="#C8102E" />
  </svg>
);

const JpFlag = ({ className = FLAG_BASE }: IconProps) => (
  <svg viewBox="0 0 30 20" className={className} aria-label="Japan" role="img">
    <rect width="30" height="20" fill="#ffffff" />
    <circle cx="15" cy="10" r="6" fill="#bc002d" />
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
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 px-4 sm:px-6 lg:px-8 font-sans text-gray-800 dark:text-gray-100 transition-colors duration-300">
        <div className="resume-card relative max-w-4xl mx-auto bg-white dark:bg-gray-900 shadow-sm rounded-xl overflow-hidden transition-colors duration-300 ring-1 ring-slate-200 dark:ring-slate-800">
          {/* === 头部信息 === */}
          <header className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white p-6 md:p-8 transition-colors duration-300 border-b border-slate-100 dark:border-slate-800">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="hero-avatar-glow relative w-20 sm:w-24 aspect-[1290/1733] rounded-xl overflow-hidden flex-shrink-0 shadow-md ring-1 ring-slate-200 dark:ring-white/10">
                  <Image
                    src="/profile.jpg"
                    alt="Xu Junshan"
                    fill
                    sizes="(max-width: 768px) 80px, 96px"
                    className="object-cover object-top"
                    priority
                  />
                </div>
                <div className="text-center md:text-left">
                  <h1
                    title="许君山"
                    className="text-4xl sm:text-5xl font-semibold bg-gradient-to-r from-cyan-600 via-blue-600 to-violet-600 bg-clip-text text-transparent bg-[length:300%_100%] animate-[gradientShift_6s_ease-in-out_infinite] cursor-help"
                  >
                    Xu Junshan
                    <span lang="zh-CN" className="sr-only">（许君山）</span>
                  </h1>
                  <p className="mt-1 text-base text-blue-600 dark:text-blue-300 font-medium font-mono">Class of 2026 · AI Undergraduate</p>
                </div>
              </div>
              <div className="flex flex-col gap-2 text-sm text-slate-600 dark:text-gray-300 text-center md:text-right">
                <a
                  href="mailto:yuaiccc@aliyun.com"
                  className="hover:text-slate-900 dark:hover:text-white transition inline-flex items-center justify-center md:justify-end gap-2"
                >
                  <MailIcon />
                  <span>yuaiccc@aliyun.com</span>
                </a>
                <a
                  href="https://github.com/yuaiccc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-slate-900 dark:hover:text-white transition inline-flex items-center justify-center md:justify-end gap-2"
                >
                  <GithubIcon />
                  <span>github.com/yuaiccc</span>
                </a>
                <a
                  href="https://x.com/Hakikeioak"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-slate-900 dark:hover:text-white transition inline-flex items-center justify-center md:justify-end gap-2"
                >
                  <XIcon />
                  <span>x.com/Hakikeioak</span>
                </a>
              </div>
            </div>
          </header>

          <div className="p-6 sm:p-8 md:p-10 space-y-8">
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
              <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 border-l-[3px] border-blue-500 pl-3 mb-4">Highlights</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div
                  data-spotlight-card
                  className="interactive-card bg-blue-50 dark:bg-blue-900/30 p-5 rounded-lg border border-blue-100 dark:border-blue-800 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
                >
                  <h3 className="font-bold text-blue-700 dark:text-blue-300 mb-2">Languages</h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                    <GbFlag /> <span className="font-bold text-slate-900 dark:text-slate-100">English CET-6 (538)</span>: comfortable using English in day-to-day collaboration and technical discussions.<br />
                    <JpFlag /> <span className="font-bold text-slate-900 dark:text-slate-100">Japanese JLPT N3</span>: able to read basic technical materials and adapt to Japan-facing development contexts.
                  </p>
                </div>
                <div
                  data-spotlight-card
                  className="interactive-card bg-blue-50 dark:bg-blue-900/30 p-5 rounded-lg border border-blue-100 dark:border-blue-800 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
                >
                  <h3 className="font-bold text-blue-700 dark:text-blue-300 mb-2">Engineering Workflow</h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                    Strong with <span className="font-bold">Git, Linux, and Docker</span> workflows; experienced in cross-platform dependency debugging; productive with AI-native tools such as <span className="inline-flex items-center gap-1 font-medium"><ClaudeIcon /> Claude Code</span> and <span className="inline-flex items-center gap-1 font-medium"><OpenAiIcon /> Codex</span>.
                  </p>
                </div>
              </div>
            </section>

            <section className="animate-fade-in-up delay-300">
              <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 border-l-[3px] border-blue-500 pl-3 mb-4">Tech Stack</h2>
              <div
                data-spotlight-card
                className="interactive-card bg-slate-50 dark:bg-slate-900 p-5 rounded-xl border border-gray-200 dark:border-gray-800 space-y-4"
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
              <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 border-l-[3px] border-blue-500 pl-3 mb-4">Education</h2>
              <div className="space-y-3">
                <div className="p-5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors border border-transparent hover:border-gray-100 dark:hover:border-gray-700">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-2 gap-2">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex items-center rounded-md bg-slate-900 px-2 py-1 ring-1 ring-slate-800">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="/hdu-logo.svg" alt="Hangzhou Dianzi University logo" className="h-5 w-auto" />
                      </span>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">Hangzhou Dianzi University</h3>
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400 font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">Sep 2026 - (expected)</span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-2">Postgraduate (Incoming)</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 inline-block px-3 py-1 rounded-full border border-amber-100 dark:border-amber-800">
                    Incoming · Fall 2026
                  </p>
                </div>

                <div className="p-5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors border border-transparent hover:border-gray-100 dark:hover:border-gray-700">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-2 gap-2">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex items-center rounded-md bg-slate-900 px-2 py-1 ring-1 ring-slate-800">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="/ncwu-logo.png" alt="NCWU logo" className="h-5 w-auto" />
                      </span>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">North China University of Water Resources and Electric Power</h3>
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400 font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">Sep 2022 - Jun 2026</span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-2">B.Eng. in Artificial Intelligence / <span className="font-medium text-blue-500">GPA: 3.16</span></p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 inline-block px-3 py-1 rounded-full border border-blue-100 dark:border-blue-800">
                    Academic Excellence Scholarship
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">
                    <span className="font-medium">Core coursework:</span> Operating Systems, Data Structures, Linear Algebra, Natural Language Processing, Computer Networks, and Software Engineering
                  </p>
                </div>
              </div>
            </section>

            <section className="animate-fade-in-up delay-500">
              <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 border-l-[3px] border-blue-500 pl-3 mb-4">Capabilities</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="group p-4 rounded-lg bg-slate-50/70 dark:bg-slate-800/40 hover:bg-slate-50 dark:hover:bg-slate-800/70 transition-colors border border-slate-100 dark:border-slate-800 hover:border-slate-200 dark:hover:border-slate-700">
                  <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-1 group-hover:text-blue-500 transition-colors">LLM & Agent Systems</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Build agentic apps with <span className="font-medium text-blue-500">LangGraph</span> orchestration and local <span className="font-medium text-blue-500">RAG</span> (hybrid retrieval + rerank, RAGAS-style evaluation); studied the source code of mainstream agent frameworks — <span className="font-medium text-blue-500">OpenClaw, DeerFlow, Claude Code, and Hermes</span> — to understand their multi-agent orchestration, task scheduling, and context-management trade-offs.</p>
                </div>
                <div className="group p-4 rounded-lg bg-slate-50/70 dark:bg-slate-800/40 hover:bg-slate-50 dark:hover:bg-slate-800/70 transition-colors border border-slate-100 dark:border-slate-800 hover:border-slate-200 dark:hover:border-slate-700">
                  <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-1 group-hover:text-blue-500 transition-colors">Java Backend Foundations</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Built production APIs with <span className="font-medium text-blue-500">Spring Boot + MyBatis</span> following MVC and RESTful conventions; applied HashMap, JUC, and JVM internals to diagnose concurrency and performance issues.</p>
                </div>
                <div className="group p-4 rounded-lg bg-slate-50/70 dark:bg-slate-800/40 hover:bg-slate-50 dark:hover:bg-slate-800/70 transition-colors border border-slate-100 dark:border-slate-800 hover:border-slate-200 dark:hover:border-slate-700">
                  <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-1 group-hover:text-blue-500 transition-colors">Data and Middleware</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Optimized <span className="font-medium text-blue-500">MySQL</span> queries with index tuning and transaction design; implemented <span className="font-medium text-blue-500">Redis</span> caching strategies for hot-path data; integrated RabbitMQ for asynchronous task decoupling.</p>
                </div>
                <div className="group p-4 rounded-lg bg-slate-50/70 dark:bg-slate-800/40 hover:bg-slate-50 dark:hover:bg-slate-800/70 transition-colors border border-slate-100 dark:border-slate-800 hover:border-slate-200 dark:hover:border-slate-700">
                  <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-1 group-hover:text-blue-500 transition-colors">DevOps and Delivery</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Shipped projects end-to-end through <span className="font-medium text-blue-500">Vercel CI/CD + GitHub</span> pipelines; managed Linux servers and configured Nginx for reverse proxy and static hosting.</p>
                </div>
              </div>
            </section>

            <section className="animate-fade-in-up delay-600">
              <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 border-l-[3px] border-blue-500 pl-3 mb-4">Selected Projects</h2>

              <div
                data-spotlight-card
                className="interactive-card mb-4 p-5 rounded-lg border border-gray-100 dark:border-gray-700 hover:shadow-md hover:border-blue-200 dark:hover:border-blue-800 transition-all duration-300 group"
              >
                <div className="flex flex-col sm:flex-row justify-between sm:items-baseline mb-2 gap-2">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-500 transition-colors flex items-center gap-2 flex-wrap">
                    <span>Japanese Word Master — LangGraph Agent + Local RAG</span>
                    <a
                      href="https://github.com/yuaiccc/japanese-verb-master"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-blue-500 dark:text-slate-400 dark:hover:text-blue-400 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 px-2 py-0.5 rounded-md transition-colors"
                      aria-label="View Japanese Word Master on GitHub"
                    >
                      <GithubIcon className="w-3.5 h-3.5" />
                      <span>yuaiccc/japanese-verb-master</span>
                    </a>
                  </h3>
                  <span className="text-sm text-gray-500 dark:text-gray-400 font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded mt-2 sm:mt-0">May 2026 - Present</span>
                </div>
                <p className="text-sm text-blue-500 font-medium mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-500" />
                  Independent Project | LangGraph + Node.js + sqlite-vec
                </p>
                <ul className="list-disc list-outside ml-5 space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li><span className="font-bold text-slate-800 dark:text-slate-100">Local RAG:</span> Hybrid retrieval (vector + BM25 fused via <span className="font-semibold text-slate-900 dark:text-slate-200">RRF</span>) with LLM query rewrite and rerank, reaching <span className="font-bold text-blue-600 dark:text-blue-400">MRR 0.977</span> and <span className="font-bold text-blue-600 dark:text-blue-400">recall@1 60/65</span> on a 65-question gold set.</li>
                  <li><span className="font-bold text-slate-800 dark:text-slate-100">Evaluation and anti-hallucination:</span> RAGAS-style metrics (recall@k / MRR / NDCG / faithfulness / hallucination); a dual abstain gate drove off-topic hallucination <span className="font-bold text-blue-600 dark:text-blue-400">from 10.7% to 0%</span>.</li>
                  <li><span className="font-bold text-slate-800 dark:text-slate-100">Agent workflow:</span> A <span className="font-semibold text-slate-900 dark:text-slate-200">Planner → Researcher → Tutor → Memory Manager</span> StateGraph with three-tier persistence and sandbox isolation (tool allowlist / token budget / timeout).</li>
                  <li><span className="font-bold text-slate-800 dark:text-slate-100">Engineering:</span> <span className="font-semibold text-slate-900 dark:text-slate-200">72 unit tests</span> + GitHub Actions CI, scrypt+HMAC auth, and per-user data isolation.</li>
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
                <ul className="list-disc list-outside ml-5 space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li><span className="font-bold text-slate-800 dark:text-slate-100">Data engineering:</span> Cleaned and assembled a corpus of <span className="font-bold text-blue-600 dark:text-blue-400">1.13 million lines</span>; fixed rendering bugs in open-source tooling and generated more than 100,000 high-quality synthetic training samples.</li>
                  <li><span className="font-bold text-slate-800 dark:text-slate-100">Performance tuning:</span> Converted large collections of small images into an <span className="font-semibold text-slate-900 dark:text-slate-200">LMDB dataset</span>, pushed <span className="font-semibold text-slate-900 dark:text-slate-200">batch size to 768</span>, and reduced validation time from hours to minutes.</li>
                  <li><span className="font-bold text-slate-800 dark:text-slate-100">Model outcome:</span> Reached <span className="font-bold text-blue-600 dark:text-blue-400">98.3%</span> validation accuracy and solved recognition issues involving overlapping Traditional Chinese and Japanese characters.</li>
                </ul>
              </div>
            </section>

            <section className="animate-fade-in-up delay-700">
              <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 border-l-[3px] border-blue-500 pl-3 mb-4">Experience</h2>

              <div className="mb-4 p-5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors border border-transparent hover:border-gray-100 dark:hover:border-gray-700 relative">
                <div className="absolute left-0 top-6 w-1 h-full bg-gray-200 dark:bg-gray-700 -ml-2 hidden sm:block" />
                <div className="flex flex-col sm:flex-row justify-between sm:items-baseline mb-2 relative">
                  <div className="absolute left-[-13px] top-1.5 w-3 h-3 rounded-full bg-blue-400 hidden sm:block" />
                  <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">Henan Hualan Information Technology Group</h3>
                  <span className="text-sm text-gray-500 dark:text-gray-400 font-mono">Sep 2024 - Feb 2025</span>
                </div>
                <p className="text-sm text-blue-500 font-medium mb-2">Java Backend Intern</p>
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                  Joined RESTful API development and integration for an enterprise system; ran automated interface testing and parameter validation with Postman and maintained Swagger API docs; troubleshot backend errors through Linux server logs and wrote SQL to verify data consistency and clean up dirty data.
                </p>
              </div>

              <div className="p-5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors border border-transparent hover:border-gray-100 dark:hover:border-gray-700 relative">
                <div className="absolute left-0 top-6 w-1 h-full bg-gray-200 dark:bg-gray-700 -ml-2 hidden sm:block" />
                <div className="flex flex-col sm:flex-row justify-between sm:items-baseline mb-2 relative">
                  <div className="absolute left-[-13px] top-1.5 w-3 h-3 rounded-full bg-blue-400 hidden sm:block" />
                  <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">Youth League Committee — &ldquo;Huashui Youth&rdquo; Office</h3>
                  <span className="text-sm text-gray-500 dark:text-gray-400 font-mono">Sep 2023 - Jun 2024</span>
                </div>
                <p className="text-sm text-blue-500 font-medium mb-2">Officer</p>
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                  Consolidated class-attendance data across 22 schools; automated cleaning with Python and analysis in Excel to produce a core data dashboard.
                </p>
              </div>
            </section>

            <footer className="mt-8 pt-6 pb-2 border-t border-gray-200 dark:border-gray-700 text-center text-sm text-gray-400 space-y-4">
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
