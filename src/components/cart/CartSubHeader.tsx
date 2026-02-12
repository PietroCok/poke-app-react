import { useState } from "react";
import { faAngleDown, faBowlFood, faCoins, faTag, faUtensils } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaypal } from "@fortawesome/free-brands-svg-icons";
import { NavLink } from "react-router-dom";

import { useCart } from "@/context/CartContext";
import { PAYMENT_METHODS } from "@/types";

export interface CartSubHeaderProps {

}

export function CartSubHeader({ }: CartSubHeaderProps) {
  const { getItemsCount, getTotalPrice } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  const itemsCount = getItemsCount();
  const paypalSubtotal = getTotalPrice(PAYMENT_METHODS.PAYPAL);
  const cashSubtotal = getTotalPrice(PAYMENT_METHODS.CASH);

  return (
    <section
      className="cart-info flex flex-center gap-1 flex-column pointer"
      onClick={() => setIsOpen(!isOpen)}
    >
      <div
        className="flex gap-2 cart-info-summary"
      >
        <div
          className="flex gap-05"
        >
          <FontAwesomeIcon icon={faTag} />
          <span
          >
            {itemsCount}
          </span>
        </div>
        <div
          className="flex gap-05"
        >
          {getTotalPrice().toFixed(2)} €
        </div>

        {
          itemsCount > 0 &&
          <FontAwesomeIcon
            icon={faAngleDown}
            className={`absolute right-0 ${isOpen && 'rotate-180'}`}
          />
        }
      </div>

      {
        isOpen && getTotalPrice() != 0 &&
        <div
          className="cart-price-detail flex gap-2"
        >
          {
            paypalSubtotal > 0 &&
            <span
              className="flex gap-05 align-center"
            >
              <FontAwesomeIcon icon={faPaypal} />
              <span>{paypalSubtotal.toFixed(2)} €</span>
            </span>
          }

          {
            cashSubtotal > 0 &&
            <span
              className="flex gap-05 align-center"
            >
              <FontAwesomeIcon icon={faCoins} />
              <span>{cashSubtotal.toFixed(2)} €</span>
            </span>
          }
        </div>
      }

      <div className="flex w-100 gap-1">
        <NavLink
          className="flex-1 flex flex-center padding-1 new-cart-poke gap-05"
          title="Aggiungi poke"
          to={'/poke-configurator'}
        >
          {/* <FontAwesomeIcon icon={faPlus} /> */}
          <FontAwesomeIcon icon={faBowlFood} />
          Poke
        </NavLink>
        <NavLink
          className="flex-1 flex flex-center padding-1 new-cart-dish gap-05"
          title="Aggiungi piatti da menu"
          to={'/menu'}
        >
          {/* <FontAwesomeIcon icon={faPlus} /> */}
          <FontAwesomeIcon icon={faUtensils} />
          Menu
        </NavLink>
      </div>
    </section>
  )
}