import { faLink } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { useCart } from "@/context/CartContext"
import { useModal } from "@/context/ModalContext";
import { useToast } from "@/context/ToastContext";

export interface CartHeaderProps {

}

export function CartHeader({ }: CartHeaderProps) {
  const { cart } = useCart();
  const { showAlert } = useModal();
  const { showInfo } = useToast();

  const generateInviteLink = async () => {
    const inviteLink = encodeURI(`${window.location.origin}${window.location.pathname}/invite/${cart.id}/${cart.name}`);

    console.log(inviteLink);
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(inviteLink);
      showInfo(`Link di invito copiato negli appunti`, {duration: 5});
    } else {
      // clipboard not supported -> show full link in modal to be manually copied
      showAlert(`${inviteLink}`);
    }
  }

  return (
    <h3
      className="h-100 flex flex-center gap-05 flex-column"
      // contentEditable={"plaintext-only"}
    >
      <span
        className="flex gap-05 just-center w-100"
      >
        {
          cart.isShared &&
          <FontAwesomeIcon
            icon={faLink}
            title="Carello condiviso"
          />
        }
        <span
          className="ellipsis"
        >
          {cart.name}
        </span>
      </span>
      {
        cart.isShared &&
        <span
          className="fake-link text-small text-center"
          onClick={generateInviteLink}
        >
          Genera link di invito
        </span>
      }
    </h3>
  )
}