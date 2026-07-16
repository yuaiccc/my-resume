'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

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
const MIN_QUERY_LEN = 2;

const CATEGORY_STYLES: Record<string, string> = {
  'Selected Project': 'bg-blue-50 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
  'Open Source': 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
  Experience: 'bg-amber-50 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
  Education: 'bg-violet-50 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300',
  Capability: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
  Language: 'bg-rose-50 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300',
};

function truncate(s: string, n: number): string {
  if (!s) return '';
  return s.length <= n ? s : s.slice(0, n).trimEnd() + '…';
}

export default function ResumeSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[] | null>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const runSearch = useCallback(async (q: string) => {
    abortRef.current?.abort();
    const ctrl = new AbortController();
    abortRef.current = ctrl;
    setStatus('loading');
    setErrorMsg(null);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(q)}&k=5`, {
        signal: ctrl.signal,
      });
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

  // Debounced trigger.
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    const trimmed = query.trim();
    if (trimmed.length < MIN_QUERY_LEN) {
      setResults(null);
      setStatus('idle');
      setErrorMsg(null);
      return;
    }
    debounceRef.current = setTimeout(() => runSearch(trimmed), DEBOUNCE_MS);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query, runSearch]);

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
    query.trim().length >= MIN_QUERY_LEN &&
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
              placeholder="Search my projects and skills…  (semantic, powered by Jina)"
              aria-label="Search my resume"
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
                <div className="p-4 text-sm text-slate-500 dark:text-slate-400">Searching…</div>
              )}

              {status === 'error' && (
                <div className="p-4 text-sm text-rose-600 dark:text-rose-400">
                  {errorMsg || 'Search failed.'}
                </div>
              )}

              {status === 'idle' && results && results.length === 0 && (
                <div className="p-4 text-sm text-slate-500 dark:text-slate-400">
                  No matches for “{query.trim()}”.
                </div>
              )}

              {status === 'idle' && results && results.length > 0 && (
                <ul className="divide-y divide-slate-100 dark:divide-slate-800">
                  {results.map((r) => {
                    const badgeClass =
                      CATEGORY_STYLES[r.category] ??
                      'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300';
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
                                {r.category}
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
                            {truncate(r.content, 180)}
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
