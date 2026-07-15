export const THEME_STORAGE_KEY = 'resume-theme';
export const LANGUAGE_STORAGE_KEY = 'resume-language';

export const themeInitScript = `
  try {
    const storedTheme = window.localStorage.getItem('${THEME_STORAGE_KEY}');
    const isDark = storedTheme === 'dark';
    const language = window.localStorage.getItem('${LANGUAGE_STORAGE_KEY}') === 'zh' ? 'zh-CN' : 'en';
    document.documentElement.classList.toggle('dark', isDark);
    document.documentElement.lang = language;
    document.documentElement.style.colorScheme = isDark ? 'dark' : 'light';
  } catch (error) {
    document.documentElement.style.colorScheme = 'light';
  }
`;
