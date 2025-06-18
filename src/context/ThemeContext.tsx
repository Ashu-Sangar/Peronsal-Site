import { createContext, useContext, ReactNode } from 'react';

interface Theme {
  nav: {
    bubble: string;
  };
}

interface ThemeContextType {
  currentTheme: Theme;
}

const defaultTheme: Theme = {
  nav: {
    bubble: 'rgba(255, 255, 255, 0.1)',
  },
};

const ThemeContext = createContext<ThemeContextType>({ currentTheme: defaultTheme });

export const useTheme = () => useContext(ThemeContext);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  return (
    <ThemeContext.Provider value={{ currentTheme: defaultTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}; 