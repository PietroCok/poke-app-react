import { type ChangeEvent } from "react";
import { createPortal } from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faStar, faX } from "@fortawesome/free-solid-svg-icons";

import { PAYMENT_METHODS, type Poke } from "../types";
import { ButtonIcon } from "./common/ButtonIcon";
import { useCart } from "../context/CartContext";
import { useSelection } from "../context/configurator/SelectionContext";
import { useAuth } from "../context/AuthContext";


export interface SaveSelectionModalProps {
  setIsOpen: (value: boolean) => void
}

export function SaveSelectionModal({ setIsOpen }: SaveSelectionModalProps) {
  const { user } = useAuth();
  const { addItem } = useCart();
  const { 
    ingredients, 
    size, 
    getTotalPrice, 
    name, 
    setName, 
    paymentMethod, 
    setPaymentMethod 
  } = useSelection();

  const changePaymentMethod = (event: ChangeEvent) => {
    const target = event.target as HTMLInputElement;
    const method = target.checked ? PAYMENT_METHODS.PAYPAL : PAYMENT_METHODS.CASH;
    console.log(method);
    setPaymentMethod(method);
  }

  const handleClickOut = (event: React.MouseEvent) => {
    const target = event.target as HTMLDivElement;
    if (target.id === 'save-modal-backdrop') {
      setIsOpen(false);
    }
  }

  const saveCart = () => {
    const item: Poke = {
      id: crypto.randomUUID(),
      name: name,
      ingredients: ingredients,
      createdBy: user?.uid || '',
      size: size,
      paymentMethod: paymentMethod,
      price: getTotalPrice()
    }

    addItem(item);

    setIsOpen(false);
  }

  return (
    createPortal(
      <div
        id="save-modal-backdrop"
        className="modal-backdrop"
        onClick={handleClickOut}
      >
        <div
          className="modal-container"
        >
          <h3 className="text-center">Dai un nome alla tua poke</h3>
          <input
            type="text"
            placeholder="Nome"
            className="text-large text-center margin-1-0 w-100"
            onChange={(event) => setName(event.target.value)}
            value={name}
          />

          <h4 className="text-center">Metodo di pagamento</h4>

          <div id="payment-toogle-container" className="flex align-center just-center">
            <input type="checkbox" name="payment-method" id="payment-method" className="custom-toggle-input" onChange={changePaymentMethod} checked={paymentMethod === PAYMENT_METHODS.PAYPAL} />
            <label id="cash" htmlFor="payment-method" className="pointer flex-1 toggle toggle-left text-center disabled">Contanti</label>
            <label className="custom-toogle pointer" htmlFor="payment-method"></label>
            <label id="paypal" htmlFor="payment-method" className="pointer flex-1 toggle toggle-right text-center disabled">PayPal</label>
          </div>

          <div
            className="modal-controls flex just-between"
          >

            <ButtonIcon
              icon={<FontAwesomeIcon icon={faCartShopping} />}
              classes="gold border-r-10"
              tooltip="Salva nel carrello"
              clickHandler={saveCart}
            />

            <ButtonIcon
              icon={<FontAwesomeIcon icon={faX} />}
              classes="red border-r-10"
              tooltip="Annulla"
              clickHandler={() => setIsOpen(false)}
            />

            <ButtonIcon
              icon={<FontAwesomeIcon icon={faStar} />}
              classes="gold border-r-10"
              tooltip="Salva nei preferiti"
              clickHandler={() => alert('Coming soon')}
            />
          </div>
        </div>
      </div>,
      document.body
    )
  )
}