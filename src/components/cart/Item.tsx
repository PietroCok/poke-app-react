import { memo, useState, type ToggleEvent } from "react";
import { faCoins, faCopy, faPen, faStar, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaypal } from "@fortawesome/free-brands-svg-icons";

import { PAYMENT_METHODS, type Poke } from "../../types";
import { ButtonIcon } from "../common/ButtonIcon";
import { itemToString, shallowEqual } from "../../scripts/utils";
import { useNavigate } from "react-router-dom";

export interface ItemProps {
  item: Poke,
  disabled: boolean,
  deleteItem: (itemId: string, itemName: string) => void,
  duplicateItem: (itemId: string) => void,
  editItem: (item: Poke) => void,
  useMemo?: boolean
}

export const Item = memo(_Item, areEquals);

function areEquals(prevProps: ItemProps, nextProps: ItemProps) {
  // Conditionally skip memoization checks
  if (!nextProps.useMemo) return false;

  return (
    isSameItem(prevProps.item, nextProps.item) &&
    prevProps.disabled === nextProps.disabled
  );
}

function isSameItem(prevItem: Poke, nextItem: Poke){
  const {
    ingredients: prevIngredientsGroup,
    ...prevOthers
  } = prevItem;

  const {
    ingredients: nextIngredientsGroup,
    ...nextOthers
  } = nextItem;

  // Compare fist level properties
  if(!shallowEqual(prevOthers, nextOthers)) return false;

  const prevGroupsKeys = Object.keys(prevIngredientsGroup);
  const nextGroupsKeys = Object.keys(nextIngredientsGroup);

  // Compares items groups number
  if(prevGroupsKeys.length != nextGroupsKeys.length) return false;

  // Compare each group
  for(const groupKey of prevGroupsKeys){
    const prevIngredients = prevIngredientsGroup[groupKey]
    const nextIngredients = nextIngredientsGroup[groupKey]

    if(prevIngredients.length != nextIngredients.length) return false;

    const sortedPrevIngredients = [...prevIngredients].sort((a, b) => a.id.localeCompare(b.id));
    const sortedNextIngredients = [...nextIngredients].sort((a, b) => a.id.localeCompare(b.id));

    for(let i = 0; i < sortedPrevIngredients.length; i++){
      if(
        sortedPrevIngredients[i].id !== sortedNextIngredients[i].id ||
        sortedPrevIngredients[i].quantity !== sortedNextIngredients[i].quantity ||
        sortedPrevIngredients[i].price !== sortedNextIngredients[i].price
      ) {
        return false;
      }
    }
  }
  return true;
}

function _Item({ item, disabled, deleteItem, duplicateItem, editItem }: ItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleToggle = (event: ToggleEvent<HTMLDetailsElement>) => {
    const target = event.target as HTMLDetailsElement;
    setIsOpen(target.open);
  }

  const classes = disabled ? 'item-disabled ' : '';

  const _editItem = () => {
    editItem(item);

    navigate('/');
  }

  return (
    <div
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
              clickHandler={_editItem}
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
