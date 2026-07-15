'use client';

import { setResumeLanguage, useResumeLanguage } from './language';

export default function LanguageToggle() {
  const language = useResumeLanguage();

  return (
    <div
      className="inline-flex h-9 items-center rounded-lg border border-slate-200 bg-slate-100 p-0.5 text-xs font-semibold shadow-sm dark:border-slate-700 dark:bg-slate-800"
      role="group"
      aria-label={language === 'zh' ? '切换简历语言' : 'Switch resume language'}
    >
      {(['en', 'zh'] as const).map((option) => {
        const active = language === option;
        return (
          <button
            key={option}
            type="button"
            onClick={() => setResumeLanguage(option)}
            className={`h-8 min-w-10 rounded-md px-2 transition-colors ${
              active
                ? 'bg-white text-blue-600 shadow-sm dark:bg-slate-700 dark:text-blue-300'
                : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
            }`}
            aria-pressed={active}
          >
            {option === 'en' ? 'EN' : '中'}
          </button>
        );
      })}
    </div>
  );
}
