import { createContext, useContext, useEffect, useMemo } from "react";
import { Outlet } from "react-router-dom";

import type { Cart, CartContextType, PaymentMethod, Poke, StaticCartContextType } from "@/types";
import { addCartItem, createCart, deleteCart, observeCart, removeAllCartItems, removeCartItem, removeCartUser, replaceCartItem } from "../firebase/db";
import { useLocalStorageReducer } from "../hooks/useLocalStorage";
import { useAuth } from "./AuthContext";
import { CART_ACTIONS, cartReducer } from "./reducer/CartReducer";
import { useModal } from "./ModalContext";
import { useToast } from "./ToastContext";
import { getPokePrice, hasItem } from "@/scripts/utils";

export interface CartProviderProps {

}

const CartContext = createContext<CartContextType | null>(null);
const StaticCartContext = createContext<StaticCartContextType | null>(null);

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within an CartProvider');

  const staticCtx = useContext(StaticCartContext);
  if (!staticCtx) throw new Error('useCart must be used within an CartProvider');

  return { ...ctx, ...staticCtx };
};

export const emptyCart = (userUid?: string, name?: string, isShared?: boolean) => {
  return {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    name: name ?? 'Carrello',
    createdBy: userUid ?? '',
    items: {},
    isShared: isShared || false
  }
}

export function CartProvider({ }: CartProviderProps) {
  const { user, isUserActive } = useAuth();

  const userUid = user?.uid || '';
  const localStorageKey = userUid ? `poke-cart-${userUid}` : `poke-cart`;

  const [cart, dispatch] = useLocalStorageReducer(localStorageKey, cartReducer, emptyCart(userUid));
  const { showConfirm } = useModal();
  const { showError, showInfo } = useToast();

  useEffect(() => {
    if (!user || !cart.isShared) return;
    const unsubscribe = observeCart(cart.id, handleFirebaseUpdate);
    return () => unsubscribe();
  }, [user, cart.id]);

  const handleFirebaseUpdate = (remoteCart: Cart | null) => {
    console.log('Cart update', remoteCart);

    if (remoteCart) {
      if (!remoteCart.items) {
        remoteCart.items = {};
      }

      updateCart(remoteCart)
    } else {
      // Remote cart has been deleted => reset local cart
      dispatch({
        type: CART_ACTIONS.RESET,
      });
    }
  }

  const updateCart = (cart: Cart) => {
    dispatch({
      type: CART_ACTIONS.UPDATE_CART,
      cart: cart
    });
  }

  const updateCartName = (newName: string) => {
    if (!newName) return;
    showError('coming soon!');
  }

  const _createSharedCart = async (name: string, copyActiveCart: boolean) => {
    if (!isUserActive()) return false;

    let newCart: Cart;
    if (copyActiveCart) {
      newCart = structuredClone(cart);
      newCart.id = crypto.randomUUID();
      newCart.createdBy = userUid;
      newCart.name = name;
      newCart.isShared = true;
    } else {
      newCart = emptyCart(userUid, name, true);
    }

    const creationReusult = await createCart(newCart);
    if (creationReusult) {
      updateCart(newCart);
    }
    return creationReusult;
  }

  const _deleteSharedCart = async (cart: Cart) => {
    if (!isUserActive()) return false;

    unlinkCart();

    if (cart.createdBy != userUid) {
      return await removeCartUser(cart.id, userUid);
    }

    return await deleteCart(cart.id);
  }

  const _deleteSharedCarts = async (carts: Cart[]) => {
    if (!userUid) return true;

    unlinkCart();

    let result = false;
    for (const cart of carts) {
      result = (await _deleteSharedCart(cart)) || result;
    }

    return result;
  }

  const unlinkCart = async () => {
    if (!cart.isShared) return;

    dispatch({
      type: CART_ACTIONS.UNLINK,
    });
  }

  const addItem = async (item: Poke, fromEdit = false) => {
    const newItem = structuredClone(item);

    // If the items is saved after edit, update its id and remove old item
    // this prevents having an item with the same id (but different content) in the cart
    if (fromEdit) {
      newItem.id = crypto.randomUUID();
    }

    if (user && cart.isShared) {
      if (fromEdit) {
        if (await replaceCartItem(cart.id, newItem, item.id)) {
          showInfo(`Elemento aggiornato nel carrello`);
        }
      } else {
        if (await addCartItem(cart.id, newItem)) {
          showInfo(`Elemento salvato nel carrello`);
        }
      }
    } else {
      dispatch({
        type: CART_ACTIONS.ADD_ITEM,
        item: newItem
      })
      if (fromEdit) {
        dispatch({
          type: CART_ACTIONS.REMOVE_ITEM,
          itemId: item.id
        })
        showInfo(`Elemento aggiornato nel carrello`);
      } else {
        showInfo(`Elemento salvato nel carrello`);
      }
    }
  }

  const duplicateItem = (itemId: string) => {
    const oldItem = cart.items[itemId];
    if (!oldItem) {
      return;
    }

    const newItem = structuredClone(oldItem);
    newItem.createdBy = userUid;
    newItem.id = crypto.randomUUID();
    addItem(newItem);
  }

  const deleteItem = async (itemId: string, itemName: string) => {
    if (!await showConfirm(`Confermare la cancellazione dell'elemento: ${itemName}?`)) {
      return;
    }

    if (user && cart.isShared) {
      removeCartItem(cart.id, itemId);
    } else {
      dispatch({
        type: CART_ACTIONS.REMOVE_ITEM,
        itemId: itemId
      });
    }
  }

  const deleteAllItems = async () => {
    if (Object.values(cart.items || {}).length == 0) {
      return;
    }

    if (!await showConfirm(`Confermare la cancellazione di tutti gli elementi del carrello?`)) {
      return;
    }

    if (user && cart.isShared) {
      if (!cart?.id) {
        return;
      }
      removeAllCartItems(cart.id);
    } else {
      dispatch({
        type: CART_ACTIONS.REMOVE_ALL_ITEMS
      })
    }
  }

  const staticContextValue = useMemo(() => ({
    getItemsCount: () => getItemsCount(cart),
    getTotalPrice: (method?: PaymentMethod) => getTotalPrice(cart, method),
    hasItem: (itemId: string) => hasItem(Object.values(cart.items || []), itemId)
  }), [cart.items])

  return (
    <StaticCartContext.Provider
      value={staticContextValue}
    >
      <CartContext.Provider
        value={
          {
            cart,
            updateCart,
            createCart: _createSharedCart,
            deleteCart: _deleteSharedCart,
            deleteCarts: _deleteSharedCarts,
            unlinkCart,
            updateCartName,
            addItem,
            duplicateItem,
            deleteItem,
            deleteAllItems,
          }
        }
      >
        <Outlet />
      </CartContext.Provider>
    </StaticCartContext.Provider>
  );
}

const getItemsCount = (cart: Cart) => {
  return Object.keys(cart.items || {}).length;
}

const getTotalPrice = (cart: Cart, method?: PaymentMethod) => {
  if (getItemsCount(cart) <= 0) return 0;

  let totalPrice = 0;
  for (const item of Object.values(cart.items)) {
    if (!method || item.paymentMethod == method) {
      totalPrice += getPokePrice(item.size, item.ingredients);
    }
  }

  return totalPrice;
}