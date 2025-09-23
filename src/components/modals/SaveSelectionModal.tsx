import { type ChangeEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faStar, faX } from "@fortawesome/free-solid-svg-icons";

import { PAYMENT_METHODS, type Poke } from "@/types";
import { ButtonIcon } from "@/components/common/ButtonIcon";
import { usePokeSelection } from "@/context/PokeSelectionContext";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import { useFavorite } from "@/context/FavoriteContext";
import { useCart } from "@/context/CartContext";
import { Modal } from "@/components/modals/Modal";
import { useSelection } from "@/context/SelectionContext";


export interface SaveSelectionModalProps {
  hideModal: () => void
}

export function SaveSelectionModal({ hideModal }: SaveSelectionModalProps) {
  const { user } = useAuth();
  const { showError } = useToast();
  const { addFavorite } = useFavorite();
  const { addItem: addCart } = useCart();
  const {
    ingredients,
    resetContext: resetSelection,
    size,
    editingId,
    setEditingId,
  } = usePokeSelection();
  const {
    name,
    setName,
    paymentMethod,
    setPaymentMethod,
  } = useSelection();

  const changePaymentMethod = (event: ChangeEvent) => {
    const target = event.target as HTMLInputElement;
    const method = target.checked ? PAYMENT_METHODS.PAYPAL : PAYMENT_METHODS.CASH;
    setPaymentMethod(method);
  }

  const saveTo = (destination: string) => {
    const item: Poke = {
      id: editingId || crypto.randomUUID(),
      name: name,
      ingredients: ingredients,
      createdBy: user?.uid || '',
      size: size,
      paymentMethod: paymentMethod,
    }

    switch (destination) {
      case 'cart':
        _saveCart(item)
        break;

      case 'favorite':
        _saveFavorite(item);
        break;

      default:
        showError('Destinazione di salvataggio non valida')
        break;
    }

    setEditingId('');
    resetSelection();
    hideModal();
  }

  const _saveCart = (item: Poke) => {
    addCart(item, !!editingId);
  }

  const _saveFavorite = (item: Poke) => {
    addFavorite(item, !!editingId);
  }

  return (
    <Modal
      autoFocus={true}
      title={`Salva poke`}
      titleClasses="text-center"
      hideModal={hideModal}
      actions={[
        <ButtonIcon
          key={`saveFavotires`}
          icon={<FontAwesomeIcon icon={faStar} />}
          classes="gold border-r-10"
          tooltip="Salva nei preferiti"
          clickHandler={() => saveTo('favorite')}
        />,
        <ButtonIcon
          key={`cancel`}
          icon={<FontAwesomeIcon icon={faX} />}
          classes="red main-bg border-r-10"
          tooltip="Annulla"
          clickHandler={hideModal}
        />,
        <ButtonIcon
          key={`saveCart`}
          icon={<FontAwesomeIcon icon={faCartShopping} />}
          classes="gold border-r-10"
          tooltip="Salva nel carrello"
          clickHandler={() => saveTo('cart')}
        />
      ]}
      actionsClasses="just-between"
      content={
        <>
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
        </>
      }
    />
  )
}