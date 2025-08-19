import { createContext, useContext, useEffect, useMemo } from "react";
import { Outlet } from "react-router-dom";

import type { Cart, CartContextType, PaymentMethod, Poke, StaticCartContextType } from "@/types";
import { addCartItem, createCart, deleteCart, observeCart, removeAllCartItems, removeCartItem } from "../firebase/db";
import { useLocalStorageReducer } from "../hooks/useLocalStorage";
import { useAuth } from "./AuthContext";
import { CART_ACTIONS, cartReducer } from "./CartReducer";
import { useModal } from "./ModalContext";

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
  const { user, isUserActive } = useAuth();

  const userUid = user?.uid || '';
  const localStorageKey = userUid ? `poke-cart-${userUid}` : `poke-cart`;

  const [cart, dispatch] = useLocalStorageReducer(localStorageKey, cartReducer, emptyCart(userUid));
  const { showAlert, showConfirm } = useModal();

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
    showAlert('coming soon!');
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

  const _deleteSharedCart = async (cartId: string) => {
    if (!isUserActive()) return false;
    return await deleteCart(cartId);
  }

  const unlinkCart = async () => {
    dispatch({
      type: CART_ACTIONS.UNLINK,
    });
  }

  const addItem = (item: Poke) => {
    if (user && cart.isShared) {
      addCartItem(cart.id, item);
    } else {
      dispatch({
        type: CART_ACTIONS.ADD_ITEM,
        item: item
      })
    }
  }

  const duplicateItem = (itemId: string) => {
    const oldItem = cart.items[itemId];
    if (!oldItem) {
      showAlert('Elemento non trovato');
      return;
    }

    const newItem = structuredClone(oldItem);
    newItem.createdBy = userUid;
    newItem.id = crypto.randomUUID();
    addItem(newItem);
  }

  const updateItemFromEditing = (item: Poke) => {
    // If old item does not exists create a new cart item
    const oldItem = cart.items[item.id];
    if (!oldItem) addItem(item);

    addItem(structuredClone(item));
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
    getTotalPrice: (method?: PaymentMethod) => getTotalPrice(cart, method)
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
            unlinkCart,
            updateCartName,
            addItem,
            duplicateItem,
            updateItemFromEditing,
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
  if(getItemsCount(cart) <= 0) return 0;

  let totalPrice = 0;
  for(const item of Object.values(cart.items)){
    if(!method || item.paymentMethod == method){
      totalPrice += item.price;
    }
  }  

  return totalPrice;
}