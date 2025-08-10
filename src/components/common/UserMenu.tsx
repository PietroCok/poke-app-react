import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket, faTrash, faUser } from "@fortawesome/free-solid-svg-icons";

import { ButtonIcon } from "./ButtonIcon";
import { useAuth } from "../../context/AuthContext";




export function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { logout, deleteAccount } = useAuth();

  return (
    <div
      className="flex gap-1 row-reverse"
    >
      <ButtonIcon
        icon={<FontAwesomeIcon color={`var(--primary-color)`} icon={faUser} />}
        classes=" border-r-10"
        tooltip="Menu Utente"
        clickHandler={() => setIsOpen(!isOpen)}
      />

      {
        isOpen &&
        <>
          < ButtonIcon
            icon={<FontAwesomeIcon color={`var(--accent-red)`} icon={faRightFromBracket} />}
            classes="red border-r-10"
            tooltip="Logout"
            clickHandler={logout}
          />

          <ButtonIcon
            icon={<FontAwesomeIcon color={`var(--accent-red)`} icon={faTrash} />}
            classes="red border-r-10"
            tooltip="Cancella account"
            clickHandler={deleteAccount}
          />
        </>
      }


    </div>
  )
}
