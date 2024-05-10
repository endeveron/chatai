import { useCallback } from 'react';

/**
 * Allows for toggling between light and dark themes, saving the selected theme to local storage, and updating the HTML tag classes accordingly.
 *
 * @returns - { initTheme, toggleTheme }
 */
export const useTheme = () => {
  // Switch the list of html tag classes
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

  return { initTheme, toggleTheme };
};
