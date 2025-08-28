import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBowlRice, faDownload, faLinkSlash, faTrash } from "@fortawesome/free-solid-svg-icons";

import type { Cart } from "@/types";
import { ButtonIcon } from "../common/ButtonIcon";


export interface SharedCartProps {
  cart: Cart,
  activeCartId: string,
  deleteSharedCart: (cart: Cart, cartName: string) => void,
  unlinkSharedCart: () => void,
  loadCartAsActive: (cartId: string) => void
}

export function SharedCart({ cart, activeCartId, deleteSharedCart, unlinkSharedCart, loadCartAsActive }: SharedCartProps) {
  const isActiveCart = activeCartId === cart.id;
  const itemsCount = Object.keys(cart.items || {}).length;
  return (
    <div
      key={cart.id}
      className={`shared-cart flex align-center just-between ${isActiveCart ? 'border-primary' : ''}`}
    >
      <div
        className="ellipsis"
        title={cart.name}
      >
        {cart.name}
      </div>

      <div
        className="flex gap-05"
      >

        <div
          className="flex flex-center gap-05"
          title="Elementi nel carrello"
        >
          <span>{itemsCount}</span>
          <span><FontAwesomeIcon icon={faBowlRice} /></span>
        </div>

        <ButtonIcon
          icon={<FontAwesomeIcon icon={faTrash} />}
          classes="small red border-r-10"
          tooltip="Cancella carrello"
          clickHandler={() => deleteSharedCart(cart, cart.name)}
        />

        {
          isActiveCart ?
            <ButtonIcon
              icon={<FontAwesomeIcon icon={faLinkSlash} />}
              classes="small red border-r-10"
              tooltip="Scollega carrello"
              clickHandler={() => unlinkSharedCart()}
            />
            :
            <ButtonIcon
              icon={<FontAwesomeIcon icon={faDownload} />}
              classes="small primary-color border-r-10"
              tooltip="Carica come carrello attivo"
              clickHandler={() => loadCartAsActive(cart.id)}
            />
        }

      </div>
    </div>
  )
}