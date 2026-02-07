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

  // Material UI Color Palette
  const theme = {
    isDark,
    toggleTheme,
    colors: isDark ? {
      // Dark Mode - Material UI Dark
      primary: '#90caf9',      // Light blue
      primaryDark: '#42a5f5',
      secondary: '#ce93d8',    // Light purple
      background: '#121212',   // True dark
      surface: '#1e1e1e',      // Elevated surface
      surfaceLight: '#2d2d2d', // More elevated
      text: '#ffffff',
      textSecondary: '#b0b0b0',
      border: '#383838',
      error: '#f44336',
      success: '#66bb6a',
      warning: '#ffa726',
      info: '#29b6f6',
      divider: '#404040',
      hover: 'rgba(255, 255, 255, 0.08)',
      shadow: 'rgba(0, 0, 0, 0.5)',
    } : {
      // Light Mode - Material UI Light
      primary: '#1976d2',      // Blue
      primaryDark: '#1565c0',
      secondary: '#9c27b0',    // Purple
      background: '#fafafa',   // Light gray
      surface: '#ffffff',      // White
      surfaceLight: '#f5f5f5', // Light surface
      text: '#212121',
      textSecondary: '#757575',
      border: '#e0e0e0',
      error: '#d32f2f',
      success: '#388e3c',
      warning: '#f57c00',
      info: '#0288d1',
      divider: '#e0e0e0',
      hover: 'rgba(0, 0, 0, 0.04)',
      shadow: 'rgba(0, 0, 0, 0.2)',
    }
  };

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};
