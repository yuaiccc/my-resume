'use client';

import { useState } from 'react';

type Project = {
  id: string;
  name: string;
  href: string;
  summary: string;
  description: string;
  languageLabel: string;
  languageColor: string;
  metaLabel: string;
};

const PROJECTS: Project[] = [
  {
    id: 'sillytavern',
    name: 'SillyTavern/SillyTavern',
    href: 'https://github.com/SillyTavern/SillyTavern',
    summary: 'LLM Frontend for Power Users.',
    description:
      'SillyTavern 是一个功能强大的本地 LLM 前端界面，支持多模型 API 接入、角色扮演卡片与插件扩展。我在该项目中提交了 21 个已合并 PR，持续参与核心功能与体验优化。',
    languageLabel: 'JavaScript',
    languageColor: '#f1e05a',
    metaLabel: '21 Merged PRs',
  },
  {
    id: 'japanese-verb',
    name: 'yuaiccc/japanese-verb-master',
    href: 'https://github.com/yuaiccc/japanese-verb-master',
    summary: '一个精准的日语动词活用在线工具和文档网站，支持五段、一段及不规则动词的自动变换。',
    description:
      '独立开发的日语动词活用变形工具。基于 Vue 构建响应式界面，支持五段、一段、サ变、カ变等多类动词的自动变形及规则说明，帮助学习者快速掌握语法变化。',
    languageLabel: 'Vue',
    languageColor: '#41b883',
    metaLabel: 'Public',
  },
];

const RepoIcon = () => (
  <svg className="w-4 h-4 text-gray-500 flex-shrink-0" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
    <path
      fillRule="evenodd"
      d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z"
    />
  </svg>
);

const ChevronIcon = ({ expanded }: { expanded: boolean }) => (
  <svg
    className={`w-4 h-4 text-gray-400 transform transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
  </svg>
);

const ExternalLinkIcon = () => (
  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
  </svg>
);

const MergedIcon = () => (
  <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
    <path
      fillRule="evenodd"
      d="M5 3.254V3.25v.005a.75.75 0 110-.005v.004c0-.016.001-.031.004-.046A1.25 1.25 0 016.25 2h.661a.75.75 0 000-1.5H6.25A2.75 2.75 0 003.5 3.25v.005a.75.75 0 100-.005v.004c.003.015.004.03.004.046A1.25 1.25 0 012.25 4.5h-.5a.75.75 0 000 1.5h.5c.34 0 .651-.137.876-.36l.24.239A2.75 2.75 0 004.75 8v1.5H3.5a.75.75 0 000 1.5h1.25a2.75 2.75 0 002.75-2.75v-1.5a1.25 1.25 0 011.25-1.25h.5a.75.75 0 000-1.5h-.5A2.75 2.75 0 006 6.75V8.25a.75.75 0 110 .005V8.25a.75.75 0 010-.005V8.25a.75.75 0 000-1.5v-3.5zM12.5 3.25v.005a.75.75 0 110-.005v.004c0-.016.001-.031.004-.046A1.25 1.25 0 0113.75 2h.5a.75.75 0 000-1.5h-.5A2.75 2.75 0 0011 3.25v.005a.75.75 0 100-.005v.004c.003.015.004.03.004.046A1.25 1.25 0 019.75 4.5h-.5a.75.75 0 000 1.5h.5c.34 0 .651-.137.876-.36l.24.239A2.75 2.75 0 0012.25 8v1.5h-1.25a.75.75 0 000 1.5h1.25a2.75 2.75 0 002.75-2.75v-1.5a1.25 1.25 0 011.25-1.25h.5a.75.75 0 000-1.5h-.5a2.75 2.75 0 00-2.75 2.75v1.5a.75.75 0 110 .005V8.25a.75.75 0 010-.005V8.25a.75.75 0 000-1.5v-3.5z"
    />
  </svg>
);

export default function OpenSourceProjects() {
  const [expandedProjects, setExpandedProjects] = useState<Record<string, boolean>>({});

  return (
    <section className="animate-fade-in-up delay-100">
      <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 border-l-4 border-blue-400 pl-4 mb-6">开源项目</h2>
      <div className="grid md:grid-cols-2 gap-4">
        {PROJECTS.map((project) => {
          const expanded = Boolean(expandedProjects[project.id]);

          return (
            <article
              key={project.id}
              data-spotlight-card
              className="interactive-card p-5 rounded-lg border border-gray-100 dark:border-gray-700 hover:shadow-md hover:border-blue-200 dark:hover:border-blue-800 transition-all duration-300 group bg-slate-50 dark:bg-slate-800/50"
            >
              <button
                type="button"
                onClick={() =>
                  setExpandedProjects((current) => ({
                    ...current,
                    [project.id]: !current[project.id],
                  }))
                }
                className="w-full text-left cursor-pointer"
                aria-expanded={expanded}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-500 transition-colors flex items-center gap-2 truncate">
                    <RepoIcon />
                    <span className="truncate">{project.name}</span>
                  </h3>
                  <ChevronIcon expanded={expanded} />
                </div>
              </button>

              <div className={`overflow-hidden transition-all duration-300 ${expanded ? 'max-h-[500px] opacity-100 mb-4' : 'max-h-0 opacity-0 m-0'}`}>
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed bg-white dark:bg-gray-800 p-3 rounded border border-gray-100 dark:border-gray-700 shadow-inner">
                  {project.description}
                </p>
                <div className="mt-3 text-right">
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-blue-500 hover:text-blue-600 font-medium px-2 py-1 rounded bg-blue-50 dark:bg-blue-900/30 transition-colors"
                  >
                    前往 GitHub <ExternalLinkIcon />
                  </a>
                </div>
              </div>

              {!expanded && (
                <p className="mb-4 h-10 line-clamp-2 text-sm text-gray-600 dark:text-gray-300 transition-all duration-300">
                  {project.summary}
                </p>
              )}

              <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: project.languageColor }} />
                  {project.languageLabel}
                </span>
                <span className="flex items-center gap-1">
                  {project.id === 'sillytavern' ? <MergedIcon /> : '⭐'}
                  {project.metaLabel}
                </span>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
