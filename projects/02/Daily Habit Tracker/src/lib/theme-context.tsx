'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './auth-context';

type Theme = 'light' | 'dark' | 'system';
type ColorScheme = 'indigo' | 'emerald' | 'rose' | 'amber';

interface ThemeContextType {
  theme: Theme;
  colorScheme: ColorScheme;
  setTheme: (theme: Theme) => void;
  setColorScheme: (colorScheme: ColorScheme) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  colorScheme: 'indigo',
  setTheme: () => {},
  setColorScheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [theme, setTheme] = useState<Theme>('light');
  const [colorScheme, setColorScheme] = useState<ColorScheme>('indigo');

  useEffect(() => {
    // Load saved preferences from localStorage
    const savedTheme = localStorage.getItem('theme') as Theme;
    const savedColorScheme = localStorage.getItem('colorScheme') as ColorScheme;

    if (savedTheme) setTheme(savedTheme);
    if (savedColorScheme && user?.isPremium) setColorScheme(savedColorScheme);
  }, [user?.isPremium]);

  const updateTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Apply theme to document
    if (newTheme === 'dark' || (newTheme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const updateColorScheme = (newColorScheme: ColorScheme) => {
    if (!user?.isPremium) return;
    setColorScheme(newColorScheme);
    localStorage.setItem('colorScheme', newColorScheme);
  };

  // Listen for system theme changes
  useEffect(() => {
    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = (e: MediaQueryListEvent) => {
        if (e.matches) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      };

      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [theme]);

  // Initial theme application
  useEffect(() => {
    updateTheme(theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, colorScheme, setTheme: updateTheme, setColorScheme: updateColorScheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);