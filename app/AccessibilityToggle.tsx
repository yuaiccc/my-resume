'use client';

import { useSyncExternalStore } from 'react';
import { useResumeLanguage } from './language';
import { ACCESSIBILITY_STORAGE_KEY } from './theme';

type IconProps = { className?: string };

const AccessibilityIcon = ({ className = 'w-4 h-4' }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden="true">
    <circle cx="12" cy="5" r="2.2" />
    <path d="M4 9.5h16" />
    <path d="M12 9.5v10.75" />
    <path d="M8.2 20.25L12 15.5l3.8 4.75" />
    <path d="M6.8 14.25L12 9.5l5.2 4.75" />
  </svg>
);

const ACCESSIBILITY_CHANGE_EVENT = 'resume-accessibility-change';

const subscribeToAccessibility = (onStoreChange: () => void) => {
  window.addEventListener(ACCESSIBILITY_CHANGE_EVENT, onStoreChange);
  return () => window.removeEventListener(ACCESSIBILITY_CHANGE_EVENT, onStoreChange);
};

const getAccessibilitySnapshot = () => document.documentElement.classList.contains('accessibility-mode');
const getServerAccessibilitySnapshot = () => false;

export default function AccessibilityToggle() {
  const enabled = useSyncExternalStore(
    subscribeToAccessibility,
    getAccessibilitySnapshot,
    getServerAccessibilitySnapshot,
  );
  const zh = useResumeLanguage() === 'zh';

  const toggleAccessibility = () => {
    const nextEnabled = !enabled;
    document.documentElement.classList.toggle('accessibility-mode', nextEnabled);
    window.localStorage.setItem(ACCESSIBILITY_STORAGE_KEY, nextEnabled ? 'on' : 'off');
    window.dispatchEvent(new Event(ACCESSIBILITY_CHANGE_EVENT));
  };

  return (
    <button
      type="button"
      onClick={toggleAccessibility}
      className="inline-flex items-center gap-2 bg-amber-100 text-amber-900 px-4 py-2 rounded-lg hover:bg-amber-200 transition-colors shadow-md text-sm dark:bg-amber-500/15 dark:text-amber-100 dark:hover:bg-amber-500/25"
      aria-pressed={enabled}
      aria-label={enabled ? (zh ? '关闭无障碍模式' : 'Disable accessibility mode') : (zh ? '开启无障碍模式' : 'Enable accessibility mode')}
    >
      <AccessibilityIcon />
      <span>{enabled ? (zh ? '无障碍：开' : 'Accessibility On') : (zh ? '无障碍：关' : 'Accessibility Off')}</span>
    </button>
  );
}
