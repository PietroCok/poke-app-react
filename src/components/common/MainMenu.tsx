import { useState } from "react";
import { createPortal } from "react-dom";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCartShopping, faRightFromBracket, faShareNodes, faStar, faX } from "@fortawesome/free-solid-svg-icons";

import { ButtonIcon } from "./ButtonIcon";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { useAuth } from "../../context/AuthContext";
import { StackedIcons } from "./StackedIcons";

export function MainMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useAuth();

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

          <ThemeSwitcher />

          <NavLink
            to={"/favorites"}
          >
            <ButtonIcon
              icon={<FontAwesomeIcon icon={faStar} />}
              classes="gold border-r-10"
              tooltip="Preferiti"
            />
          </NavLink>

          <ButtonIcon
            icon={<FontAwesomeIcon icon={faRightFromBracket} />}
            classes="red border-r-10"
            tooltip="Logout"
            clickHandler={logout}
          />

          <ButtonIcon
            icon={
              <StackedIcons
                outer={<FontAwesomeIcon color={`var(--accent-gold)`} icon={faCartShopping}/>}
                inner={<FontAwesomeIcon color={`var(--primary-color)`} icon={faShareNodes}/>}
              />
            }
            classes="primary-color border-r-10"
            tooltip="Carrelli condivisi"
          />
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


