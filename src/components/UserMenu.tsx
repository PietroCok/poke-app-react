import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket, faShield, faTrash, faUser, faUsers } from "@fortawesome/free-solid-svg-icons";

import type { SubMenuProps } from "@/types";
import { ButtonIcon } from "./common/ButtonIcon";
import { useAuth } from "../context/AuthContext";
import { StackedIcons } from "./common/StackedIcons";
import { useNavigate } from "react-router-dom";
import { useModal } from "@/context/ModalContext";
import { useToast } from "@/context/ToastContext";


export interface UserMenuProps extends SubMenuProps {

}

export function UserMenu({ menuId, openMenuId, setMenuId }: UserMenuProps) {
  const { profile, logout, deleteAccount } = useAuth();
  const { showConfirm } = useModal();
  const { showInfo } = useToast();
  const navigate = useNavigate();

  const isOpen = openMenuId === menuId;

  const _deleteAccount = async () => {
    if (!(await showConfirm(`Procedere con l'eliminazione dell'account e i dati dei carrelli condivisi associati all'utente ${profile?.email}?Questa operazione non è reversibile`))) {
      return;
    }

    const result = await deleteAccount();
    if (result && result.redirect) {
      navigate(result.redirect);
      return;
    }

    showInfo(`Account ${profile?.email} eliminato`, {duration: 5});
  }

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
            clickHandler={_deleteAccount}
          />
        </>
      }


    </div>
  )
}
