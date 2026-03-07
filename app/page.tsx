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
          <section>
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 border-l-4 border-blue-400 pl-4 mb-6">个人优势</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-blue-50 dark:bg-blue-900/30 p-5 rounded-lg border border-blue-100 dark:border-blue-800">
                <h3 className="font-bold text-blue-700 dark:text-blue-300 mb-2">语言能力</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                  <span className="font-bold text-slate-900 dark:text-slate-100">英语 CET-6 (538分)</span>：可熟练作为工作语言进行日常沟通与会议。<br/>
                  <span className="font-bold text-slate-900 dark:text-slate-100">日语 N3</span>：能阅读基本日文技术文档，适应对日开发环境。
                </p>
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/30 p-5 rounded-lg border border-blue-100 dark:border-blue-800">
                <h3 className="font-bold text-blue-700 dark:text-blue-300 mb-2">工程化能力</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                  熟练运用 <span className="font-bold">Git/Linux/Docker</span> 工作流；具备跨平台依赖排错能力；熟练使用 AI IDE (Trae/Claude) 提升研发效能。
                </p>
              </div>
            </div>
          </section>
{/* === 技术栈展示 (图标墙) === */}
          <section>
            <h2 className="text-2xl font-bold text-slate-800 border-l-4 border-blue-400 pl-4 mb-6"></h2>
            <div className="bg-slate-50 p-6 rounded-lg text-center">
              {/* 图标生成器：https://skillicons.dev */}
              <a href="https://skillicons.dev" target="_blank">
                <img 
                  src="https://skillicons.dev/icons?i=java,spring,mysql,redis,nextjs,react,ts,tailwindcss,vercel,docker,git,linux,idea,vscode&perline=20"
                  alt="My Tech Stack"
                  className="mx-auto"
                />
              </a>
            </div>
          </section>
          {/* === 教育经历 === */}
          <section>
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 border-l-4 border-blue-400 pl-4 mb-6">教育经历</h2>
            <div className="flex flex-col sm:flex-row justify-between sm:items-baseline mb-2">
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">华北水利水电大学</h3>
              <span className="text-sm text-gray-500 dark:text-gray-400 font-mono">2022.09 - 2026.06</span>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-2">人工智能 / 本科 / <span className="font-medium">GPA: 3.16</span> / 共青团员</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 inline-block px-3 py-1 rounded">
              🏆 校级优秀学生奖学金
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              主修：操作系统、数据结构、线性代数、自然语言处理、计算机网络、软件工程
            </p>
          </section>

          {/* === 专业技能 (核心竞争力) === */}
          <section>
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 border-l-4 border-blue-400 pl-4 mb-6">专业技能</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-1">Java 后端核心</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">熟悉 Java 基础 (HashMap/JUC/JVM)；熟练使用 <span className="font-medium text-blue-500">Spring Boot + MyBatis</span> 开发企业级应用；理解 MVC 与 RESTful 规范。</p>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-1">数据库与中间件</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">熟悉 <span className="font-medium text-blue-500">MySQL</span> (索引/事务/SQL优化)；掌握 <span className="font-medium text-blue-500">Redis</span> 核心数据结构与缓存场景；了解 RabbitMQ 异步解耦。</p>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-1">DevOps 与部署</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">熟练掌握 <span className="font-medium text-blue-500">Vercel CI/CD + GitHub</span> 自动化部署；熟悉 Linux 常用命令与 Nginx 配置。</p>
              </div>
            </div>
          </section>

          {/* === 项目经历 === */}
          <section>
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 border-l-4 border-blue-400 pl-4 mb-6">项目经历</h2>
            
            {/* 项目 1 */}
            <div className="mb-8">
              <div className="flex flex-col sm:flex-row justify-between sm:items-baseline mb-2">
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">Mall 电商后台管理系统</h3>
                <span className="text-sm text-gray-500 dark:text-gray-400 font-mono">2026.01 - 2026.02</span>
              </div>
              <p className="text-sm text-blue-500 font-medium mb-3">Java 后端开发 | Spring Boot + Redis + JWT + MySQL</p>
              <ul className="list-disc list-outside ml-5 space-y-1 text-sm text-gray-700 dark:text-gray-300">
                <li><span className="font-bold text-slate-800 dark:text-slate-100">环境搭建：</span>独立配置 MySQL/Redis/Maven 环境，解决端口冲突与跨域问题，保障本地开发环境稳定。</li>
                <li><span className="font-bold text-slate-800 dark:text-slate-100">接口开发：</span>基于 Controller-Service-Mapper 架构，实现商品管理与用户认证接口，使用 Swagger 进行联调。</li>
                <li><span className="font-bold text-slate-800 dark:text-slate-100">安全认证：</span>集成 Spring Security + JWT 实现无状态登录，完成 Token 生成与拦截校验逻辑。</li>
              </ul>
            </div>

            {/* 项目 2 */}
            <div>
              <div className="flex flex-col sm:flex-row justify-between sm:items-baseline mb-2">
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">多语言自然场景文本识别系统 (毕业设计)</h3>
                <span className="text-sm text-gray-500 dark:text-gray-400 font-mono">2025.12 - 至今</span>
              </div>
              <p className="text-sm text-blue-500 font-medium mb-3">全生命周期负责人 | Python + PyTorch + Linux</p>
              <ul className="list-disc list-outside ml-5 space-y-1 text-sm text-gray-700 dark:text-gray-300">
                <li><span className="font-bold text-slate-800 dark:text-slate-100">数据工程：</span>清洗构建 <span className="font-bold">113万行</span> 语料库；修复开源工具渲染 Bug，生成 10万+ 高质量仿真训练集。</li>
                <li><span className="font-bold text-slate-800 dark:text-slate-100">性能优化：</span>将海量小图转存为 LMDB 数据库，优化 Batch Size 至 768，将验证耗时从小时级压缩至分钟级。</li>
                <li><span className="font-bold text-slate-800 dark:text-slate-100">模型落地：</span>验证集准确率达 <span className="font-bold">98.3%</span>，成功解决繁体/日文重叠字识别难题。</li>
              </ul>
            </div>
          </section>

          {/* === 实习经历 === */}
          <section>
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 border-l-4 border-blue-400 pl-4 mb-6">实习经历</h2>
            
            <div className="mb-6">
              <div className="flex flex-col sm:flex-row justify-between sm:items-baseline mb-2">
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">陕西蓝鸥信息技术 (校企实训)</h3>
                <span className="text-sm text-gray-500 dark:text-gray-400 font-mono">2025.09 - 2025.10</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">软件开发实习生 / 后端开发</p>
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                参与企业 OA 系统需求评审，基于 SpringBoot 编写业务接口并封装标准返回值；配合前端联调，独立排查 Maven 依赖冲突 Bug。
              </p>
            </div>

            <div>
              <div className="flex flex-col sm:flex-row justify-between sm:items-baseline mb-2">
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">河南华蓝信息技术集团</h3>
                <span className="text-sm text-gray-500 dark:text-gray-400 font-mono">2025.04 - 2025.06</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">大模型应用实习生</p>
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