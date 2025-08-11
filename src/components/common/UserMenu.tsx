import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket, faShield, faTrash, faUser, faUsers } from "@fortawesome/free-solid-svg-icons";

import type { SubMenuProps } from "@/types";
import { ButtonIcon } from "./ButtonIcon";
import { useAuth } from "../../context/AuthContext";
import { StackedIcons } from "./StackedIcons";


export interface UserMenuProps extends SubMenuProps {

}

export function UserMenu({ menuId, openMenuId, setMenuId }: UserMenuProps) {
  const { profile, logout, deleteAccount } = useAuth();

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
          {
            profile?.role === 'admin' &&
            <ButtonIcon
              icon={
                <StackedIcons
                  outer={<FontAwesomeIcon color={`var(--primary-color)`} icon={faUsers} />}
                  inner={<FontAwesomeIcon color={`var(--main-color)`} icon={faShield} />}
                />
              }
              classes="border-r-10"
              tooltip="Gestione utenti"
              linkTo={"/admin/users"}
            />
          }

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
