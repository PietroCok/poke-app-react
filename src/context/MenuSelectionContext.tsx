import { createContext, useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import type { MenuSelectionContextType, StaticMenuSelectionContextType, DishSelection, Dish } from "@/types";
import { PAYMENT_METHODS } from "@/types";

import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useToast } from "./ToastContext";
import { useSelection } from "./SelectionContext";
import { totalMenuSelectionPrice } from "@/scripts/utils";

export const ingredientsStorageKey = 'poke-ingredients';
export const sizeStorageKey = 'poke-size';

const MenuSelectionContext = createContext<MenuSelectionContextType | null>(null);
const StaticMenuSelectionContext = createContext<StaticMenuSelectionContextType | null>(null);

export const useMenuSelection = () => {
  const ctx = useContext(MenuSelectionContext);
  if (!ctx) throw new Error('useMenuSelection must be used within a MenuSelectionProvider');

  const staticCtx = useContext(StaticMenuSelectionContext);
  if (!staticCtx) throw new Error('useMenuSelection must be used within a MenuSelectionProvider');

  return { ...ctx, ...staticCtx };
};

export function MenuSelectionProvider({ children }: { children: React.ReactNode }) {
  const [dishes, setDishes] = useLocalStorage<Dish[]>('menu-selection', []);
  const { setName, setPaymentMethod } = useSelection();
  const [editingId, setEditingId] = useState('');
  const { showInfo } = useToast();
  const navigate = useNavigate();

  // Add or increase quantity of ingredient to selection
  const addDish = (dishId: string) => {
    setDishes(prevState => {
      return [
        ...prevState,
        {
          id: dishId,
          quantity: 1
        }
      ]
    })
  }

  // Completetly an ingredient from selection
  const removeDish = (dishId: string) => {
    setDishes(prevState => prevState.filter(dish => dish.id != dishId))
  }

  const increaseQuantity = (dishId: string) => {
    setDishes(prevState => {
      return prevState.map(dish => {
        return {
          id: dish.id,
          quantity: dish.id === dishId ? (dish.quantity + 1) : dish.quantity
        }
      })
    })
  }

  // Reset ingredients selected
  const resetContext = () => {
    setEditingId('');

    setDishes([]);
  }

  const loadDishesIntoMenu = (item: DishSelection, navigateHome = false) => {

    setDishes(item.dishes);

    setName(item.name);

    setPaymentMethod(item.paymentMethod || PAYMENT_METHODS.CASH);

    setEditingId(item.id);

    showInfo(`${item.name} caricato`, { duration: 2 });

    if (navigateHome) {
      navigate('/');
    }
  }

  const staticContextValue = useMemo(() => ({
    getTotalPrice: () => totalMenuSelectionPrice(dishes),
    hasDishes: () => dishes.length,
  }), [dishes]);

  return (
    <StaticMenuSelectionContext.Provider
      value={staticContextValue}
    >
      <MenuSelectionContext.Provider value={{
        dishes,
        editingId,
        addDish,
        removeDish,
        increaseQuantity,
        resetContext,
        loadDishesIntoMenu,
        setEditingId
      }}>
        {children}
      </MenuSelectionContext.Provider>
    </StaticMenuSelectionContext.Provider>
  );
}

