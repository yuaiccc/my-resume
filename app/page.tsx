'use client';

import Image from 'next/image';
import AccessibilityToggle from './AccessibilityToggle';
import FeishuContact from './FeishuContact';
import InteractiveEffects from './InteractiveEffects';
import LanguageToggle from './LanguageToggle';
import OpenSourceProjects from './OpenSourceProjects';
import ScrollProgress from './ScrollProgress';
import { useResumeLanguage } from './language';
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

const INLINE_TECH: Record<string, TechItem> = {
  LangGraph: { name: 'LangGraph', icon: 'https://cdn.simpleicons.org/langchain/1C3C3C', invertDark: true },
  Node: { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg' },
  PostgreSQL: { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg' },
  SQLite: { name: 'sqlite-vec', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sqlite/sqlite-original.svg' },
  Go: { name: 'Go', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/go/go-original-wordmark.svg' },
  React: { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' },
  Vue: { name: 'Vue', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vuejs/vuejs-original.svg' },
  Express: { name: 'Express', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg', invertDark: true },
  Render: { name: 'Render', icon: 'https://cdn.simpleicons.org/render/46E3B7' },
  Supabase: { name: 'Supabase', icon: 'https://cdn.simpleicons.org/supabase/3FCF8E' },
  Cloudflare: { name: 'Cloudflare', icon: 'https://cdn.simpleicons.org/cloudflare/F38020' },
  OKX: { name: 'OKX', icon: 'https://cdn.simpleicons.org/okx/000000', invertDark: true },
  Spring: { name: 'Spring Boot', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg' },
  MySQL: { name: 'MySQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg' },
  Redis: { name: 'Redis', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg' },
  RabbitMQ: { name: 'RabbitMQ', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/rabbitmq/rabbitmq-original.svg' },
  Vercel: { name: 'Vercel', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg', invertDark: true },
  GitHub: { name: 'GitHub', icon: 'https://cdn.simpleicons.org/github/181717', invertDark: true },
  Linux: { name: 'Linux', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg' },
  Nginx: { name: 'Nginx', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nginx/nginx-original.svg' },
};

const TECH_GROUPS: TechGroup[] = [
  {
    title: 'AI & ML',
    items: [
      { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg' },
      { name: 'PyTorch', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pytorch/pytorch-original.svg' },
      { name: 'Hugging Face', icon: 'https://cdn.simpleicons.org/huggingface/FFD21E' },
      { name: 'LangChain / LangGraph', icon: 'https://cdn.simpleicons.org/langchain/1C3C3C', invertDark: true },
      { name: 'Dify', icon: 'https://cdn.simpleicons.org/dify/000000', invertDark: true },
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
      { name: 'Go', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/go/go-original-wordmark.svg' },
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

const InlineTech = ({ tech, label }: { tech: keyof typeof INLINE_TECH; label?: string }) => {
  const item = INLINE_TECH[tech];
  return (
    <span className="inline-flex items-center gap-1 whitespace-nowrap font-semibold text-slate-900 dark:text-slate-200">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={item.icon}
        alt=""
        className={`inline-block h-3.5 w-3.5 object-contain ${item.invertDark ? 'dark:invert' : ''}`}
        aria-hidden="true"
      />
      <span>{label || item.name}</span>
    </span>
  );
};

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
  const language = useResumeLanguage();
  const zh = language === 'zh';

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
                  <p className="mt-1 text-base text-blue-600 dark:text-blue-300 font-medium font-mono">
                    {zh ? '2026 届 · 人工智能本科' : 'Class of 2026 · AI Undergraduate'}
                  </p>
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
                <FeishuContact />
              </div>
            </div>
          </header>

          <div className="p-6 sm:p-8 md:p-10 space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-3">
                <LanguageToggle />
                <ThemeToggle />
                <AccessibilityToggle />
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {zh ? '聚焦工程实践、开源贡献与 AI 项目的个人主页。' : 'Personal site focused on engineering work, open source, and AI projects.'}
              </p>
            </div>

            <section className="animate-fade-in-up delay-100">
              <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 border-l-[3px] border-blue-500 pl-3 mb-4">{zh ? '精选项目' : 'Selected Projects'}</h2>

              <div
                data-spotlight-card
                className="interactive-card mb-4 p-5 rounded-lg border border-gray-100 dark:border-gray-700 hover:shadow-md hover:border-blue-200 dark:hover:border-blue-800 transition-all duration-300 group"
              >
                <div className="flex flex-col sm:flex-row justify-between sm:items-baseline mb-2 gap-2">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-500 transition-colors flex items-center gap-2 flex-wrap">
                    <span>{zh ? '飞书叶 — 上下文感知多模态记忆智能体' : 'Feishuye — Context-Aware Multimodal Memory Agent'}</span>
                    <a
                      href="https://github.com/yuaiccc/feishu-companion-bot"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-blue-500 dark:text-slate-400 dark:hover:text-blue-400 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 px-2 py-0.5 rounded-md transition-colors"
                      aria-label={zh ? '在 GitHub 查看飞书叶' : 'View Feishuye on GitHub'}
                    >
                      <GithubIcon className="w-3.5 h-3.5" />
                      <span>yuaiccc/feishu-companion-bot</span>
                    </a>
                  </h3>
                  <span className="text-sm text-gray-500 dark:text-gray-400 font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded mt-2 sm:mt-0">{zh ? '2026.06 - 至今' : 'Jun 2026 - Present'}</span>
                </div>
                <p className="text-sm text-blue-500 font-medium mb-3 flex flex-wrap items-center gap-x-2 gap-y-1">
                  <span className="w-2 h-2 rounded-full bg-blue-500" />
                  <span>{zh ? '个人开源项目' : 'Independent Open-source Project'}</span>
                  <span aria-hidden="true">|</span>
                  <InlineTech tech="Go" />
                  <span aria-hidden="true">+</span>
                  <InlineTech tech="React" />
                  <span aria-hidden="true">+</span>
                  <InlineTech tech="MySQL" label="OceanBase" />
                  <span aria-hidden="true">+</span>
                  <span>DeepSeek / Ollama</span>
                </p>
                <ul className="list-disc list-outside ml-5 space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li>{zh ? <><span className="font-bold text-slate-800 dark:text-slate-100">智能体运行时：</span>基于飞书 WebSocket 事件通道与 CardKit 流式 API 构建 <span className="font-semibold text-slate-900 dark:text-slate-200">飞书叶</span> <InlineTech tech="Go" /> 服务；由 DeepSeek 上下文 Planner 在无关键词路由的情况下决定是否回复、调用哪些工具与记忆、Top-K、近期消息深度及上下文预算。</> : <><span className="font-bold text-slate-800 dark:text-slate-100">Agent runtime:</span> Built <span className="font-semibold text-slate-900 dark:text-slate-200">Feishuye</span>, a <InlineTech tech="Go" /> service over Feishu&apos;s WebSocket event channel and CardKit streaming API; a DeepSeek context Planner decides whether to reply, which tools and memories to use, Top-K, recent-message depth, and context budget without keyword routing.</>}</li>
                  <li>{zh ? <><span className="font-bold text-slate-800 dark:text-slate-100">Agentic 记忆：</span>融合 <InlineTech tech="MySQL" label="OceanBase" /> 全文检索与 <span className="font-semibold text-slate-900 dark:text-slate-200">1,024 维</span> Ollama 向量，通过加权 RRF 检索分层人物、情景与语义记忆，并加入时序对齐、GraphRAG 关系和可见性过滤，接入 <span className="font-bold text-blue-600 dark:text-blue-400">1,600+ 条聊天与媒体记录</span>。</> : <><span className="font-bold text-slate-800 dark:text-slate-100">Agentic memory:</span> Integrated <InlineTech tech="MySQL" label="OceanBase" /> full-text and <span className="font-semibold text-slate-900 dark:text-slate-200">1,024-dimensional</span> Ollama embeddings with weighted RRF, layered profile/episodic/semantic memory, temporal alignment, GraphRAG relations, and visibility filtering across <span className="font-bold text-blue-600 dark:text-blue-400">1,600+ chat and media records</span>.</>}</li>
                  <li>{zh ? <><span className="font-bold text-slate-800 dark:text-slate-100">多模态链路：</span>实现 Apple Vision 本地 OCR、飞书 OCR 兜底与本地 VLM 并行理解；设计基于 SHA-256 的内容寻址媒体库，支持消息级幂等、权限隔离、资产修复和图片记忆召回。</> : <><span className="font-bold text-slate-800 dark:text-slate-100">Multimodal pipeline:</span> Added local Apple Vision OCR with Feishu fallback, parallel local VLM understanding, and a SHA-256 content-addressed media vault with message-level idempotency, permission isolation, repair tooling, and image-memory recall.</>}</li>
                  <li>{zh ? <><span className="font-bold text-slate-800 dark:text-slate-100">质量与运维：</span>构建检索、隐私与延迟回归工具；3 条核心回归用例达到 <span className="font-bold text-blue-600 dark:text-blue-400">Hit@K 100%</span>、<span className="font-bold text-blue-600 dark:text-blue-400">MRR 0.833</span> 且隐私违规为 0，并接入真实依赖健康检查、分阶段延迟追踪、竞态测试、Lint 与 CI。</> : <><span className="font-bold text-slate-800 dark:text-slate-100">Quality and operations:</span> Built retrieval/privacy/latency regression tooling; the 3-case core suite reached <span className="font-bold text-blue-600 dark:text-blue-400">Hit@K 100%</span> and <span className="font-bold text-blue-600 dark:text-blue-400">MRR 0.833</span> with zero privacy violations, alongside real dependency health checks, phased latency tracing, race tests, linting, and CI.</>}</li>
                </ul>
              </div>

              <div
                data-spotlight-card
                className="interactive-card mb-4 p-5 rounded-lg border border-gray-100 dark:border-gray-700 hover:shadow-md hover:border-blue-200 dark:hover:border-blue-800 transition-all duration-300 group"
              >
                <div className="flex flex-col sm:flex-row justify-between sm:items-baseline mb-2 gap-2">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-500 transition-colors flex items-center gap-2 flex-wrap">
                    <span>{zh ? '日语动词大师 — LangGraph 智能体 + 本地 RAG' : 'Japanese Word Master — LangGraph Agent + Local RAG'}</span>
                    <a
                      href="https://japanese-verb-master.onrender.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400 px-2.5 py-0.5 rounded-md transition-colors"
                      aria-label={zh ? '打开日语动词大师在线演示' : 'Open Japanese Word Master live demo'}
                    >
                      <span aria-hidden="true">↗</span>
                      <span>{zh ? '在线演示' : 'Live Demo'}</span>
                    </a>
                    <a
                      href="https://github.com/yuaiccc/japanese-verb-master"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-blue-500 dark:text-slate-400 dark:hover:text-blue-400 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 px-2 py-0.5 rounded-md transition-colors"
                      aria-label={zh ? '在 GitHub 查看日语动词大师' : 'View Japanese Word Master on GitHub'}
                    >
                      <GithubIcon className="w-3.5 h-3.5" />
                      <span>yuaiccc/japanese-verb-master</span>
                    </a>
                    <a
                      href="https://github.com/yuaiccc/japanese-verb-master/releases/tag/v1.3.0"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 px-2 py-0.5 rounded-md transition-colors"
                      aria-label="View Japanese Word Master v1.3.0 release"
                    >
                      <span>v1.3.0</span>
                    </a>
                  </h3>
                  <span className="text-sm text-gray-500 dark:text-gray-400 font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded mt-2 sm:mt-0">{zh ? '2026.05 - 至今' : 'May 2026 - Present'}</span>
                </div>
                <p className="text-sm text-blue-500 font-medium mb-3 flex flex-wrap items-center gap-x-2 gap-y-1">
                  <span className="w-2 h-2 rounded-full bg-blue-500" />
                  <span>{zh ? '个人项目' : 'Independent Project'}</span>
                  <span aria-hidden="true">|</span>
                  <InlineTech tech="LangGraph" />
                  <span aria-hidden="true">+</span>
                  <InlineTech tech="Node" />
                  <span aria-hidden="true">+</span>
                  <InlineTech tech="PostgreSQL" />
                  <span aria-hidden="true">+</span>
                  <InlineTech tech="SQLite" />
                </p>
                <ul className="list-disc list-outside ml-5 space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li>{zh ? <><span className="font-bold text-slate-800 dark:text-slate-100">混合 RAG：</span>通过 <span className="font-semibold text-slate-900 dark:text-slate-200">RRF</span> 融合向量与 BM25 检索，并加入查询改写和 LLM 重排；达到 <span className="font-bold text-blue-600 dark:text-blue-400">MRR 0.977</span>、<span className="font-bold text-blue-600 dark:text-blue-400">NDCG@10 0.979</span> 与 <span className="font-bold text-blue-600 dark:text-blue-400">recall@1 63/65</span>。</> : <><span className="font-bold text-slate-800 dark:text-slate-100">Hybrid RAG:</span> Combined vector and BM25 retrieval through <span className="font-semibold text-slate-900 dark:text-slate-200">RRF</span>, query rewriting, and LLM reranking; achieved <span className="font-bold text-blue-600 dark:text-blue-400">MRR 0.977</span>, <span className="font-bold text-blue-600 dark:text-blue-400">NDCG@10 0.979</span>, and <span className="font-bold text-blue-600 dark:text-blue-400">recall@1 63/65</span>.</>}</li>
                  <li>{zh ? <><span className="font-bold text-slate-800 dark:text-slate-100">评测体系：</span>构建 recall@k、MRR、NDCG、faithfulness 与 hallucination 回归集；使用距离过滤与 LLM gatekeeper 将离题幻觉率 <span className="font-bold text-blue-600 dark:text-blue-400">从 10.7% 降至 0%</span>。</> : <><span className="font-bold text-slate-800 dark:text-slate-100">Evaluation:</span> Built recall@k / MRR / NDCG / faithfulness / hallucination regression suites; a distance filter plus LLM gatekeeper reduced off-topic hallucination <span className="font-bold text-blue-600 dark:text-blue-400">from 10.7% to 0%</span>.</>}</li>
                  <li>{zh ? <><span className="font-bold text-slate-800 dark:text-slate-100">智能体运行时：</span>实现 <InlineTech tech="LangGraph" /> <span className="font-semibold text-slate-900 dark:text-slate-200">Planner → Researcher → Tutor → Memory Manager</span> StateGraph，支持 SSE 轨迹、运行与任务历史持久化、长期用户记忆，以及工具、Token 和超时沙箱策略。</> : <><span className="font-bold text-slate-800 dark:text-slate-100">Agent runtime:</span> Implemented a <InlineTech tech="LangGraph" /> <span className="font-semibold text-slate-900 dark:text-slate-200">Planner → Researcher → Tutor → Memory Manager</span> StateGraph with SSE traces, persisted run/task history, durable user memory, and sandbox policies for tools, tokens, and timeouts.</>}</li>
                  <li>{zh ? <><span className="font-bold text-slate-800 dark:text-slate-100">生产工程：</span>在 <InlineTech tech="Render" /> 部署同源 <InlineTech tech="Vue" /> + <InlineTech tech="Express" /> 服务，使用 <InlineTech tech="Supabase" label="Supabase PostgreSQL" /> 隔离游客与账号数据，接入 <InlineTech tech="Cloudflare" label="Turnstile" />、限流、浏览器侧 LLM BYOK、服务端验证的 <InlineTech tech="OKX" /> 支付，并通过 <span className="font-semibold text-slate-900 dark:text-slate-200">112 项测试</span>。</> : <><span className="font-bold text-slate-800 dark:text-slate-100">Production engineering:</span> Deployed a same-origin <InlineTech tech="Vue" /> + <InlineTech tech="Express" /> service on <InlineTech tech="Render" /> with <InlineTech tech="Supabase" label="Supabase PostgreSQL" />, isolated guest/account data, <InlineTech tech="Cloudflare" label="Turnstile" /> and rate limits, browser-side LLM BYOK, server-verified <InlineTech tech="OKX" /> payments, and <span className="font-semibold text-slate-900 dark:text-slate-200">112 passing tests</span>.</>}</li>
                </ul>
              </div>

              <div
                data-spotlight-card
                className="interactive-card p-5 rounded-lg border border-gray-100 dark:border-gray-700 hover:shadow-md hover:border-blue-200 dark:hover:border-blue-800 transition-all duration-300 group"
              >
                <div className="flex flex-col sm:flex-row justify-between sm:items-baseline mb-2">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-500 transition-colors">{zh ? '多语种场景文字识别系统' : 'Multilingual Scene Text Recognition System'}</h3>
                  <span className="text-sm text-gray-500 dark:text-gray-400 font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded mt-2 sm:mt-0">{zh ? '2025.12 - 至今' : 'Dec 2025 - Present'}</span>
                </div>
                <p className="text-sm text-blue-500 font-medium mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-500" />
                  {zh ? '端到端负责人' : 'End-to-end Owner'} | Python + PyTorch + Linux
                </p>
                <ul className="list-disc list-outside ml-5 space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li>{zh ? <><span className="font-bold text-slate-800 dark:text-slate-100">数据工程：</span>清洗并构建 <span className="font-bold text-blue-600 dark:text-blue-400">113 万行</span>语料，修复开源工具的渲染问题并生成超过 10 万条高质量合成训练样本。</> : <><span className="font-bold text-slate-800 dark:text-slate-100">Data engineering:</span> Cleaned and assembled a corpus of <span className="font-bold text-blue-600 dark:text-blue-400">1.13 million lines</span>; fixed rendering bugs in open-source tooling and generated more than 100,000 high-quality synthetic training samples.</>}</li>
                  <li>{zh ? <><span className="font-bold text-slate-800 dark:text-slate-100">性能优化：</span>将海量小图片转换为 <span className="font-semibold text-slate-900 dark:text-slate-200">LMDB 数据集</span>，把 <span className="font-semibold text-slate-900 dark:text-slate-200">batch size 提升至 768</span>，将验证耗时从数小时缩短至分钟级。</> : <><span className="font-bold text-slate-800 dark:text-slate-100">Performance tuning:</span> Converted large collections of small images into an <span className="font-semibold text-slate-900 dark:text-slate-200">LMDB dataset</span>, pushed <span className="font-semibold text-slate-900 dark:text-slate-200">batch size to 768</span>, and reduced validation time from hours to minutes.</>}</li>
                  <li>{zh ? <><span className="font-bold text-slate-800 dark:text-slate-100">模型结果：</span>验证准确率达到 <span className="font-bold text-blue-600 dark:text-blue-400">98.3%</span>，解决繁体中文与日文字符重叠带来的识别问题。</> : <><span className="font-bold text-slate-800 dark:text-slate-100">Model outcome:</span> Reached <span className="font-bold text-blue-600 dark:text-blue-400">98.3%</span> validation accuracy and solved recognition issues involving overlapping Traditional Chinese and Japanese characters.</>}</li>
                </ul>
              </div>
            </section>

            <OpenSourceProjects />

            <section className="animate-fade-in-up delay-200">
              <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 border-l-[3px] border-blue-500 pl-3 mb-4">{zh ? '亮点' : 'Highlights'}</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div
                  data-spotlight-card
                  className="interactive-card bg-blue-50 dark:bg-blue-900/30 p-5 rounded-lg border border-blue-100 dark:border-blue-800 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
                >
                  <h3 className="font-bold text-blue-700 dark:text-blue-300 mb-2">{zh ? '语言能力' : 'Languages'}</h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                    <GbFlag /> <span className="font-bold text-slate-900 dark:text-slate-100">{zh ? '英语 CET-6' : 'English CET-6'}</span>{zh ? '：可用于日常协作和技术讨论。' : ': comfortable using English in day-to-day collaboration and technical discussions.'}<br />
                    <JpFlag /> <span className="font-bold text-slate-900 dark:text-slate-100">{zh ? '日语 JLPT N3' : 'Japanese JLPT N3'}</span>{zh ? '：能够阅读基础技术资料并适应对日开发语境。' : ': able to read basic technical materials and adapt to Japan-facing development contexts.'}
                  </p>
                </div>
                <div
                  data-spotlight-card
                  className="interactive-card bg-blue-50 dark:bg-blue-900/30 p-5 rounded-lg border border-blue-100 dark:border-blue-800 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
                >
                  <h3 className="font-bold text-blue-700 dark:text-blue-300 mb-2">{zh ? '工程工作流' : 'Engineering Workflow'}</h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                    {zh ? <>熟练使用 <span className="font-bold">Git、Linux 与 Docker</span> 工作流，具备跨平台依赖排障经验，并高效使用 <span className="inline-flex items-center gap-1 font-medium"><ClaudeIcon /> Claude Code</span>、<span className="inline-flex items-center gap-1 font-medium"><OpenAiIcon /> Codex</span> 等 AI 原生工具。</> : <>Strong with <span className="font-bold">Git, Linux, and Docker</span> workflows; experienced in cross-platform dependency debugging; productive with AI-native tools such as <span className="inline-flex items-center gap-1 font-medium"><ClaudeIcon /> Claude Code</span> and <span className="inline-flex items-center gap-1 font-medium"><OpenAiIcon /> Codex</span>.</>}
                  </p>
                </div>
              </div>
            </section>

            <section className="animate-fade-in-up delay-300">
              <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 border-l-[3px] border-blue-500 pl-3 mb-4">{zh ? '技术栈' : 'Tech Stack'}</h2>
              <div
                data-spotlight-card
                className="interactive-card bg-slate-50 dark:bg-slate-900 p-5 rounded-xl border border-gray-200 dark:border-gray-800 space-y-4"
              >
                {TECH_GROUPS.map((group) => (
                  <div key={group.title} className="space-y-3">
                    <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-[0.14em] font-mono">
                      {zh ? ({ Frontend: '前端', 'Backend & Data': '后端与数据', 'DevOps & Tools': 'DevOps 与工具' }[group.title] ?? group.title) : group.title}
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
              <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 border-l-[3px] border-blue-500 pl-3 mb-4">{zh ? '教育经历' : 'Education'}</h2>
              <div className="space-y-3">
                <div className="p-5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors border border-transparent hover:border-gray-100 dark:hover:border-gray-700">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-2 gap-2">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex items-center rounded-md bg-slate-900 px-2 py-1 ring-1 ring-slate-800">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="/hdu-logo.svg" alt="Hangzhou Dianzi University logo" className="h-5 w-auto" />
                      </span>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                        {zh ? '杭州电子科技大学' : 'Hangzhou Dianzi University'}
                        <span className="block text-sm font-medium text-slate-500 dark:text-slate-400 mt-0.5">{zh ? 'Hangzhou Dianzi University（HDU）' : '杭州电子科技大学（HDU）'}</span>
                      </h3>
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400 font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">{zh ? '2026.09 -（预计）' : 'Sep 2026 - (expected)'}</span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-2">{zh ? '硕士研究生（拟入学）' : 'Postgraduate (Incoming)'}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 inline-block px-3 py-1 rounded-full border border-amber-100 dark:border-amber-800">
                    {zh ? '拟入学 · 2026 秋季' : 'Incoming · Fall 2026'}
                  </p>
                </div>

                <div className="p-5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors border border-transparent hover:border-gray-100 dark:hover:border-gray-700">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-2 gap-2">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex items-center rounded-md bg-slate-900 px-2 py-1 ring-1 ring-slate-800">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="/ncwu-logo.png" alt="NCWU logo" className="h-5 w-auto" />
                      </span>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                        {zh ? '华北水利水电大学' : 'North China University of Water Resources and Electric Power'}
                        <span className="block text-sm font-medium text-slate-500 dark:text-slate-400 mt-0.5">{zh ? 'North China University of Water Resources and Electric Power（NCWU）' : '华北水利水电大学（NCWU）'}</span>
                      </h3>
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400 font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">{zh ? '2022.09 - 2026.06' : 'Sep 2022 - Jun 2026'}</span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-2">{zh ? '人工智能工学学士' : 'B.Eng. in Artificial Intelligence'} / <span className="font-medium text-blue-500">GPA: 3.16</span></p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 inline-block px-3 py-1 rounded-full border border-blue-100 dark:border-blue-800">
                    {zh ? '学业优秀奖学金' : 'Academic Excellence Scholarship'}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">
                    <span className="font-medium">{zh ? '核心课程：' : 'Core coursework:'}</span> {zh ? '操作系统、数据结构、线性代数、自然语言处理、计算机网络、软件工程' : 'Operating Systems, Data Structures, Linear Algebra, Natural Language Processing, Computer Networks, and Software Engineering'}
                  </p>
                </div>
              </div>
            </section>

            <section className="animate-fade-in-up delay-500">
              <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 border-l-[3px] border-blue-500 pl-3 mb-4">{zh ? '专业能力' : 'Capabilities'}</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="group p-4 rounded-lg bg-slate-50/70 dark:bg-slate-800/40 hover:bg-slate-50 dark:hover:bg-slate-800/70 transition-colors border border-slate-100 dark:border-slate-800 hover:border-slate-200 dark:hover:border-slate-700">
                  <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-1 group-hover:text-blue-500 transition-colors">{zh ? 'LLM 与智能体系统' : 'LLM & Agent Systems'}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{zh ? <>使用 <InlineTech tech="LangGraph" /> 编排和本地 <span className="font-medium text-blue-500">RAG</span>（混合检索、重排、RAGAS 风格评测）构建智能体应用；研读 OpenClaw、DeerFlow、Claude Code 与 Hermes 源码，理解多智能体编排、任务调度和上下文管理的工程权衡。</> : <>Build agentic apps with <InlineTech tech="LangGraph" /> orchestration and local <span className="font-medium text-blue-500">RAG</span> (hybrid retrieval + rerank, RAGAS-style evaluation); studied the source code of OpenClaw, DeerFlow, Claude Code, and Hermes to understand multi-agent orchestration, task scheduling, and context-management trade-offs.</>}</p>
                </div>
                <div className="group p-4 rounded-lg bg-slate-50/70 dark:bg-slate-800/40 hover:bg-slate-50 dark:hover:bg-slate-800/70 transition-colors border border-slate-100 dark:border-slate-800 hover:border-slate-200 dark:hover:border-slate-700">
                  <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-1 group-hover:text-blue-500 transition-colors">{zh ? 'Java 后端基础' : 'Java Backend Foundations'}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{zh ? <>使用 <InlineTech tech="Spring" /> + MyBatis 按 MVC 与 RESTful 规范开发生产 API；结合 HashMap、JUC 与 JVM 原理排查并发和性能问题。</> : <>Built production APIs with <InlineTech tech="Spring" /> + MyBatis following MVC and RESTful conventions; applied HashMap, JUC, and JVM internals to diagnose concurrency and performance issues.</>}</p>
                </div>
                <div className="group p-4 rounded-lg bg-slate-50/70 dark:bg-slate-800/40 hover:bg-slate-50 dark:hover:bg-slate-800/70 transition-colors border border-slate-100 dark:border-slate-800 hover:border-slate-200 dark:hover:border-slate-700">
                  <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-1 group-hover:text-blue-500 transition-colors">{zh ? '数据与中间件' : 'Data and Middleware'}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{zh ? <>通过索引调优和事务设计优化 <InlineTech tech="MySQL" /> 查询，为热点数据实现 <InlineTech tech="Redis" /> 缓存，并使用 <InlineTech tech="RabbitMQ" /> 解耦异步任务。</> : <>Optimized <InlineTech tech="MySQL" /> queries with index tuning and transaction design; implemented <InlineTech tech="Redis" /> caching for hot-path data; integrated <InlineTech tech="RabbitMQ" /> for asynchronous task decoupling.</>}</p>
                </div>
                <div className="group p-4 rounded-lg bg-slate-50/70 dark:bg-slate-800/40 hover:bg-slate-50 dark:hover:bg-slate-800/70 transition-colors border border-slate-100 dark:border-slate-800 hover:border-slate-200 dark:hover:border-slate-700">
                  <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-1 group-hover:text-blue-500 transition-colors">{zh ? 'DevOps 与交付' : 'DevOps and Delivery'}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{zh ? <>通过 <InlineTech tech="Vercel" /> CI/CD 与 <InlineTech tech="GitHub" /> 流水线交付项目；维护 <InlineTech tech="Linux" /> 服务器并配置 <InlineTech tech="Nginx" /> 反向代理和静态托管。</> : <>Shipped projects through <InlineTech tech="Vercel" /> CI/CD and <InlineTech tech="GitHub" /> pipelines; managed <InlineTech tech="Linux" /> servers and configured <InlineTech tech="Nginx" /> for reverse proxy and static hosting.</>}</p>
                </div>
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
