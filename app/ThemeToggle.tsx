'use client';

import { useSyncExternalStore } from 'react';
import { useResumeLanguage } from './language';
import { THEME_STORAGE_KEY } from './theme';

type IconProps = { className?: string };

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

const THEME_CHANGE_EVENT = 'resume-theme-change';

const subscribeToTheme = (onStoreChange: () => void) => {
  window.addEventListener(THEME_CHANGE_EVENT, onStoreChange);
  return () => window.removeEventListener(THEME_CHANGE_EVENT, onStoreChange);
};

const getThemeSnapshot = () => document.documentElement.classList.contains('dark');
const getServerThemeSnapshot = () => false;

export default function ThemeToggle() {
  const darkMode = useSyncExternalStore(subscribeToTheme, getThemeSnapshot, getServerThemeSnapshot);
  const zh = useResumeLanguage() === 'zh';

  const toggleTheme = () => {
    const nextDarkMode = !darkMode;
    document.documentElement.classList.toggle('dark', nextDarkMode);
    document.documentElement.style.colorScheme = nextDarkMode ? 'dark' : 'light';
    window.localStorage.setItem(THEME_STORAGE_KEY, nextDarkMode ? 'dark' : 'light');
    window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="inline-flex items-center gap-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors shadow-md text-sm"
      aria-label={darkMode ? (zh ? '切换到浅色模式' : 'Switch to light mode') : (zh ? '切换到深色模式' : 'Switch to dark mode')}
    >
      {darkMode ? <SunIcon /> : <MoonIcon />}
      <span>{darkMode ? (zh ? '浅色' : 'Light Mode') : (zh ? '深色' : 'Dark Mode')}</span>
    </button>
  );
}
