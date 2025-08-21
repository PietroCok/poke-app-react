import { useState } from "react";
import { faAngleDown, faBowlFood, faCoins } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaypal } from "@fortawesome/free-brands-svg-icons";

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
        className="flex gap-2"
      >
        <div
          className="flex gap-05"
        >
          <FontAwesomeIcon icon={faBowlFood} />
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
    </section>
  )
}