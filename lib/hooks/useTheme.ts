import { useCallback, useEffect, useState } from 'react';

const DEFAULT_THEME = 'light';
// const html = document.documentElement;

/**
 * Allows for toggling between light and dark themes, saving the selected theme to local storage, and updating the HTML tag classes accordingly.
 *
 * @returns - {theme, toggleTheme, initTheme}
 */
export const useTheme = () => {
  // const [theme, setTheme] = useState(DEFAULT_THEME);

  const updateHTMLClassName = (theme: string) => {
    // Check the list
    const isHtmlDark = document.documentElement.classList.contains('dark');

    // Switch to dark mode
    if (theme === 'dark' && !isHtmlDark) {
      document.documentElement.classList.add('dark');
    }

    // Switch to light mode
    if (theme === 'light' && isHtmlDark) {
      document.documentElement.classList.remove('dark');
    }
  };

  const initTheme = useCallback(() => {
    console.log('Init theme');
    const lsTheme = localStorage.getItem('theme');
    if (lsTheme) {
      updateHTMLClassName(lsTheme);
    }
  }, []);

  const toggleTheme = () => {
    const lsTheme = localStorage.getItem('theme') || 'light';
    const newTheme = lsTheme === 'dark' ? 'light' : 'dark';

    updateHTMLClassName(newTheme);

    // Save to local storage
    localStorage.setItem('theme', newTheme);
  };

  // Switch the list of html tag classes

  return { initTheme, toggleTheme };
};
