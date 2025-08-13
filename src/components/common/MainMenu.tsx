import { useState } from "react";
import { createPortal } from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCartShopping, faShareNodes, faStar, faX } from "@fortawesome/free-solid-svg-icons";

import { ButtonIcon } from "./ButtonIcon";
import { useAuth } from "../../context/AuthContext";
import { StackedIcons } from "./StackedIcons";
import { UserMenu } from "../UserMenu";
import { ThemeModeSwitcher } from "../ThemeModeSwitcher";
import { ThemeColorSwitcher } from "../ThemeColorSwitcher";

export interface MainMenuProps {
  extraMenuItems?: React.ReactNode
}

export function MainMenu({ extraMenuItems }: MainMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();

  // Tracks current open submenu
  const [openMenuId, setOpenMenuId] = useState('');

  const setSubMenuId = (menuId: string) => {
    setOpenMenuId((openMenuId === menuId) ? '' : menuId);
  }

  function checkCloseMenu(event: React.MouseEvent<HTMLElement> | React.TouchEvent<HTMLElement>) {
    // Close the menu only if the user has not clicked one of the buttons
    const target = event.target as HTMLElement;
    if (target.id == "main-menu-overlay" || target.id == "main-menu-options") {
      setIsOpen(false);
    }
  }

  function renderMenuOptions() {
    return (
      <div
        id="main-menu-overlay"
        onClick={checkCloseMenu}
        onTouchStart={checkCloseMenu}
      >
        <div
          id="main-menu-options"
          className="flex flex-column align-end gap-1"
        >
          <ButtonIcon
            icon={<FontAwesomeIcon icon={faX} />}
            clickHandler={() => setIsOpen(false)}
            classes="red border-r-10"
            tooltip="Chiudi"
          />

          <ThemeModeSwitcher
            menuId={'theme-mode'}
            openMenuId={openMenuId}
            setMenuId={setSubMenuId}
          />

          <ThemeColorSwitcher
            menuId={'theme-colorcolor'}
            openMenuId={openMenuId}
            setMenuId={setSubMenuId}
          />

          <ButtonIcon
            icon={<FontAwesomeIcon icon={faStar} />}
            classes="gold border-r-10"
            tooltip="Preferiti"
            linkTo={"/favorites"}
          />

          {/* The following are available only when the user is logged in */}
          {
            user &&
            <>
              <ButtonIcon
                icon={
                  <StackedIcons
                    outer={<FontAwesomeIcon color={`var(--accent-gold)`} icon={faCartShopping} />}
                    inner={<FontAwesomeIcon color={`var(--primary-color)`} icon={faShareNodes} />}
                  />
                }
                classes="primary-color border-r-10"
                tooltip="Carrelli condivisi"
              />

              <UserMenu
                menuId={'user-menu'}
                openMenuId={openMenuId}
                setMenuId={setSubMenuId}
              />
            </>
          }

          {extraMenuItems}

        </div>
      </div>
    )
  }

  if (!isOpen) {
    return (
      <div id="main-menu">
        <ButtonIcon
          icon={<FontAwesomeIcon icon={faBars} />}
          classes="primary-color border-r-10"
          clickHandler={() => setIsOpen(true)}
          tooltip="Apri menu"
        />
      </div>
    )
  } else {
    return (
      <>
        {createPortal(
          renderMenuOptions(),
          document.getElementById('root')!
        )}
      </>
    )
  }
}


