import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import type { SubMenuProps } from "@/types";
import { type Theme } from "../context/ThemeContext";
import { ButtonIcon } from "./common/ButtonIcon";
import { iconMapping, useTheme, themeOptions } from "../context/ThemeContext";


export interface ThemeModeSwitcherProps extends SubMenuProps {

}

export function ThemeModeSwitcher({ menuId, openMenuId, setMenuId }: ThemeModeSwitcherProps) {
  const { theme, setTheme } = useTheme();

  const selectedIcon = iconMapping[theme];
  const isOpen = openMenuId === menuId;

  const updateTheme = (theme: Theme) => {
    setTheme(theme);
    setMenuId('');
  }

  return (
    <div
      id="theme-selector"
      className="flex gap-1 row-reverse"
    >
      <ButtonIcon
        icon={<FontAwesomeIcon icon={selectedIcon} />}
        clickHandler={() => setMenuId(menuId)}
        classes="selected-theme border-r-10"
        tooltip={isOpen ? theme : "Scelta tema"}
      />

      {isOpen &&
        <div
          className="flex gap-1"
        >
          {renderOtherThemeOptions(theme, updateTheme)}
        </div>
      }
    </div>

  )
}

function renderOtherThemeOptions(selected: Theme, updateTheme: (theme: Theme) => void) {
  return themeOptions.map(option => {
    if (option.theme === selected) return null;

    return (
      <ButtonIcon
        key={option.theme}
        icon={<FontAwesomeIcon icon={option.icon} />}
        clickHandler={() => updateTheme(option.theme)}
        classes="border-r-10"
        tooltip={option.theme}
      />
    )
  })
}
