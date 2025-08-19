import { type ChangeEvent } from "react";
import { createPortal } from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faStar, faX } from "@fortawesome/free-solid-svg-icons";

import { PAYMENT_METHODS, type Poke } from "../types";
import { ButtonIcon } from "./common/ButtonIcon";
import { useCart } from "../context/CartContext";
import { useSelection } from "../context/configurator/SelectionContext";
import { useAuth } from "../context/AuthContext";
import { useModal } from "@/context/ModalContext";
import { useToast } from "@/context/ToastContext";


export interface SaveSelectionModalProps {
  setIsOpen: (value: boolean) => void
}

export function SaveSelectionModal({ setIsOpen }: SaveSelectionModalProps) {
  const {showAlert} = useModal();
  const { user } = useAuth();
  const { addItem, updateItemFromEditing } = useCart();
  const { showInfo } = useToast();
  const { 
    ingredients,
    resetContext: resetSelection,
    size, 
    getTotalPrice, 
    name, 
    setName, 
    paymentMethod, 
    setPaymentMethod,
    editingId,
    setEditingId
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
      id: editingId || crypto.randomUUID(),
      name: name,
      ingredients: ingredients,
      createdBy: user?.uid || '',
      size: size,
      paymentMethod: paymentMethod,
      price: getTotalPrice()
    }

    if(editingId) {
      updateItemFromEditing(item);
      setEditingId('');
      showInfo('Elemento Aggiornato nel carrello')
    } else {
      addItem(item);
      showInfo('Elemento salvato nel carrello')
    }

    resetSelection();

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
              clickHandler={() => showAlert('Coming soon')}
            />
          </div>
        </div>
      </div>,
      document.body
    )
  )
}