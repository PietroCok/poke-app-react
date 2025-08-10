import { useState } from "react";

import { type Theme } from "../../context/ThemeContext";

import { ButtonIcon } from "./ButtonIcon";
import { iconMapping, useTheme, themeOptions } from "../../context/ThemeContext";
import { faSquare } from "@fortawesome/free-solid-svg-icons";

// red, orange, acquagreen, cyan, pink
const hues = [0, 30, 150, 210, 310];

export interface ThemeSwitcherProps {
}

export function ThemeSwitcher({ }: ThemeSwitcherProps) {
  const [isThemeOpen, setIsThemeOpen] = useState(false);
  const [isColorOpen, setisColorOpen] = useState(false);
  const { theme, setTheme, color, setColor } = useTheme();

  const selectedIcon = iconMapping[theme];

  const updateTheme = (theme: Theme) => {
    setTheme(theme);
    setIsThemeOpen(false);
  }

  const updateColor = (hue: number) => {
    setColor(hue);
    setisColorOpen(false);
  }

  return (
    <div
      className="flex gap-1 flex-column align-end"
    >
      {/* Theme mode selector */}
      <div
        className="flex gap-1 row-reverse"
      >
        <ButtonIcon
          icon={selectedIcon}
          clickHandler={() => setIsThemeOpen(!isThemeOpen)}
          classes="selected-theme border-r-10"
        />

        {isThemeOpen &&
          <div
            className="flex gap-1"
          >
            {renderOtherThemeOptions(theme, updateTheme)}
          </div>
        }
      </div>

      {/* Theme color selector */}
      <div
        className="flex gap-1 row-reverse align-start"
      >
        <ButtonIcon
          icon={faSquare}
          classes="transparent border-r-10"
          clickHandler={() => setisColorOpen(!isColorOpen)}
          style={{
            backgroundColor: getHls(color)
          }}
        />

        {
          isColorOpen &&
          <div
            className="flex flex-wrap gap-1 just-end"
          >
            {renderOtherColorOptions(color, updateColor)}
          </div>
        }
      </div>
    </div>
  )
}

function renderOtherThemeOptions(selected: Theme, updateTheme: (theme: Theme) => void) {
  return themeOptions.map(option => {
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

function renderOtherColorOptions(hue: number, updateColor: (hue: number) => void) {
  return hues.map(h => {
    if (h === hue) return null;

    const hls = getHls(h);
    return (
      <ButtonIcon
        key={h}
        icon={faSquare}
        classes="transparent border-r-10"
        style={{
          backgroundColor: hls
        }}
        clickHandler={() => updateColor(h)}
      />
    )
  })
}

const getHls = (hue: number) => {
  return `hsl(${hue}, var(--theme-saturation-primary), var(--theme-lightness-primary))`
}