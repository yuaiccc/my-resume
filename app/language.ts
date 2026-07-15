'use client';

import { useSyncExternalStore } from 'react';
import { LANGUAGE_STORAGE_KEY } from './theme';

export type ResumeLanguage = 'en' | 'zh';

const LANGUAGE_CHANGE_EVENT = 'resume-language-change';

const subscribeToLanguage = (onStoreChange: () => void) => {
  window.addEventListener(LANGUAGE_CHANGE_EVENT, onStoreChange);
  window.addEventListener('storage', onStoreChange);

  return () => {
    window.removeEventListener(LANGUAGE_CHANGE_EVENT, onStoreChange);
    window.removeEventListener('storage', onStoreChange);
  };
};

const getLanguageSnapshot = (): ResumeLanguage =>
  window.localStorage.getItem(LANGUAGE_STORAGE_KEY) === 'zh' ? 'zh' : 'en';

const getServerLanguageSnapshot = (): ResumeLanguage => 'en';

export const useResumeLanguage = () =>
  useSyncExternalStore(subscribeToLanguage, getLanguageSnapshot, getServerLanguageSnapshot);

export const setResumeLanguage = (language: ResumeLanguage) => {
  window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en';
  window.dispatchEvent(new Event(LANGUAGE_CHANGE_EVENT));
};
