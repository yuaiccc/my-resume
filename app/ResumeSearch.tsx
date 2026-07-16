'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useResumeLanguage, type ResumeLanguage } from './language';

type SearchResult = {
  id: string;
  category: string;
  title: string;
  period: string;
  tech: string;
  link: string;
  content: string;
  score: number;
};

const DEBOUNCE_MS = 300;
// Chinese carries far more info per character; drop the floor so single-char
// filters like "记" or "语" still get a chance to fire while EN still needs 2.
const MIN_QUERY_LEN: Record<ResumeLanguage, number> = { en: 2, zh: 1 };
// Same reasoning for the summary preview line.
const CONTENT_TRUNCATE: Record<ResumeLanguage, number> = { en: 180, zh: 90 };

const CATEGORY_STYLES: Record<string, string> = {
  'Selected Project': 'bg-blue-50 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
  'Open Source': 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
  Experience: 'bg-amber-50 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
  Education: 'bg-violet-50 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300',
  Capability: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
  Language: 'bg-rose-50 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300',
};

const CATEGORY_LABEL_ZH: Record<string, string> = {
  'Selected Project': '精选项目',
  'Open Source': '开源',
  Experience: '经历',
  Education: '教育',
  Capability: '能力',
  Language: '语言',
};

// UI copy, keyed by language.
const COPY = {
  en: {
    placeholder: 'Search my projects and skills…  (semantic, powered by Jina)',
    ariaLabel: 'Search my resume',
    searching: 'Searching…',
    searchFailed: 'Search failed.',
    noMatches: (q: string) => `No matches for “${q}”.`,
  },
  zh: {
    placeholder: '搜索我的项目和技能…（语义搜索，由 Jina 提供）',
    ariaLabel: '搜索我的简历',
    searching: '搜索中…',
    searchFailed: '搜索失败。',
    noMatches: (q: string) => `没有匹配 “${q}” 的结果。`,
  },
} as const;

function truncate(s: string, n: number): string {
  if (!s) return '';
  return s.length <= n ? s : s.slice(0, n).trimEnd() + '…';
}

export default function ResumeSearch() {
  const language = useResumeLanguage();
  const t = COPY[language];
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[] | null>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const runSearch = useCallback(async (q: string, lang: ResumeLanguage) => {
    abortRef.current?.abort();
    const ctrl = new AbortController();
    abortRef.current = ctrl;
    setStatus('loading');
    setErrorMsg(null);
    try {
      const res = await fetch(
        `/api/search?q=${encodeURIComponent(q)}&k=5&lang=${lang}`,
        { signal: ctrl.signal },
      );
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.error || `search failed (${res.status})`);
      }
      const data = (await res.json()) as { results: SearchResult[] };
      setResults(data.results);
      setStatus('idle');
    } catch (err) {
      if ((err as Error).name === 'AbortError') return;
      setStatus('error');
      setErrorMsg((err as Error).message);
      setResults(null);
    }
  }, []);

  // Debounced trigger — re-fires when either the query OR the language changes,
  // so switching EN↔中 with a live query hits the right vector pool.
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    const trimmed = query.trim();
    if (trimmed.length < MIN_QUERY_LEN[language]) {
      setResults(null);
      setStatus('idle');
      setErrorMsg(null);
      return;
    }
    debounceRef.current = setTimeout(() => runSearch(trimmed, language), DEBOUNCE_MS);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query, language, runSearch]);

  // ⌘K / Ctrl+K focus, Esc to close.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
        setOpen(true);
      } else if (e.key === 'Escape') {
        setOpen(false);
        inputRef.current?.blur();
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Click-outside closes the dropdown.
  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target as Node)) setOpen(false);
    }
    window.addEventListener('mousedown', onClick);
    return () => window.removeEventListener('mousedown', onClick);
  }, []);

  const showDropdown =
    open &&
    query.trim().length >= MIN_QUERY_LEN[language] &&
    (status !== 'idle' || results !== null);

  return (
    <div
      className="sticky top-0 z-40 w-full border-b border-slate-200/70 dark:border-slate-800/70 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-slate-950/60"
      role="search"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5">
        <div ref={containerRef} className="relative">
          <div className="flex items-center gap-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm focus-within:border-blue-400 dark:focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-400/20 dark:focus-within:ring-blue-500/20 transition-all">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="ml-3 h-4 w-4 text-slate-400 dark:text-slate-500 flex-shrink-0"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" strokeLinecap="round" />
            </svg>
            <input
              ref={inputRef}
              type="search"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setOpen(true);
              }}
              onFocus={() => setOpen(true)}
              placeholder={t.placeholder}
              aria-label={t.ariaLabel}
              lang={language === 'zh' ? 'zh-CN' : 'en'}
              className="flex-1 bg-transparent py-2 pr-2 text-sm text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none"
              spellCheck={false}
              autoComplete="off"
            />
            <kbd className="mr-3 hidden sm:inline-flex items-center gap-1 rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-1.5 py-0.5 text-[10px] font-mono text-slate-500 dark:text-slate-400">
              ⌘K
            </kbd>
          </div>

          {showDropdown && (
            <div
              role="listbox"
              className="absolute left-0 right-0 mt-2 max-h-[min(70vh,32rem)] overflow-y-auto rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-lg ring-1 ring-black/5 dark:ring-white/5"
            >
              {status === 'loading' && (
                <div className="p-4 text-sm text-slate-500 dark:text-slate-400">{t.searching}</div>
              )}

              {status === 'error' && (
                <div className="p-4 text-sm text-rose-600 dark:text-rose-400">
                  {errorMsg || t.searchFailed}
                </div>
              )}

              {status === 'idle' && results && results.length === 0 && (
                <div className="p-4 text-sm text-slate-500 dark:text-slate-400">
                  {t.noMatches(query.trim())}
                </div>
              )}

              {status === 'idle' && results && results.length > 0 && (
                <ul className="divide-y divide-slate-100 dark:divide-slate-800">
                  {results.map((r) => {
                    const badgeClass =
                      CATEGORY_STYLES[r.category] ??
                      'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300';
                    const badgeLabel =
                      language === 'zh'
                        ? (CATEGORY_LABEL_ZH[r.category] ?? r.category)
                        : r.category;
                    const Wrapper: React.ElementType = r.link ? 'a' : 'div';
                    const wrapperProps = r.link
                      ? {
                          href: r.link,
                          target: '_blank',
                          rel: 'noopener noreferrer',
                        }
                      : {};
                    return (
                      <li key={r.id}>
                        <Wrapper
                          {...wrapperProps}
                          className="block px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors cursor-pointer"
                        >
                          <div className="flex items-start justify-between gap-3 mb-1">
                            <div className="flex flex-wrap items-center gap-2 min-w-0">
                              <span
                                className={`inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide ${badgeClass}`}
                              >
                                {badgeLabel}
                              </span>
                              <span className="font-semibold text-sm text-slate-900 dark:text-slate-100 truncate">
                                {r.title}
                              </span>
                            </div>
                            <span className="flex-shrink-0 font-mono text-[10px] text-slate-400 dark:text-slate-500">
                              {r.score.toFixed(3)}
                            </span>
                          </div>
                          {(r.period || r.tech) && (
                            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-slate-500 dark:text-slate-400 mb-1.5">
                              {r.period && <span className="font-mono">{r.period}</span>}
                              {r.tech && <span>{r.tech}</span>}
                            </div>
                          )}
                          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                            {truncate(r.content, CONTENT_TRUNCATE[language])}
                          </p>
                        </Wrapper>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
