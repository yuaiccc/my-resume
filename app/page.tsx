import Image from 'next/image';
import InteractiveEffects from './InteractiveEffects';
import OpenSourceProjects from './OpenSourceProjects';
import ScrollProgress from './ScrollProgress';
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

const FileDownIcon = ({ className = 'w-4 h-4' }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden="true">
    <path d="M14.5 2.75H7.5a2.5 2.5 0 0 0-2.5 2.5v13.5a2.5 2.5 0 0 0 2.5 2.5h9a2.5 2.5 0 0 0 2.5-2.5V8.75L14.5 2.75Z" />
    <path d="M14.5 2.75v6h4.5" />
    <path d="M12 11.5v6" />
    <path d="M9.8 15.4L12 17.6l2.2-2.2" />
  </svg>
);

export default function Resume() {
  return (
    <>
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
                    alt="许君山"
                    fill
                    sizes="(max-width: 768px) 80px, 96px"
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="text-center md:text-left">
                  <h1 className="text-3xl font-bold tracking-tight">许君山</h1>
                  <p className="mt-1 text-base text-blue-300 font-medium font-mono">26届·应届本科 / AI</p>
                  <div className="mt-3 flex flex-wrap justify-center md:justify-start gap-4 text-sm text-gray-300">
                    <span>🎓 华北水利水电大学 (人工智能)</span>
                    <span>📍 期望城市：北京, 上海, 深圳, 杭州</span>
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
            <div className="flex justify-between items-center">
              <ThemeToggle />
              <a
                href="/Xu_Junshan_Resume.pdf"
                className="inline-flex items-center gap-2 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors shadow-md"
                download
              >
                <FileDownIcon />
                <span>下载 PDF</span>
              </a>
            </div>

            <OpenSourceProjects />

            <section className="animate-fade-in-up delay-200">
              <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 border-l-4 border-blue-400 pl-4 mb-6">个人优势</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div
                  data-spotlight-card
                  className="interactive-card bg-blue-50 dark:bg-blue-900/30 p-5 rounded-lg border border-blue-100 dark:border-blue-800 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
                >
                  <h3 className="font-bold text-blue-700 dark:text-blue-300 mb-2 flex items-center gap-2"><span>🌍</span> 语言能力</h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                    <span className="font-bold text-slate-900 dark:text-slate-100">英语 CET-6 (538分)</span>：可熟练作为工作语言进行日常沟通与会议。<br />
                    <span className="font-bold text-slate-900 dark:text-slate-100">日语 N3</span>：能阅读基本日文技术文档，适应对日开发环境。
                  </p>
                </div>
                <div
                  data-spotlight-card
                  className="interactive-card bg-blue-50 dark:bg-blue-900/30 p-5 rounded-lg border border-blue-100 dark:border-blue-800 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
                >
                  <h3 className="font-bold text-blue-700 dark:text-blue-300 mb-2 flex items-center gap-2"><span>⚙️</span> 工程化能力</h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                    熟练运用 <span className="font-bold">Git/Linux/Docker</span> 工作流；具备跨平台依赖排错能力；熟练使用 AI IDE 与 Agent (Trae, Claude Code, Codex) 提升研发效能。
                  </p>
                </div>
              </div>
            </section>

            <section className="animate-fade-in-up delay-300">
              <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 border-l-4 border-blue-400 pl-4 mb-6">技术栈</h2>
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

            <section className="animate-fade-in-up delay-600">
              <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 border-l-4 border-blue-400 pl-4 mb-6">项目经历</h2>

              <div
                data-spotlight-card
                className="interactive-card mb-6 p-5 rounded-lg border border-gray-100 dark:border-gray-700 hover:shadow-md hover:border-blue-200 dark:hover:border-blue-800 transition-all duration-300 group"
              >
                <div className="flex flex-col sm:flex-row justify-between sm:items-baseline mb-2">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-500 transition-colors">Mall 电商后台管理系统</h3>
                  <span className="text-sm text-gray-500 dark:text-gray-400 font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded mt-2 sm:mt-0">2026.01 - 2026.02</span>
                </div>
                <p className="text-sm text-blue-500 font-medium mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-500" />
                  Java 后端开发 | Spring Boot + Redis + JWT + MySQL
                </p>
                <ul className="list-disc list-outside ml-5 space-y-2.5 text-sm text-gray-700 dark:text-gray-300">
                  <li><span className="font-bold text-slate-800 dark:text-slate-100">环境搭建：</span>独立完成本地开发环境搭建，解决前后端分离架构下的跨域与环境一致性问题，保障项目顺利启动。</li>
                  <li><span className="font-bold text-slate-800 dark:text-slate-100">接口开发：</span>基于 <span className="font-semibold text-slate-900 dark:text-slate-200">Controller-Service-Mapper</span> 架构，实现商品管理与用户认证接口，使用 <span className="font-semibold text-slate-900 dark:text-slate-200">Swagger</span> 进行联调。</li>
                  <li><span className="font-bold text-slate-800 dark:text-slate-100">安全认证：</span>基于 <span className="font-semibold text-slate-900 dark:text-slate-200">Spring Security + JWT</span> 构建无状态认证中心，实现细粒度的接口权限拦截与 Token 续期策略。</li>
                </ul>
              </div>

              <div
                data-spotlight-card
                className="interactive-card p-5 rounded-lg border border-gray-100 dark:border-gray-700 hover:shadow-md hover:border-blue-200 dark:hover:border-blue-800 transition-all duration-300 group"
              >
                <div className="flex flex-col sm:flex-row justify-between sm:items-baseline mb-2">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-500 transition-colors">多语言自然场景文本识别系统 (毕业设计)</h3>
                  <span className="text-sm text-gray-500 dark:text-gray-400 font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded mt-2 sm:mt-0">2025.12 - 至今</span>
                </div>
                <p className="text-sm text-blue-500 font-medium mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-500" />
                  全生命周期负责人 | Python + PyTorch + Linux
                </p>
                <ul className="list-disc list-outside ml-5 space-y-2.5 text-sm text-gray-700 dark:text-gray-300">
                  <li><span className="font-bold text-slate-800 dark:text-slate-100">数据工程：</span>清洗构建 <span className="font-bold text-blue-600 dark:text-blue-400">113万行</span> 语料库；修复开源工具渲染 Bug，生成 10万+ 高质量仿真训练集。</li>
                  <li><span className="font-bold text-slate-800 dark:text-slate-100">性能优化：</span>将海量小图转存为 <span className="font-semibold text-slate-900 dark:text-slate-200">LMDB 数据库</span>，优化 <span className="font-semibold text-slate-900 dark:text-slate-200">Batch Size 至 768</span>，将验证耗时从小时级压缩至分钟级。</li>
                  <li><span className="font-bold text-slate-800 dark:text-slate-100">模型落地：</span>验证集准确率达 <span className="font-bold text-blue-600 dark:text-blue-400">98.3%</span>，成功解决繁体/日文重叠字识别难题。</li>
                </ul>
              </div>
            </section>

            <section className="animate-fade-in-up delay-700">
              <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 border-l-4 border-blue-400 pl-4 mb-6">实习经历</h2>

              <div className="mb-6 p-5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors border border-transparent hover:border-gray-100 dark:hover:border-gray-700 relative">
                <div className="absolute left-0 top-6 w-1 h-full bg-gray-200 dark:bg-gray-700 -ml-2 hidden sm:block" />
                <div className="flex flex-col sm:flex-row justify-between sm:items-baseline mb-2 relative">
                  <div className="absolute left-[-13px] top-1.5 w-3 h-3 rounded-full bg-blue-400 hidden sm:block" />
                  <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">陕西蓝鸥信息技术 (校企实训)</h3>
                  <span className="text-sm text-gray-500 dark:text-gray-400 font-mono">2025.09 - 2025.10</span>
                </div>
                <p className="text-sm text-blue-500 font-medium mb-2">软件开发实习生 / 后端开发</p>
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                  参与企业 OA 系统需求评审，基于 SpringBoot 编写业务接口并封装标准返回值；配合前端联调，独立排查 Maven 依赖冲突 Bug。
                </p>
              </div>

              <div className="p-5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors border border-transparent hover:border-gray-100 dark:hover:border-gray-700 relative">
                <div className="absolute left-0 top-6 w-1 h-full bg-gray-200 dark:bg-gray-700 -ml-2 hidden sm:block" />
                <div className="flex flex-col sm:flex-row justify-between sm:items-baseline mb-2 relative">
                  <div className="absolute left-[-13px] top-1.5 w-3 h-3 rounded-full bg-blue-400 hidden sm:block" />
                  <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">河南华蓝信息技术集团</h3>
                  <span className="text-sm text-gray-500 dark:text-gray-400 font-mono">2025.04 - 2025.06</span>
                </div>
                <p className="text-sm text-blue-500 font-medium mb-2">大模型应用实习生</p>
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                  在 Linux 环境下完成大模型私有化部署与推理速度对比测试；基于 Coze 平台设计 AI 智能体工作流，实现业务闭环验证。
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
