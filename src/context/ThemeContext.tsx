import { createContext, useContext, useEffect } from "react";

import { faA, faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { useLocalStorage } from "../hooks/localStorage";

export const iconMapping = {
  "light": faSun,
  "dark": faMoon,
  "auto": faA
} as const;

export const themeOptions = Object.entries(iconMapping).map(o => {
  return {
    theme: o[0] as Theme,
    icon: o[1]
  }
})

export type ThemeOption = typeof themeOptions[0];

export type Theme = keyof typeof iconMapping;

export type ThemeContextType = {
  theme: Theme,
  setTheme: (theme: Theme) => void
}

export interface ThemeProviderProps {
  children: React.ReactNode
}

const ThemeContext = createContext<ThemeContextType | null>(null);
export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within an ThemeProvider');
  return ctx;
};

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [storedTheme, setSelectedTheme] = useLocalStorage<Theme>('preferred-theme', 'auto');

  // fall back to auto if invalid theme is found in localstorage
  const theme = isValidTheme(storedTheme) ? storedTheme : "auto";

  // Set initial them retrieved from localstorage
  useEffect(() => {
    setTheme(theme);
  }, [])

  const setTheme = (theme: Theme) => {
    setSelectedTheme(theme);

    document.body.setAttribute('data-theme', theme);
  }

  return (
    <ThemeContext.Provider
      value={{ theme, setTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

const isValidTheme = (theme: string) => {
  return Object.keys(iconMapping).includes(theme);
}