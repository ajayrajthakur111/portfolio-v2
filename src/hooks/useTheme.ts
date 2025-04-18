// src/hooks/useTheme.ts
import { useContext } from 'react';
import { ThemeContext } from '@/context/ThemeContext';

export const useTheme = () => {
  const context = useContext(ThemeContext);
  
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return {
    theme: context.theme,
    toggleTheme: context.toggleTheme,
    setTheme: context.setTheme,
    isDarkMode: context.theme === 'dark',
    isLightMode: context.theme === 'light'
  };
};