import type { Cart, Poke } from "@/types";
import { emptyCart } from "./CartContext";


export type ActionType = typeof CART_ACTIONS[keyof typeof CART_ACTIONS];

export const CART_ACTIONS = {
  UPDATE_CART: 'update_cart',
  UNLINK: 'unlink',
  ADD_ITEM: 'add_item',
  REMOVE_ITEM: 'remove_item',
  REMOVE_ALL_ITEMS: 'remove_all_items',
  RESET: 'reset',
} as const;

type CartAction = {
  type: ActionType,
  cart?: Cart,
  item?: Poke,
  itemId?: string
}

export function cartReducer(state: Cart, action: CartAction) {
  switch (action.type) {

    case CART_ACTIONS.UPDATE_CART: {
      const { cart } = action;
      if (!cart) {
        console.error(`One or more parameter is missing for action: ${CART_ACTIONS.UPDATE_CART} on CartReducer`);
        return state;
      }

      return cart;
    }


    case CART_ACTIONS.ADD_ITEM: {
      const { item } = action;
      if (!item) {
        console.error(`One or more parameter is missing for action: ${CART_ACTIONS.ADD_ITEM} on CartReducer`);
        return state;
      }

      return {
        ...state,
        items: {
          ...state.items,
          [item.id]: item
        }
      }
    }

    case CART_ACTIONS.REMOVE_ITEM: {
      const { itemId } = action;
      if (!itemId) {
        console.error(`One or more parameter is missing for action: ${CART_ACTIONS.REMOVE_ITEM} on CartReducer`);
        return state;
      }

      const newItems = { ...state.items };
      delete newItems[itemId];
      return {
        ...state,
        items: newItems
      };
    }

    case CART_ACTIONS.REMOVE_ALL_ITEMS: {
      return {
        ...state,
        items: {}
      }
    }

    case CART_ACTIONS.UNLINK:
    case CART_ACTIONS.RESET: {
      return emptyCart();
    }

    default:
      return state;
  }
}