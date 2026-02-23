import { useState } from "react";
import { createPortal } from "react-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCartShopping, faGear, faRightFromBracket, faShareNodes, faShoppingCart, faStar, faX } from "@fortawesome/free-solid-svg-icons";

import { ButtonIcon } from "./ButtonIcon";
import { useAuth } from "../../context/AuthContext";
import { StackedIcons } from "./StackedIcons";
import { faHouse } from "@fortawesome/free-regular-svg-icons";
import { MenuElement } from "./MenuElement";
import type { ButtonTextIconProps } from "./ButtonTextIcon";
import { PageHeader } from "./PageHeader";
import { useModal } from "@/context/ModalContext";
import { Settings } from "./Settings";

export interface MainMenuProps {
  extraMenuItems?: ButtonTextIconProps[]
}

export function MainMenu({ extraMenuItems }: MainMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const { showConfirm } = useModal();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const _logout = async () => {
    if (await showConfirm(`Procedere con la disconnessione dall'account?`)) {
      await logout();
      if (!user) {
        navigate("/login");
      }
    }
  }

  const closeMenu = (destinationRoute = "", force = false) => {
    (force || destinationRoute == location.pathname) && setIsOpen(false);
  }

  function renderMenu() {
    return (
      <div
        className="page-container h-100 w-100 z-100 absolute top-0 main-bg"
      >
        <PageHeader
          classes="main-bg"
          right={
            <ButtonIcon
              icon={<FontAwesomeIcon icon={faX} />}
              classes="red border-r-10"
              tooltip="Chiudi"
              clickHandler={() => closeMenu("", true)}
            />
          }
          left={
            <h3
              className="h-100 flex align-center"
            >
              Menu
            </h3>
          }
        />

        <div
          className="flex flex-column"
        >

          <MenuElement
            text="Home"
            icon={<FontAwesomeIcon icon={faHouse} />}
            classes="primary-color top-separator-light bottom-separator-light"
            tooltip="Home"
            linkTo={"/"}
            clickHandler={() => closeMenu("/")}
          />

          <MenuElement
            text="Preferiti"
            icon={<FontAwesomeIcon icon={faStar} />}
            classes="gold bottom-separator-light"
            tooltip="Preferiti"
            linkTo={"/favorites"}
            clickHandler={() => closeMenu("/favorites")}
          />

          <MenuElement
            text="Carrello"
            icon={<FontAwesomeIcon icon={faShoppingCart} />}
            classes="gold bottom-separator-light"
            tooltip="Carrello"
            linkTo={"/cart"}
            clickHandler={() => closeMenu("/cart")}
          />

          {
            user &&
            <MenuElement
              text="Carrelli condivisi"
              icon={
                <StackedIcons
                  outer={<FontAwesomeIcon color={`var(--accent-gold)`} icon={faCartShopping} />}
                  inner={<FontAwesomeIcon color={`var(--primary-color)`} icon={faShareNodes} />}
                />
              }
              classes="primary-color bottom-separator-light"
              tooltip="Carrelli condivisi"
              linkTo="/shared-carts"
              clickHandler={() => closeMenu("/shared-carts")}
            />
          }

          <MenuElement
            text="Impostazioni"
            icon={<FontAwesomeIcon icon={faGear} />}
            tooltip="Impostazioni"
            classes={`main-color ${!isSettingsOpen ? `bottom-separator-light` : `padding-bottom-0`}`}
            clickHandler={() => setIsSettingsOpen(!isSettingsOpen)}
          />

          {
            isSettingsOpen && <Settings />
          }

          {
            user &&
            <MenuElement
              text="Logout"
              icon={<FontAwesomeIcon color={`var(--accent-red)`} icon={faRightFromBracket} />}
              classes="bottom-separator-light"
              tooltip="Logout"
              clickHandler={_logout}
            />
          }

          {extraMenuItems?.map(elementProps => <MenuElement {...elementProps} />)}

        </div>
      </div>
    )
  }

  return (
    <>
      <div id="main-menu">
        <ButtonIcon
          icon={<FontAwesomeIcon icon={faBars} />}
          classes="primary-color border-r-10"
          clickHandler={() => setIsOpen(true)}
          tooltip="Apri menu"
        />
      </div>

      {isOpen && createPortal(
        renderMenu(),
        document.getElementById('root')!
      )}
    </>
  )
}

