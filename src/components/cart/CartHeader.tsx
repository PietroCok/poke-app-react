import { faLink } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { useCart } from "@/context/CartContext"
import { useModal } from "@/context/ModalContext";

export interface CartHeaderProps {

}

export function CartHeader({ }: CartHeaderProps) {
  const { cart } = useCart();
  const { showAlert } = useModal();

  const generateInviteLink = async () => {
    const inviteLink = encodeURI(`${window.location.origin}${window.location.pathname}/invite/${cart.id}/${cart.name}`);

    console.log(inviteLink);
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(inviteLink);
      showAlert(`Link di invito copiato negli appunti`);
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
        className="flex gap-05 text-center"
      >
        {
          cart.isShared &&
          <FontAwesomeIcon
            icon={faLink}
            title="Carello condiviso"
          />
        }
        <span>
          {cart.name}
        </span>
      </span>
      {
        cart.isShared &&
        <span
          className="fake-link text-small"
          onClick={generateInviteLink}
        >
          Genera link di invito
        </span>
      }
    </h3>
  )
}