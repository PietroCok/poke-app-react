import { useState } from "react";

import { type Theme, type ThemeOption } from "../../context/ThemeContext";

import { ButtonIcon } from "./ButtonIcon";
import { iconMapping, useTheme, themeOptions } from "../../context/ThemeContext";

export interface ThemeSwitcherProps {
  setIsOpen: (status: boolean) => void
}

export function ThemeSwitcher({ setIsOpen: setMenuIsOpen }: ThemeSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const selectedIcon = iconMapping[theme];

  const updateTheme = (theme: Theme) => {
    setTheme(theme);
    setMenuIsOpen(false);
  }

  return (
    <div
      className="flex gap-1 row-reverse"
    >
      <ButtonIcon
        icon={selectedIcon}
        clickHandler={() => setIsOpen(!isOpen)}
        classes="border-r-10"
      />

      {isOpen &&
        <div
          className="flex gap-1"
        >
          {renderOtherOptions(themeOptions, theme, updateTheme)}
        </div>
      }
    </div>
  )
}

function renderOtherOptions(options: ThemeOption[], selected: Theme, updateTheme: (theme: Theme) => void) {
  return options.map(option => {
    if (option.theme === selected) return null;

    return (
      <ButtonIcon
        key={option.theme}
        icon={option.icon}
        clickHandler={() => updateTheme(option.theme)}
        classes="border-r-10"
      />
    )
  })
}