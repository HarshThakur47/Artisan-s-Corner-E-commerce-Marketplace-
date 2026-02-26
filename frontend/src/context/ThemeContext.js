import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved ? saved === 'dark' : false;
  });

  useEffect(() => {
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  const theme = {
    isDark,
    toggleTheme,
    colors: isDark ? {
      primary: '#8B5CF6',      
      primaryDark: '#7C3AED',  
      secondary: '#A78BFA',    
      background: '#0F0E17',  
      surface: '#1E1B29',     
      surfaceLight: '#2D2B42',
      text: '#FFFFFE',
      textSecondary: '#94A1B2',
      border: '#2D2B42',  
      error: '#FF5470',
      success: '#2CB67D',
      warning: '#FF8E3C',
      divider: '#2D2B42',
      hover: 'rgba(139, 92, 246, 0.1)',
      shadow: 'rgba(0, 0, 0, 0.6)',
    } : {
      primary: '#2E2A3B',
      primaryDark: '#1A1821', 
      secondary: '#6D597A', 
      background: '#F9F8FC', 
      surface: '#ffffff', 
      surfaceLight: '#F3F4F6',
      text: '#2E2A3B',
      textSecondary: '#6B7280',
      border: '#E5E7EB',
      error: '#EF4444',
      success: '#10B981',
      warning: '#F59E0B',
      divider: '#E5E7EB',
      hover: 'rgba(46, 42, 59, 0.05)',
      shadow: 'rgba(46, 42, 59, 0.1)',
    },
  };

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};