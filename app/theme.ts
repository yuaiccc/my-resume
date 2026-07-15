export const THEME_STORAGE_KEY = 'resume-theme';
export const ACCESSIBILITY_STORAGE_KEY = 'resume-accessibility';
export const LANGUAGE_STORAGE_KEY = 'resume-language';

export const themeInitScript = `
  try {
    const storedTheme = window.localStorage.getItem('${THEME_STORAGE_KEY}');
    const isDark = storedTheme === 'dark';
    const accessibilityMode = window.localStorage.getItem('${ACCESSIBILITY_STORAGE_KEY}') === 'on';
    const language = window.localStorage.getItem('${LANGUAGE_STORAGE_KEY}') === 'zh' ? 'zh-CN' : 'en';
    document.documentElement.classList.toggle('dark', isDark);
    document.documentElement.classList.toggle('accessibility-mode', accessibilityMode);
    document.documentElement.lang = language;
    document.documentElement.style.colorScheme = isDark ? 'dark' : 'light';
  } catch (error) {
    document.documentElement.style.colorScheme = 'light';
  }
`;
