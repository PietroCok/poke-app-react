import { type ChangeEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faStar, faX } from "@fortawesome/free-solid-svg-icons";

import { PAYMENT_METHODS, type DishSelection, type Poke } from "@/types";
import { ButtonIcon } from "@/components/common/ButtonIcon";
import { usePokeSelection } from "@/context/PokeSelectionContext";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import { useFavorite } from "@/context/FavoriteContext";
import { useCart } from "@/context/CartContext";
import { Modal } from "@/components/modals/Modal";
import { useSelection } from "@/context/SelectionContext";
import { useMenuSelection } from "@/context/MenuSelectionContext";


export interface SaveSelectionModalProps {
  source: 'poke' | 'dish'
  hideModal: () => void
}

export function SaveSelectionModal({ source, hideModal }: SaveSelectionModalProps) {
  const { user } = useAuth();
  const { showError } = useToast();
  const { addFavorite } = useFavorite();
  const { addItem: addCart } = useCart();
  const {
    ingredients,
    resetContext: resetPokeSelection,
    size,
    editingId: pokeEditingId,
    setEditingId: setPokeEditingId,
  } = usePokeSelection();
  const {
    dishes,
    editingId: dishEditingId,
    setEditingId: setDishEditingId,
    resetContext: resetMenuSelection,
  } = useMenuSelection();
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
    let item: Poke | DishSelection;

    if (source == 'poke') {
      item = {
        id: pokeEditingId || crypto.randomUUID(),
        name: name,
        createdBy: user?.uid || '',
        paymentMethod: paymentMethod,
        ingredients: ingredients,
        size: size,
      }
    } else if (source == 'dish') {
      item = {
        id: dishEditingId || crypto.randomUUID(),
        name: name,
        createdBy: user?.uid || '',
        paymentMethod: paymentMethod,
        dishes: dishes,
      }
    } else {
      console.warn('Unknown save source');
      return;
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

    setPokeEditingId('');
    setDishEditingId('');
    resetPokeSelection();
    resetMenuSelection();
    hideModal();
  }

  const _saveCart = (item: Poke | DishSelection) => {
    const editingId = "size" in item ? pokeEditingId : dishEditingId;
    addCart(item, !!editingId);
  }

  const _saveFavorite = (item: Poke | DishSelection) => {
    const editingId = "size" in item ? pokeEditingId : dishEditingId;
    addFavorite(item, !!editingId);
  }

  return (
    <Modal
      autoFocus={true}
      title={`${source == 'poke' ? 'Salva poke' : 'Salva piatti'}`}
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