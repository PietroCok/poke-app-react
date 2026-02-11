import { memo, useState, type ToggleEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaypal } from "@fortawesome/free-brands-svg-icons";
import { faCoins } from "@fortawesome/free-solid-svg-icons";

import { PAYMENT_METHODS, type DishSelection, type Poke } from "../../types";
import { getIngredientPrice, getPokePrice, isDishSelection, isPoke, itemToString, shallowEqual, totalMenuSelectionPrice } from "../../scripts/utils";

export interface ItemProps {
  item: Poke | DishSelection,
  disabled?: boolean,
  actions: any[]
  useMemo?: boolean
}

export const Item = memo(_Item, areEquals);

function areEquals(prevProps: ItemProps, nextProps: ItemProps) {
  // Conditionally skip memoization checks
  if (!nextProps.useMemo) return false;

  const prevItem = prevProps.item;
  const nextItem = nextProps.item;

  if (isPoke(prevItem) && isPoke(nextItem)) {
    return (
      isSamePoke(prevItem, nextItem) &&
      prevProps.disabled === nextProps.disabled
    );
  } else if (isDishSelection(prevItem) && isDishSelection(nextItem)) {
    return (
      isSameDishSelection(prevItem, nextItem) &&
      prevProps.disabled === nextProps.disabled
    );
  }

  // One of each type
  return false;
}

function isSameDishSelection(prevItem: DishSelection, nextItem: DishSelection) {

  if (prevItem.dishes.length != nextItem.dishes.length) {
    return false;
  }

  const sortedPrevDishes = prevItem.dishes.sort((a, b) => a.id.localeCompare(b.id));
  const sortedNextDishes = nextItem.dishes.sort((a, b) => a.id.localeCompare(b.id));

  for (let i = 0; i < sortedPrevDishes.length; i++) {
    const prevDish = sortedPrevDishes[i];
    const nextDish = sortedNextDishes[i];
    if (prevDish.id != nextDish.id) {
      return false;
    }

    if (prevDish.quantity != nextDish.quantity) {
      return false;
    }
  }

  return true;
}

function isSamePoke(prevItem: Poke, nextItem: Poke) {
  const {
    ingredients: prevIngredientsGroup,
    ...prevOthers
  } = prevItem;

  const {
    ingredients: nextIngredientsGroup,
    ...nextOthers
  } = nextItem;

  // Compare fist level properties
  if (!shallowEqual(prevOthers, nextOthers)) return false;

  const prevGroupsKeys = Object.keys(prevIngredientsGroup);
  const nextGroupsKeys = Object.keys(nextIngredientsGroup);

  // Compares items groups number
  if (prevGroupsKeys.length != nextGroupsKeys.length) return false;

  // Compare each group
  for (const groupKey of prevGroupsKeys) {
    const prevIngredients = prevIngredientsGroup[groupKey]
    const nextIngredients = nextIngredientsGroup[groupKey]

    if (prevIngredients.length != nextIngredients.length) return false;

    const sortedPrevIngredients = [...prevIngredients].sort((a, b) => a.id.localeCompare(b.id));
    const sortedNextIngredients = [...nextIngredients].sort((a, b) => a.id.localeCompare(b.id));

    for (let i = 0; i < sortedPrevIngredients.length; i++) {
      if (
        sortedPrevIngredients[i].id !== sortedNextIngredients[i].id ||
        sortedPrevIngredients[i].quantity !== sortedNextIngredients[i].quantity ||
        getIngredientPrice(sortedPrevIngredients[i].id) !== getIngredientPrice(sortedNextIngredients[i].id)
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

  const itemPrice = (() => {
    if (isPoke(item)) {
      return getPokePrice(item.size, item.ingredients);
    } else if (isDishSelection(item)) {
      return totalMenuSelectionPrice(item.dishes);
    } else {
      return 0;
    }
  })();

  const classes = disabled ? 'item-disabled ' : '';

  return (
    <div
      className={`${classes}cart-item-container`}
    >
      <details
        onToggle={handleToggle}
      >
        <summary
          className="cart-item-summary flex align-center just-between padding-1"
        >
          <span
            className="ellipsis"
          >
            <FontAwesomeIcon className="cart-item-pay" icon={item.paymentMethod == PAYMENT_METHODS.CASH ? faCoins : faPaypal} />
            {item.name}
          </span>
          <div className={`flex align-center just-end min-w-fit ${isOpen ? '' : 'gap-05'}`}>
            <span className="cart-item-price">{itemPrice.toFixed(2)} €</span>
            <div className="h-button-icon"></div>
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
