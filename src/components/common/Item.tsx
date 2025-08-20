import { memo, useState, type ToggleEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaypal } from "@fortawesome/free-brands-svg-icons";
import { faCoins } from "@fortawesome/free-solid-svg-icons";

import { PAYMENT_METHODS, type Poke } from "../../types";
import { itemToString, shallowEqual } from "../../scripts/utils";

export interface ItemProps {
  item: Poke,
  disabled?: boolean,
  actions: any[]
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

function _Item({ item, disabled = false, actions }: ItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = (event: ToggleEvent<HTMLDetailsElement>) => {
    const target = event.target as HTMLDetailsElement;
    setIsOpen(target.open);
  }

  const classes = disabled ? 'item-disabled ' : '';

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
              actions.slice(-1)
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
            {actions}
          </div>
        </div>
      </details>
    </div>
  )
}
