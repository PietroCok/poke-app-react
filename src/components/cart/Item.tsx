import { faCoins, faCopy, faPen, faStar, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaypal } from "@fortawesome/free-brands-svg-icons";

import { PAYMENT_METHODS, type Poke } from "../../types";
import { ButtonIcon } from "../common/ButtonIcon";
import { useCart } from "../../context/CartContext";
import { itemToString } from "../../scripts/utils";
import { useState, type ToggleEvent } from "react";

export interface ItemProps {
  item: Poke,
  disabled: boolean
}

export function Item({ item, disabled }: ItemProps) {
  const { deleteItem, duplicateItem } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = (event: ToggleEvent<HTMLDetailsElement>) => {
    const target = event.target as HTMLDetailsElement;
    setIsOpen(target.open);
  }

  const classes = disabled ? 'item-disabled ' : ''

  return (
    <div
      key={item.id}
      className={`${classes}cart-item-container`}
    >
      <details
        onToggle={handleToggle}
      >
        <summary
          className="cart-item-summary flex align-center just-between"
        >
          <span>
            <FontAwesomeIcon className="cart-item-pay" icon={item.paymentMethod == PAYMENT_METHODS.CASH ? faCoins : faPaypal} />
            {item.name}
          </span>
          <div className={`flex align-center just-end ${isOpen ? '' : 'gap-05'}`}>
            <span className="cart-item-price">{item.price.toFixed(2)} €</span>
            <div className="h-2"></div>
            {
              !isOpen &&
              <ButtonIcon
                icon={<FontAwesomeIcon icon={faTrash} />}
                tooltip="Cancella elemento"
                classes='red border-r-10 small'
                disabled={disabled}
                clickHandler={() => deleteItem(item.id, item.name)}
              />
            }
          </div>
        </summary>
        <div
          className="cart-item-extra-info"
        >
          <div className="cart-item-description padding-1-0">
            {itemToString(item)}
          </div>
          <div
            className="cart-item-actions flex just-between"
          >
            <ButtonIcon
              tooltip="Modifica elemento"
              icon={<FontAwesomeIcon icon={faPen} />}
              classes="small border-r-10 primary-color"
              disabled={disabled}
              clickHandler={() => alert('coming soon')}
            />
            <ButtonIcon
              tooltip="Aggiungi ai preferiti"
              icon={<FontAwesomeIcon icon={faStar} />}
              classes="small border-r-10 gold"
              disabled={disabled}
              clickHandler={() => alert('coming soon')}
            />
            <ButtonIcon
              tooltip="Duplica elemento"
              icon={<FontAwesomeIcon icon={faCopy} />}
              classes="small border-r-10 primary-color"
              clickHandler={() => duplicateItem(item.id)}
            />
            <ButtonIcon
              tooltip="Cancella elemento"
              icon={<FontAwesomeIcon icon={faTrash} />}
              classes="small border-r-10 red"
              disabled={disabled}
              clickHandler={() => deleteItem(item.id, item.name)}
            />
          </div>
        </div>
      </details>
    </div>
  )
}
