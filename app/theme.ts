export const THEME_STORAGE_KEY = 'resume-theme';

export const themeInitScript = `
  try {
    const storedTheme = window.localStorage.getItem('${THEME_STORAGE_KEY}');
    const isDark = storedTheme !== 'light';
    document.documentElement.classList.toggle('dark', isDark);
    document.documentElement.style.colorScheme = isDark ? 'dark' : 'light';
  } catch (error) {
    document.documentElement.classList.add('dark');
    document.documentElement.style.colorScheme = 'dark';
  }
`;
