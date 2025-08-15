import { createContext, useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";

import type { Cart, CartContextType, Poke } from "@/types";
import { addCartItem, createCart, deleteCart, getCart, observeCart, removeAllCartItems, removeCartItem } from "../firebase/db";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useAuth } from "./AuthContext";

export interface CartProviderProps {

}

const CartContext = createContext<CartContextType | null>(null);
export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within an CartProvider');
  return ctx;
};

const emptyCart = (userUid?: string, name?: string, isShared?: boolean) => {
  return {
    id: crypto.randomUUID(),
    name: name ?? 'Carrello',
    createdBy: userUid ?? '',
    items: {},
    isShared: isShared || false
  }
}

export function CartProvider({ }: CartProviderProps) {
  const { user } = useAuth();

  const userUid = user?.uid || '';
  const localStorageKey = userUid ? `poke-cart-${userUid}` : `poke-cart`;

  const [cart, setCart] = useLocalStorage<Cart>(localStorageKey, emptyCart(userUid));

  useEffect(() => {
    const setup = async () => {
      if (!user || !cart.isShared) return;

      const remoteCart = await getCart(cart.id);
      if (remoteCart) {
        handleFirebaseUpdate(remoteCart);
      }

      const unsubscribe = observeCart(cart.id, handleFirebaseUpdate);
      return unsubscribe;
    }

    const unsubscribePromise = setup();

    return () => { unsubscribePromise.then(unsubscribe => unsubscribe && unsubscribe()) };
  }, [user, cart.id]);

  const handleFirebaseUpdate = (remoteCart: Cart | null) => {
    console.log('Cart update', remoteCart);

    if (remoteCart) {
      if (!remoteCart.items) {
        remoteCart.items = {};
      }

      setCart(remoteCart);
    } else {
      // Remote cart has been deleted => reset local cart
      const newCart = emptyCart();
      setCart(newCart);
    }
  }

  const updateCartName = (newName: string) => {
    if (!newName) return;
    alert('coming soon!');
  }

  const _createSharedCart = async (name: string, copyActiveCart: boolean) => {
    if (!user) return false;

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
      setCart(newCart);
    }
    return creationReusult;
  }

  const _deleteSharedCart = async (cartId: string) => {
    return await deleteCart(cartId);
  }

  const addItem = (item: Poke) => {
    if (user && cart.isShared) {
      addCartItem(cart.id, item);
    } else {
      const newItems = cart.items || {};
      newItems[item.id] = item;
      setCart({
        ...cart,
        items: newItems
      })
    }
  }

  const duplicateItem = (itemId: string) => {
    const oldItem = cart.items[itemId];
    if (!oldItem) {
      alert('Elemento non trovato');
      return;
    }

    const newItem = structuredClone(oldItem);
    newItem.createdBy = userUid;
    newItem.id = crypto.randomUUID();
    addItem(newItem);
  }

  const deleteItem = (itemId: string, itemName: string) => {
    if (!confirm(`Confermare la cancellazione dell'elemento: ${itemName}?`)) {
      return;
    }

    if (user && cart.isShared) {
      removeCartItem(cart.id, itemId);
    } else {
      const newItems = cart.items || {};
      delete newItems[itemId];
      setCart({
        ...cart,
        items: newItems
      })
    }
  }

  const deleteAllItems = () => {
    if (Object.values(cart.items || {}).length == 0) {
      return;
    }

    if (!confirm(`Confermare la cancellazione di tutti gli elementi del carrello?`)) {
      return;
    }

    if (user && cart.isShared) {
      if (!cart?.id) {
        return;
      }
      removeAllCartItems(cart.id);
    } else {
      setCart({
        ...cart,
        items: {}
      })
    }
  }

  return (
    <CartContext.Provider
      value={
        {
          cart,
          setCart,
          updateCartName,
          addItem,
          duplicateItem,
          deleteItem,
          createCart: _createSharedCart,
          deleteCart: _deleteSharedCart,
          deleteAllItems
        }
      }
    >
      <Outlet />
    </CartContext.Provider>
  );
}