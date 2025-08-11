import { faSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import type { SubMenuProps } from "@/types";
import { ButtonIcon } from "./ButtonIcon";
import { useTheme } from "../../context/ThemeContext";

// red, orange, acquagreen, cyan, pink
const hues = [0, 30, 150, 210, 310];

export interface ThemeColorSwitcherProps extends SubMenuProps {
  
}

export function ThemeColorSwitcher({ menuId, openMenuId, setMenuId }: ThemeColorSwitcherProps) {
  const { color, setColor } = useTheme();

  const isOpen = openMenuId === menuId;

  const updateColor = (hue: number) => {
    setColor(hue);
    setMenuId('');
  }

  return (
      <div
        className="flex gap-1 row-reverse align-start"
      >
        <ButtonIcon
          icon={<FontAwesomeIcon icon={faSquare} />}
          classes="transparent border-r-10"
          clickHandler={() => setMenuId(menuId)}
          tooltip={isOpen ? "" : "Scelta colore"}
          style={{
            backgroundColor: getHls(color)
          }}
        />

        {
          isOpen &&
          <div
            className="flex flex-wrap gap-1 just-end"
          >
            {renderOtherColorOptions(color, updateColor)}
          </div>
        }
      </div>
  )
}

function renderOtherColorOptions(hue: number, updateColor: (hue: number) => void) {
  return hues.map(h => {
    if (h === hue) return null;

    const hls = getHls(h);
    return (
      <ButtonIcon
        key={h}
        icon={<FontAwesomeIcon icon={faSquare} />}
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