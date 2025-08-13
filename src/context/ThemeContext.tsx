import { createContext, useContext, useEffect } from "react";

import { faA, faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { useLocalStorage } from "../hooks/useLocalStorage";

const darkModeSaturation = '60%';
const darkModeLightness = '50%';

const lightModeSaturation = '75%';
const lightModeLightness = '30%';

const defaultHue = 150;
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

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
  setTheme: (theme: Theme) => void,
  color: number,
  setColor: (color: number) => void
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
  const [hue, setColor] = useLocalStorage<number>('preferred-theme-color', defaultHue);

  // fall back to auto if invalid theme is found in localstorage
  const theme = isValidTheme(storedTheme) ? storedTheme : "auto";
  // Set initial them retrieved from localstorage

  useEffect(() => {
    setTheme(theme);
    setThemeColor(hue);
  }, [])

  const setTheme = (theme: Theme) => {
    setSelectedTheme(theme);
    document.body.setAttribute('data-theme', theme);

    adjustThemeContrast(theme);
  }

  const setThemeColor = (color: number) => {
    const hue = typeof color != 'number' ?  defaultHue : color % 360;
    setColor(hue);

    const root = document.documentElement;
    root.style.setProperty('--theme-hue-primary', `${hue}`);
  }

  const adjustThemeContrast = (theme: string) => {
    let saturation = darkModeSaturation;
    let lightness = darkModeLightness;
    if(theme === 'light' || (theme === 'auto' && !prefersDark)){
      saturation = lightModeSaturation;
      lightness = lightModeLightness;
    }

    const root = document.documentElement;
    root.style.setProperty('--theme-saturation-primary', `${saturation}`);
    root.style.setProperty('--theme-lightness-primary', `${lightness}`);
  }

  return (
    <ThemeContext.Provider
      value={{ theme, setTheme, color: hue, setColor: setThemeColor }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

const isValidTheme = (theme: string) => {
  return Object.keys(iconMapping).includes(theme);
}