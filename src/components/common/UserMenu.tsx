import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket, faTrash, faUser } from "@fortawesome/free-solid-svg-icons";

import type { SubMenuProps } from "@/types";
import { ButtonIcon } from "./ButtonIcon";
import { useAuth } from "../../context/AuthContext";


export interface UserMenuProps extends SubMenuProps {

}

export function UserMenu({ menuId, openMenuId, setMenuId }: UserMenuProps) {
  const { logout, deleteAccount } = useAuth();

  const isOpen = openMenuId === menuId;

  return (
    <div
      className="flex gap-1 row-reverse"
    >
      <ButtonIcon
        icon={<FontAwesomeIcon color={`var(--primary-color)`} icon={faUser} />}
        classes="border-r-10"
        tooltip="Menu Utente"
        clickHandler={() => setMenuId(menuId)}
      />

      {
        isOpen &&
        <>
          < ButtonIcon
            icon={<FontAwesomeIcon color={`var(--accent-red)`} icon={faRightFromBracket} />}
            classes="border-r-10"
            tooltip="Logout"
            clickHandler={logout}
          />

          <ButtonIcon
            icon={<FontAwesomeIcon color={`var(--accent-red)`} icon={faTrash} />}
            classes="border-r-10"
            tooltip="Cancella account"
            clickHandler={deleteAccount}
          />
        </>
      }


    </div>
  )
}
