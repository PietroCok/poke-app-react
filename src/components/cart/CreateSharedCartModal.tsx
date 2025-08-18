import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faX } from "@fortawesome/free-solid-svg-icons";

import { ButtonIcon } from "../common/ButtonIcon";
import { useCart } from "@/context/CartContext";
import { useNavigate } from "react-router-dom";
import { useModal } from "@/context/ModalContext";

export interface CreateSharedCartModalProps {
  setIsOpen: (value: boolean) => void
}

export function CreateSharedCartModal({ setIsOpen }: CreateSharedCartModalProps) {
  const [cartName, setCartName] = useState('');
  const [useActiveCart, setuseActiveCart] = useState(false);
  const { createCart } = useCart();
  const navigate = useNavigate();
  const { showAlert } = useModal();

  const handleClickOut = (event: React.MouseEvent) => {
    const target = event.target as HTMLDivElement;
    if (target.id === 'create-shared-cart-modal-backdrop') {
      setIsOpen(false);
    }
  }

  const createSharedCart = async (event: any) => {
    event.preventDefault();
    if (!cartName) return;

    const createResult = await createCart(cartName, useActiveCart);
    if(!createResult){
      showAlert('Errore creazione carrello condiviso!')
      return;
    }

    navigate('/cart');
  }

  return (
    <div
      id="create-shared-cart-modal-backdrop"
      className="modal-backdrop"
      onClick={handleClickOut}
    >
      <form
        className="modal-container"
      >
        <h3 className="text-center">Nuovo carrello condiviso</h3>

        <div>
          <input
            type="text"
            placeholder="Nome"
            className="text-large text-center margin-1-0 w-100"
            onChange={(event) => setCartName(event.target.value)}
            value={cartName}
            required
          />

          <div
            className="flex align-center gap-1 padding-1-0"
            title="Utilizza i dati del carrello attualmente attivo"
          >
            <label htmlFor="use-local-cart">
              Collega carrello locale
            </label>
            <label
              htmlFor="use-local-cart"
              className={`checkbox ${useActiveCart ? 'checked' : ''}`}
            >
            </label>
            <input
              id="use-local-cart"
              type="checkbox"
              className="text-large text-center margin-1-0 w-100"
              onChange={(event) => setuseActiveCart(event.target.checked)}
              checked={useActiveCart}
            />
          </div>

        </div>

        <div
          className="modal-controls flex just-between"
        >
          <ButtonIcon
            icon={<FontAwesomeIcon icon={faX} />}
            classes="red border-r-10"
            tooltip="Annulla"
            clickHandler={() => setIsOpen(false)}
            type="reset"
          />

          <ButtonIcon
            icon={<FontAwesomeIcon icon={faSave} />}
            classes="primary-color border-r-10"
            tooltip="Salva nel carrello"
            clickHandler={createSharedCart}
          />
        </div>
      </form>
    </div>
  )
}