'use client';

import React, { useState, useEffect } from 'react';

type IconProps = { className?: string };
type TechTone = 'amber' | 'emerald' | 'blue' | 'cyan' | 'sky' | 'red' | 'indigo' | 'slate' | 'orange' | 'violet';

type TechItem = {
  name: string;
  short: string;
  tone: TechTone;
};

type TechGroup = {
  title: string;
  items: TechItem[];
};

const TECH_GROUPS: TechGroup[] = [
  {
    title: 'Backend & Data',
    items: [
      { name: 'Java', short: 'JV', tone: 'amber' },
      { name: 'Spring', short: 'SP', tone: 'emerald' },
      { name: 'Python', short: 'PY', tone: 'blue' },
      { name: 'R', short: 'R', tone: 'sky' },
      { name: 'MySQL', short: 'MY', tone: 'cyan' },
      { name: 'Redis', short: 'RD', tone: 'red' },
    ],
  },
  {
    title: 'Frontend',
    items: [
      { name: 'TypeScript', short: 'TS', tone: 'blue' },
      { name: 'React', short: 'RC', tone: 'cyan' },
      { name: 'Next.js', short: 'NX', tone: 'slate' },
      { name: 'Tailwind CSS', short: 'TW', tone: 'sky' },
    ],
  },
  {
    title: 'DevOps & Tools',
    items: [
      { name: 'Git', short: 'GT', tone: 'orange' },
      { name: 'Linux', short: 'LX', tone: 'amber' },
      { name: 'Docker', short: 'DK', tone: 'blue' },
      { name: 'Vercel', short: 'VC', tone: 'slate' },
      { name: 'IntelliJ IDEA', short: 'IJ', tone: 'violet' },
      { name: 'VS Code', short: 'VS', tone: 'indigo' },
    ],
  },
];

const toneClassMap: Record<TechTone, string> = {
  amber: 'from-amber-500 to-orange-500',
  emerald: 'from-emerald-500 to-lime-500',
  blue: 'from-blue-500 to-indigo-500',
  cyan: 'from-cyan-500 to-blue-500',
  sky: 'from-sky-500 to-cyan-500',
  red: 'from-red-500 to-rose-500',
  indigo: 'from-indigo-500 to-blue-500',
  slate: 'from-slate-700 to-slate-900',
  orange: 'from-orange-500 to-red-500',
  violet: 'from-violet-500 to-fuchsia-500',
};

const TechBadge = ({ name, short, tone }: TechItem) => (
  <li className="group/list-item">
    <span className="inline-flex items-center gap-3 rounded-xl border border-slate-200/80 bg-white px-3 py-2.5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md dark:border-slate-700 dark:bg-slate-900/80">
      <span
        className={`inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br ${toneClassMap[tone]} text-[11px] font-semibold tracking-wide text-white ring-1 ring-white/25`}
        aria-hidden="true"
      >
        {short}
      </span>
      <span className="text-sm font-medium text-slate-700 dark:text-slate-200">{name}</span>
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

const MoonIcon = ({ className = 'w-4 h-4' }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden="true">
    <path d="M20 14.2A8.2 8.2 0 1 1 9.8 4 6.8 6.8 0 1 0 20 14.2Z" />
  </svg>
);

const SunIcon = ({ className = 'w-4 h-4' }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden="true">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2.5v2.2M12 19.3v2.2M4.7 4.7l1.6 1.6M17.7 17.7l1.6 1.6M2.5 12h2.2M19.3 12h2.2M4.7 19.3l1.6-1.6M17.7 6.3l1.6-1.6" />
  </svg>
);

const FileDownIcon = ({ className = 'w-4 h-4' }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden="true">
    <path d="M14.5 2.75H7.5a2.5 2.5 0 0 0-2.5 2.5v13.5a2.5 2.5 0 0 0 2.5 2.5h9a2.5 2.5 0 0 0 2.5-2.5V8.75L14.5 2.75Z" />
    <path d="M14.5 2.75v6h4.5" />
    <path d="M12 11.5v6" />
    <path d="M9.8 15.4L12 17.6l2.2-2.2" />
  </svg>
);

export default function Resume() {
  const [showEmail, setShowEmail] = useState(false);
  const [showPhone, setShowPhone] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && (e.key === 'c' || e.key === 'u' || e.key === 's')) {
        e.preventDefault();
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.userSelect = 'none';
    document.body.style.webkitUserSelect = 'none';

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.userSelect = '';
      document.body.style.webkitUserSelect = '';
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-slate-50 via-sky-50 to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-900 py-12 px-4 sm:px-6 lg:px-8 font-sans text-gray-800 dark:text-gray-100 transition-colors duration-300">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-blue-300/20 blur-3xl dark:bg-blue-600/20" />
        <div className="absolute top-1/3 -left-20 h-72 w-72 rounded-full bg-cyan-200/20 blur-3xl dark:bg-cyan-500/10" />
      </div>
      <div className="resume-card relative max-w-4xl mx-auto bg-white/95 dark:bg-gray-800/95 shadow-2xl rounded-2xl overflow-hidden transition-colors duration-300 ring-1 ring-white/70 dark:ring-gray-700">
        
        {/* === 头部信息 === */}
        <header className="bg-slate-800 dark:bg-slate-950 text-white p-8 md:p-12 transition-colors duration-300">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* 左侧：头像 + 基本信息 */}
            <div className="flex flex-col md:flex-row items-center gap-6">
              {/* 头像 */}
              <div className="w-18 h-18 rounded-xl overflow-hidden flex-shrink-0 shadow-lg" onContextMenu={(e) => e.preventDefault()}>
                <img 
                  src="/profile.jpg" 
                  alt="许君山" 
                  className="w-full h-full object-cover pointer-events-none"
                  draggable={false}
                  onContextMenu={(e) => e.preventDefault()}
                />
              </div>
              <div className="text-center md:text-left">
                <h1 className="text-3xl font-bold tracking-tight">许君山</h1>
                <p className="mt-1 text-lg text-blue-400 font-medium">26届·应届本科 / AI</p>
                <div className="mt-3 flex flex-wrap justify-center md:justify-start gap-4 text-sm text-gray-300">
                  <span>🎓 华北水利水电大学 (人工智能)</span>
                  <span>📍 期望城市：北京, 上海, 深圳, 杭州</span>
                </div>
              </div>
            </div>
            {/* 右侧：联系方式 */}
            <div className="flex flex-col gap-2 text-sm text-gray-300 text-center md:text-right">
              <a 
                href="mailto:yuaiccc@aliyun.com" 
                className="hover:text-white transition cursor-pointer select-none inline-flex items-center justify-center md:justify-end gap-2"
                onMouseEnter={() => setShowEmail(true)}
                onMouseLeave={() => setShowEmail(false)}
                onClick={() => setShowEmail(!showEmail)}
              >
                <MailIcon />
                <span>{showEmail ? 'yuaiccc@aliyun.com' : '****@aliyun.com（按住显示）'}</span>
              </a>
              <span 
                className="hover:text-white transition cursor-pointer select-none inline-flex items-center justify-center md:justify-end gap-2"
                onMouseEnter={() => setShowPhone(true)}
                onMouseLeave={() => setShowPhone(false)}
                onClick={() => setShowPhone(!showPhone)}
              >
                <PhoneIcon />
                <span>{showPhone ? '157-7937-5847' : '157****5847'}</span>
              </span>
              <a href="https://github.com/yuaiccc" target="_blank" rel="noopener noreferrer" className="hover:text-white transition inline-flex items-center justify-center md:justify-end gap-2">
                <GithubIcon />
                <span>github.com/yuaiccc</span>
              </a>
              <a href="https://xj3.tech" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 font-bold inline-flex items-center justify-center md:justify-end gap-2">
                <GlobeIcon />
                <span>xj3.tech</span>
              </a>
            </div>
          </div>
        </header>

        <div className="p-8 md:p-12 space-y-10">
          {/* === 工具栏 === */}
          <div className="flex justify-between items-center">
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className="inline-flex items-center gap-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors shadow-md text-sm"
            >
              {darkMode ? <SunIcon /> : <MoonIcon />}
              <span>{darkMode ? '浅色模式' : '深色模式'}</span>
            </button>
            <a 
              href="/Xu_Junshan_Resume.pdf" 
              className="inline-flex items-center gap-2 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors shadow-md"
              download
            >
              <FileDownIcon />
              <span>下载 PDF</span>
            </a>
          </div>
          
          {/* === 开源项目 (Pinned Projects) === */}
          <section className="animate-fade-in-up delay-100">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 border-l-4 border-blue-400 pl-4 mb-6">开源项目</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {/* Project 1 */}
              <a href="https://github.com/SillyTavern/SillyTavern" target="_blank" rel="noopener noreferrer" className="block p-5 rounded-lg border border-gray-100 dark:border-gray-700 hover:shadow-md hover:border-blue-200 dark:hover:border-blue-800 transition-all duration-300 group bg-slate-50 dark:bg-slate-800/50">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-500 transition-colors flex items-center gap-2 truncate">
                    <svg className="w-4 h-4 text-gray-500 flex-shrink-0" fill="currentColor" viewBox="0 0 16 16"><path fillRule="evenodd" d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z"></path></svg>
                    <span className="truncate">SillyTavern/SillyTavern</span>
                  </h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2 h-10">
                  LLM Frontend for Power Users.
                </p>
                <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                  <span className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#f1e05a]"></span> JavaScript
                  </span>
                  <span className="flex items-center gap-1" title="Merged Pull Requests">
                    <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="currentColor"><path fillRule="evenodd" d="M5 3.254V3.25v.005a.75.75 0 110-.005v.004c0-.016.001-.031.004-.046A1.25 1.25 0 016.25 2h.661a.75.75 0 000-1.5H6.25A2.75 2.75 0 003.5 3.25v.005a.75.75 0 100-.005v.004c.003.015.004.03.004.046A1.25 1.25 0 012.25 4.5h-.5a.75.75 0 000 1.5h.5c.34 0 .651-.137.876-.36l.24.239A2.75 2.75 0 004.75 8v1.5H3.5a.75.75 0 000 1.5h1.25a2.75 2.75 0 002.75-2.75v-1.5a1.25 1.25 0 011.25-1.25h.5a.75.75 0 000-1.5h-.5A2.75 2.75 0 006 6.75V8.25a.75.75 0 110 .005V8.25a.75.75 0 010-.005V8.25a.75.75 0 000-1.5v-3.5zM12.5 3.25v.005a.75.75 0 110-.005v.004c0-.016.001-.031.004-.046A1.25 1.25 0 0113.75 2h.5a.75.75 0 000-1.5h-.5A2.75 2.75 0 0011 3.25v.005a.75.75 0 100-.005v.004c.003.015.004.03.004.046A1.25 1.25 0 019.75 4.5h-.5a.75.75 0 000 1.5h.5c.34 0 .651-.137.876-.36l.24.239A2.75 2.75 0 0012.25 8v1.5h-1.25a.75.75 0 000 1.5h1.25a2.75 2.75 0 002.75-2.75v-1.5a1.25 1.25 0 011.25-1.25h.5a.75.75 0 000-1.5h-.5a2.75 2.75 0 00-2.75 2.75v1.5a.75.75 0 110 .005V8.25a.75.75 0 010-.005V8.25a.75.75 0 000-1.5v-3.5z"></path></svg>
                    21 Merged PRs
                  </span>
                </div>
              </a>

              {/* Project 2 */}
              <a href="https://github.com/yuaiccc/japanese-verb-master" target="_blank" rel="noopener noreferrer" className="block p-5 rounded-lg border border-gray-100 dark:border-gray-700 hover:shadow-md hover:border-blue-200 dark:hover:border-blue-800 transition-all duration-300 group bg-slate-50 dark:bg-slate-800/50">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-500 transition-colors flex items-center gap-2 truncate">
                    <svg className="w-4 h-4 text-gray-500 flex-shrink-0" fill="currentColor" viewBox="0 0 16 16"><path fillRule="evenodd" d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z"></path></svg>
                    <span className="truncate">yuaiccc/japanese-verb-master</span>
                  </h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2 h-10">
                  一个精准的日语动词活用在线工具和文档网站，支持五段、一段及不规则动词的自动变换。
                </p>
                <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                  <span className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#41b883]"></span> Vue
                  </span>
                  <span className="flex items-center gap-1">
                    ⭐ Public
                  </span>
                </div>
              </a>
            </div>
          </section>

          {/* === 个人优势 (亮点前置) === */}
          <section className="animate-fade-in-up delay-200">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 border-l-4 border-blue-400 pl-4 mb-6">个人优势</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-blue-50 dark:bg-blue-900/30 p-5 rounded-lg border border-blue-100 dark:border-blue-800 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                <h3 className="font-bold text-blue-700 dark:text-blue-300 mb-2 flex items-center gap-2"><span>🌍</span> 语言能力</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                  <span className="font-bold text-slate-900 dark:text-slate-100">英语 CET-6 (538分)</span>：可熟练作为工作语言进行日常沟通与会议。<br/>
                  <span className="font-bold text-slate-900 dark:text-slate-100">日语 N3</span>：能阅读基本日文技术文档，适应对日开发环境。
                </p>
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/30 p-5 rounded-lg border border-blue-100 dark:border-blue-800 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                <h3 className="font-bold text-blue-700 dark:text-blue-300 mb-2 flex items-center gap-2"><span>⚙️</span> 工程化能力</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                  熟练运用 <span className="font-bold">Git/Linux/Docker</span> 工作流；具备跨平台依赖排错能力；熟练使用 AI IDE 与 Agent (Trae, Claude Code, Codex) 提升研发效能。
                </p>
              </div>
            </div>
          </section>

          {/* === 技术栈展示 (图标墙) === */}
          <section className="animate-fade-in-up delay-300">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 border-l-4 border-blue-400 pl-4 mb-6">技术栈</h2>
            <div className="bg-slate-50/90 dark:bg-slate-800/55 p-6 rounded-xl border border-gray-200/80 dark:border-gray-700 transition-shadow space-y-6">
              {/* 后端 & 数据 */}
              <div>
                <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wider">Backend & Data</h3>
                <div className="flex flex-wrap gap-3">
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md hover:scale-105 transition-transform shadow-sm">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg" className="w-5 h-5" alt="Java" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Java</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md hover:scale-105 transition-transform shadow-sm">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg" className="w-5 h-5" alt="Spring" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Spring</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md hover:scale-105 transition-transform shadow-sm">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" className="w-5 h-5" alt="Python" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Python</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md hover:scale-105 transition-transform shadow-sm">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/r/r-original.svg" className="w-5 h-5" alt="R" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">R</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md hover:scale-105 transition-transform shadow-sm">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg" className="w-5 h-5" alt="MySQL" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">MySQL</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md hover:scale-105 transition-transform shadow-sm">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg" className="w-5 h-5" alt="Redis" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Redis</span>
                  </div>
                </div>
              </div>

              {/* 前端 */}
              <div>
                <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wider">Frontend</h3>
                <div className="flex flex-wrap gap-3">
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md hover:scale-105 transition-transform shadow-sm">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" className="w-5 h-5" alt="TypeScript" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">TypeScript</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md hover:scale-105 transition-transform shadow-sm">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" className="w-5 h-5" alt="React" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">React</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md hover:scale-105 transition-transform shadow-sm">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg" className="w-5 h-5 dark:invert" alt="Next.js" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Next.js</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md hover:scale-105 transition-transform shadow-sm">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" className="w-5 h-5" alt="Tailwind" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Tailwind CSS</span>
                  </div>
                </div>
              </div>

              {/* DevOps & Tools */}
              <div>
                <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wider">DevOps & Tools</h3>
                <div className="flex flex-wrap gap-3">
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md hover:scale-105 transition-transform shadow-sm">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" className="w-5 h-5" alt="Git" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Git</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md hover:scale-105 transition-transform shadow-sm">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg" className="w-5 h-5" alt="Linux" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Linux</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md hover:scale-105 transition-transform shadow-sm">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" className="w-5 h-5" alt="Docker" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Docker</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md hover:scale-105 transition-transform shadow-sm">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg" className="w-5 h-5 dark:invert" alt="Vercel" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Vercel</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md hover:scale-105 transition-transform shadow-sm">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/intellij/intellij-original.svg" className="w-5 h-5" alt="IDEA" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">IntelliJ IDEA</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md hover:scale-105 transition-transform shadow-sm">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg" className="w-5 h-5" alt="VSCode" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">VSCode</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* === 教育经历 === */}
          <section className="animate-fade-in-up delay-400">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 border-l-4 border-blue-400 pl-4 mb-6">教育经历</h2>
            <div className="p-5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors border border-transparent hover:border-gray-100 dark:hover:border-gray-700">
              <div className="flex flex-col sm:flex-row justify-between sm:items-baseline mb-2">
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">华北水利水电大学</h3>
                <span className="text-sm text-gray-500 dark:text-gray-400 font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">2022.09 - 2026.06</span>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-2">人工智能 / 本科 / <span className="font-medium text-blue-500">GPA: 3.16</span> / 共青团员</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 inline-block px-3 py-1 rounded-full border border-blue-100 dark:border-blue-800">
                🏆 校级优秀学生奖学金
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">
                <span className="font-medium">主修课程：</span>操作系统、数据结构、线性代数、自然语言处理、计算机网络、软件工程
              </p>
            </div>
          </section>

          {/* === 专业技能 (核心竞争力) === */}
          <section className="animate-fade-in-up delay-500">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 border-l-4 border-blue-400 pl-4 mb-6">专业技能</h2>
            <div className="space-y-4">
              <div className="group p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors border border-transparent hover:border-gray-100 dark:hover:border-gray-700">
                <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-1 group-hover:text-blue-500 transition-colors">Java 后端核心</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">熟悉 Java 基础 (HashMap/JUC/JVM)；熟练使用 <span className="font-medium text-blue-500">Spring Boot + MyBatis</span> 开发企业级应用；理解 MVC 与 RESTful 规范。</p>
              </div>
              <div className="group p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors border border-transparent hover:border-gray-100 dark:hover:border-gray-700">
                <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-1 group-hover:text-blue-500 transition-colors">数据库与中间件</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">熟悉 <span className="font-medium text-blue-500">MySQL</span> (索引/事务/SQL优化)；掌握 <span className="font-medium text-blue-500">Redis</span> 核心数据结构与缓存场景；了解 RabbitMQ 异步解耦。</p>
              </div>
              <div className="group p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors border border-transparent hover:border-gray-100 dark:hover:border-gray-700">
                <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-1 group-hover:text-blue-500 transition-colors">DevOps 与部署</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">熟练掌握 <span className="font-medium text-blue-500">Vercel CI/CD + GitHub</span> 自动化部署；熟悉 Linux 常用命令与 Nginx 配置。</p>
              </div>
            </div>
          </section>

          {/* === 项目经历 === */}
          <section className="animate-fade-in-up delay-600">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 border-l-4 border-blue-400 pl-4 mb-6">项目经历</h2>
            
            {/* 项目 1 */}
            <div className="mb-6 p-5 rounded-lg border border-gray-100 dark:border-gray-700 hover:shadow-md hover:border-blue-200 dark:hover:border-blue-800 transition-all duration-300 group">
              <div className="flex flex-col sm:flex-row justify-between sm:items-baseline mb-2">
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-500 transition-colors">Mall 电商后台管理系统</h3>
                <span className="text-sm text-gray-500 dark:text-gray-400 font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded mt-2 sm:mt-0">2026.01 - 2026.02</span>
              </div>
              <p className="text-sm text-blue-500 font-medium mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                Java 后端开发 | Spring Boot + Redis + JWT + MySQL
              </p>
              <ul className="list-disc list-outside ml-5 space-y-1.5 text-sm text-gray-700 dark:text-gray-300">
                <li><span className="font-bold text-slate-800 dark:text-slate-100">环境搭建：</span>独立配置 MySQL/Redis/Maven 环境，解决端口冲突与跨域问题，保障本地开发环境稳定。</li>
                <li><span className="font-bold text-slate-800 dark:text-slate-100">接口开发：</span>基于 Controller-Service-Mapper 架构，实现商品管理与用户认证接口，使用 Swagger 进行联调。</li>
                <li><span className="font-bold text-slate-800 dark:text-slate-100">安全认证：</span>集成 Spring Security + JWT 实现无状态登录，完成 Token 生成与拦截校验逻辑。</li>
              </ul>
            </div>

            {/* 项目 2 */}
            <div className="p-5 rounded-lg border border-gray-100 dark:border-gray-700 hover:shadow-md hover:border-blue-200 dark:hover:border-blue-800 transition-all duration-300 group">
              <div className="flex flex-col sm:flex-row justify-between sm:items-baseline mb-2">
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-500 transition-colors">多语言自然场景文本识别系统 (毕业设计)</h3>
                <span className="text-sm text-gray-500 dark:text-gray-400 font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded mt-2 sm:mt-0">2025.12 - 至今</span>
              </div>
              <p className="text-sm text-blue-500 font-medium mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                全生命周期负责人 | Python + PyTorch + Linux
              </p>
              <ul className="list-disc list-outside ml-5 space-y-1.5 text-sm text-gray-700 dark:text-gray-300">
                <li><span className="font-bold text-slate-800 dark:text-slate-100">数据工程：</span>清洗构建 <span className="font-bold text-blue-600 dark:text-blue-400">113万行</span> 语料库；修复开源工具渲染 Bug，生成 10万+ 高质量仿真训练集。</li>
                <li><span className="font-bold text-slate-800 dark:text-slate-100">性能优化：</span>将海量小图转存为 LMDB 数据库，优化 Batch Size 至 768，将验证耗时从小时级压缩至分钟级。</li>
                <li><span className="font-bold text-slate-800 dark:text-slate-100">模型落地：</span>验证集准确率达 <span className="font-bold text-blue-600 dark:text-blue-400">98.3%</span>，成功解决繁体/日文重叠字识别难题。</li>
              </ul>
            </div>
          </section>

          {/* === 实习经历 === */}
          <section className="animate-fade-in-up delay-700">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 border-l-4 border-blue-400 pl-4 mb-6">实习经历</h2>
            
            <div className="mb-6 p-5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors border border-transparent hover:border-gray-100 dark:hover:border-gray-700 relative">
              <div className="absolute left-0 top-6 w-1 h-full bg-gray-200 dark:bg-gray-700 -ml-2 hidden sm:block"></div>
              <div className="flex flex-col sm:flex-row justify-between sm:items-baseline mb-2 relative">
                <div className="absolute left-[-13px] top-1.5 w-3 h-3 rounded-full bg-blue-400 hidden sm:block"></div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">陕西蓝鸥信息技术 (校企实训)</h3>
                <span className="text-sm text-gray-500 dark:text-gray-400 font-mono">2025.09 - 2025.10</span>
              </div>
              <p className="text-sm text-blue-500 font-medium mb-2">软件开发实习生 / 后端开发</p>
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                参与企业 OA 系统需求评审，基于 SpringBoot 编写业务接口并封装标准返回值；配合前端联调，独立排查 Maven 依赖冲突 Bug。
              </p>
            </div>

            <div className="p-5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors border border-transparent hover:border-gray-100 dark:hover:border-gray-700 relative">
              <div className="absolute left-0 top-6 w-1 h-full bg-gray-200 dark:bg-gray-700 -ml-2 hidden sm:block"></div>
              <div className="flex flex-col sm:flex-row justify-between sm:items-baseline mb-2 relative">
                <div className="absolute left-[-13px] top-1.5 w-3 h-3 rounded-full bg-blue-400 hidden sm:block"></div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">河南华蓝信息技术集团</h3>
                <span className="text-sm text-gray-500 dark:text-gray-400 font-mono">2025.04 - 2025.06</span>
              </div>
              <p className="text-sm text-blue-500 font-medium mb-2">大模型应用实习生</p>
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                在 Linux 环境下完成大模型私有化部署与推理速度对比测试；基于 Coze 平台设计 AI 智能体工作流，实现业务闭环验证。
              </p>
            </div>
          </section>

          {/* === 页脚 === */}
          <footer className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700 text-center text-sm text-gray-400">
            <p>© 2026 Xu Junshan.</p>
          </footer>

        </div>
      </div>
    </div>
  );
}