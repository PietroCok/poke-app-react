import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faX } from "@fortawesome/free-solid-svg-icons";

import { ButtonIcon } from "../common/ButtonIcon";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import { Modal } from "./Modal";

export interface CreateSharedCartModalProps {
  setIsOpen: (value: boolean) => void
}

export function CreateSharedCartModal({ setIsOpen }: CreateSharedCartModalProps) {
  const [cartName, setCartName] = useState('');
  const [useActiveCart, setuseActiveCart] = useState(false);
  const { createCart } = useCart();
  const { showError } = useToast();
  const navigate = useNavigate();

  const createSharedCart = async (event: any) => {
    event.preventDefault();
    if (!cartName) return;

    const createResult = await createCart(cartName, useActiveCart);
    if (!createResult) {
      showError('Errore creazione carrello condiviso!')
      return;
    }

    navigate('/cart');
  }

  return (
    <Modal
      hideModal={() => setIsOpen(false)}
      autoFocus={true}
      title={`Nuovo carrello condiviso`}
      titleClasses="text-center"
      actions={[
        <ButtonIcon
          key={`save`}
          icon={<FontAwesomeIcon icon={faSave} />}
          classes="primary-color border-r-10"
          tooltip="Salva nel carrello"
          clickHandler={createSharedCart}
        />,
        <ButtonIcon
          key={`cancel`}
          icon={<FontAwesomeIcon icon={faX} />}
          classes="red main-bg border-r-10"
          tooltip="Annulla"
          clickHandler={() => setIsOpen(false)}
          type="reset"
        />
      ]}
      actionsClasses="just-between"
      content={
        <>
          <input
            type="text"
            placeholder="Nome"
            className="text-large text-center margin-1-0 w-100"
            onChange={(event) => setCartName(event.target.value)}
            value={cartName}
            required
          />

          <div
            className="flex flex-center gap-1 padding-1-0 pointer"
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
        </>
      }
    />
  )
}