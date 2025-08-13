import { createContext, useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";

import type { Cart, CartContextType, Poke } from "@/types";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useAuth } from "./AuthContext";
import { addCartItem, createCart, observeCart } from "../firebase/db";

export interface CartProviderProps {

}

const CartContext = createContext<CartContextType | null>(null);
export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within an CartProvider');
  return ctx;
};

export function CartProvider({ }: CartProviderProps) {
  const { user } = useAuth();
  const emptyCart = {
    id: crypto.randomUUID(),
    name: 'Carrello',
    createdBy: user?.uid ?? '',
    items: {}
  }

  const [cart, setCart] = useLocalStorage<Cart>('poke-cart', emptyCart);
  const { id, name, items, createdBy } = cart;

  useEffect(() => {
    if (!user) return;

    const setup = async () => {
      if (!cart.createdBy) {
        const updatedCart = structuredClone(cart);
        updatedCart.createdBy = user.uid;
        await createCart(updatedCart);
      }

      const unsubscribe = observeCart(id, handleFirebaseUpdate);
      return unsubscribe;
    }

    const unsubscribePromise = setup();

    return () => {unsubscribePromise.then(unsubscribe => unsubscribe && unsubscribe())};
  }, [user, id]);

  const handleFirebaseUpdate = (cart: Cart | null) => {
    console.log(cart);
    
    if (cart) {
      if(!cart.items) {
        cart.items = {};
      }
      setCart(cart)
    }
  }

  const updateCartName = (newName: string) => {
    if (!newName) return;

    const updatedCart = structuredClone(cart);
    updatedCart.name = newName;
    setCart(updatedCart);
  }

  const addItem = (item: Poke) => {
    if (user) {
      addCartItem(cart.id, item);
    } else {
      const updatedCart = structuredClone(cart);
      updatedCart.items[item.id] = item;
      setCart(updatedCart);
    }
  }

  const duplicateItem = (itemId: string) => {
    alert('coming soon!');
  }

  const deleteItem = (itemId: string) => {
    alert('coming soon!');
  }

  return (
    <CartContext.Provider
      value={{ cart, updateCartName, addItem, duplicateItem, deleteItem }}
    >
      <Outlet />
    </CartContext.Provider>
  );
}