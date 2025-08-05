import { useState } from "react";
import { createPortal } from "react-dom";
import { NavLink } from "react-router-dom";

import { ButtonIcon } from "./ButtonIcon";
import { faBars, faCloud, faStar, faUser, faX } from "@fortawesome/free-solid-svg-icons";
import { ThemeSwitcher } from "./ThemeSwitcher";

export function MainMenu() {
  const [isOpen, setIsOpen] = useState(false);

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
            icon={faX}
            clickHandler={() => setIsOpen(false)}
            classes="red border-r-10"
          />

          <ThemeSwitcher />

          <NavLink
            to={"/favorites"}
          >
            <ButtonIcon
              icon={faStar}
              classes="gold border-r-10"
            />
          </NavLink>

          <NavLink
            to={"/personal"}
          >
            <ButtonIcon
              icon={faUser}
              classes="primary-color border-r-10"
            />
          </NavLink>


          <ButtonIcon
            icon={faCloud}
            classes="primary-color border-r-10"
          />
        </div>
      </div>
    )
  }

  if (!isOpen) {
    return (
      <div id="main-menu">
        <ButtonIcon
          icon={faBars}
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


