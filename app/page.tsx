'use client';

import React, { useState, useEffect } from 'react';

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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 font-sans text-gray-800 dark:text-gray-100 transition-colors duration-300">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-2xl rounded-xl overflow-hidden transition-colors duration-300">
        
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
                  <span>📍 期望城市：杭州, 大连, 合肥</span>
                </div>
              </div>
            </div>
            {/* 右侧：联系方式 */}
            <div className="flex flex-col gap-2 text-sm text-gray-300 text-center md:text-right">
              <a 
                href="mailto:yuaiccc@aliyun.com" 
                className="hover:text-white transition cursor-pointer select-none"
                onMouseEnter={() => setShowEmail(true)}
                onMouseLeave={() => setShowEmail(false)}
                onClick={() => setShowEmail(!showEmail)}
              >
                {showEmail ? '📧 yuaiccc@aliyun.com' : '📧 ****@aliyun.com（按住显示）'}
              </a>
              <span 
                className="hover:text-white transition cursor-pointer select-none"
                onMouseEnter={() => setShowPhone(true)}
                onMouseLeave={() => setShowPhone(false)}
                onClick={() => setShowPhone(!showPhone)}
              >
                {showPhone ? '📱 157-7937-5847' : '📱 157****5847'}
              </span>
              <a href="https://github.com/yuaiccc" target="_blank" className="hover:text-white transition">
                🐙 github.com/yuaiccc
              </a>
              <a href="https://xj3.tech" target="_blank" className="text-blue-400 hover:text-blue-300 font-bold">🌐 xj3.tech</a>
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
              <span>{darkMode ? '☀️' : '🌙'}</span>
              <span>{darkMode ? '浅色模式' : '深色模式'}</span>
            </button>
            <a 
              href="/Xu_Junshan_Resume.pdf" 
              className="inline-flex items-center gap-2 bg-blue-400 text-white px-6 py-2 rounded-lg hover:bg-blue-500 transition-colors shadow-md"
              download
            >
              <span>📄</span>
              <span>下载 PDF</span>
            </a>
          </div>
          
          {/* === 个人优势 (亮点前置) === */}
          <section className="animate-fade-in-up delay-100">
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
                  熟练运用 <span className="font-bold">Git/Linux/Docker</span> 工作流；具备跨平台依赖排错能力；熟练使用 AI IDE (Trae/Claude) 提升研发效能。
                </p>
              </div>
            </div>
          </section>

          {/* === 技术栈展示 (图标墙) === */}
          <section className="animate-fade-in-up delay-200">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 border-l-4 border-blue-400 pl-4 mb-6">技术栈</h2>
            <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-lg text-center border border-gray-100 dark:border-gray-700 hover:shadow-sm transition-shadow">
              {/* 图标生成器：由于国内网络环境，改用 shields.io 方案 */}
              <div className="flex flex-wrap justify-center gap-3">
                <img src="https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white" alt="Java" className="h-8 hover:scale-105 transition-transform" />
                <img src="https://img.shields.io/badge/Spring-6DB33F?style=for-the-badge&logo=spring&logoColor=white" alt="Spring" className="h-8 hover:scale-105 transition-transform" />
                <img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white" alt="MySQL" className="h-8 hover:scale-105 transition-transform" />
                <img src="https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white" alt="Redis" className="h-8 hover:scale-105 transition-transform" />
                <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js" className="h-8 hover:scale-105 transition-transform" />
                <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" className="h-8 hover:scale-105 transition-transform" />
                <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" className="h-8 hover:scale-105 transition-transform" />
                <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind" className="h-8 hover:scale-105 transition-transform" />
                <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel" className="h-8 hover:scale-105 transition-transform" />
                <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker" className="h-8 hover:scale-105 transition-transform" />
                <img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white" alt="Git" className="h-8 hover:scale-105 transition-transform" />
                <img src="https://img.shields.io/badge/Linux-FCC624?style=for-the-badge&logo=linux&logoColor=black" alt="Linux" className="h-8 hover:scale-105 transition-transform" />
                <img src="https://img.shields.io/badge/IntelliJ_IDEA-000000.svg?style=for-the-badge&logo=intellij-idea&logoColor=white" alt="IDEA" className="h-8 hover:scale-105 transition-transform" />
                <img src="https://img.shields.io/badge/VSCode-0078D4?style=for-the-badge&logo=visual%20studio%20code&logoColor=white" alt="VSCode" className="h-8 hover:scale-105 transition-transform" />
              </div>
            </div>
          </section>

          {/* === 教育经历 === */}
          <section className="animate-fade-in-up delay-300">
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
          <section className="animate-fade-in-up delay-400">
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
          <section className="animate-fade-in-up delay-500">
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

          {/* === 开源项目 (Pinned Projects) === */}
          <section className="animate-fade-in-up delay-600">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 border-l-4 border-blue-400 pl-4 mb-6">开源项目</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {/* Project 1 */}
              <a href="https://github.com/SillyTavern/SillyTavern" target="_blank" className="block p-5 rounded-lg border border-gray-100 dark:border-gray-700 hover:shadow-md hover:border-blue-200 dark:hover:border-blue-800 transition-all duration-300 group bg-slate-50 dark:bg-slate-800/50">
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
                  <span className="flex items-center gap-1">
                    ⭐ Public
                  </span>
                </div>
              </a>

              {/* Project 2 */}
              <a href="https://github.com/yuaiccc/japanese-verb-master" target="_blank" className="block p-5 rounded-lg border border-gray-100 dark:border-gray-700 hover:shadow-md hover:border-blue-200 dark:hover:border-blue-800 transition-all duration-300 group bg-slate-50 dark:bg-slate-800/50">
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