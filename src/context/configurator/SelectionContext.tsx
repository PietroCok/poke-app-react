import { createContext, useContext, useState } from "react";
import { Outlet } from "react-router-dom";

import { PAYMENT_METHODS, type AppConfig, type ContextIngredient, type PaymentMethod, type Poke, type SelectionContext } from "@/types";

import appConfig from '../../../config.json';
import { ingredientIdToName } from "../../scripts/utils";
import { SELECTION_ACTIONS, emptyIngredients, selectionReducer } from "./selectionReducer";
import { useLocalStorage, useLocalStorageReducer } from "../../hooks/useLocalStorage";

export interface SelectionProviderProps {

}

export const ingredientsStorageKey = 'poke-ingredients';
export const sizeStorageKey = 'poke-size';

const config: AppConfig = appConfig;

const defaultSize = Object.keys(config.dimensioni)[0] ?? '';

const SelectionContext = createContext<SelectionContext | null>(null);

export const useSelection = () => {
  const ctx = useContext(SelectionContext);
  if (!ctx) throw new Error('useSelection must be used within a SelectionProvider');
  return ctx;
};

export function SelectionProvider({ }: SelectionProviderProps) {
  const [size, setSize] = useLocalStorage(sizeStorageKey, defaultSize);
  const [ingredients, dispatch] = useLocalStorageReducer(
    ingredientsStorageKey,
    selectionReducer,
    emptyIngredients
  );
  const [paymentMethod, setPaymentMethod] = useLocalStorage<PaymentMethod>('poke-payment-method', PAYMENT_METHODS.CASH);
  const [name, setName] = useLocalStorage('poke-save-name', '');
  const [editingId, setEditingId] = useState('');

  // Add or increase quantity of ingredient to selection
  const addIngredient = (group: string, ingredientId: string) => {
    const ingredientName = ingredientIdToName(ingredientId);
    const price = config.gruppi[group]?.opzioni.find(i => i.name == ingredientName)?.prezzo ?? 0;

    dispatch({
      type: SELECTION_ACTIONS.ADD_INGREDIENT,
      groupId: group,
      ingredient: { id: ingredientId, quantity: 1, price }
    });
  }

  // Completetly an ingredient from selection
  const removeIngredient = (group: string, ingredientId: string) => {
    dispatch({
      type: SELECTION_ACTIONS.REMOVE_INGREDIENT,
      groupId: group,
      ingredientId: ingredientId
    })
  }

  const increaseQuantity = (group: string, ingredientId: string) => {
    dispatch({
      type: SELECTION_ACTIONS.INCREMENT_QUANTITY,
      groupId: group,
      ingredientId: ingredientId
    })
  }

  const hasIngredients = () => {
    for (const [_, _ingredients] of Object.entries(ingredients)) {
      if (_ingredients.length > 0) {
        return true;
      }
    }

    return false;
  }

  const groupCount = (groupId: string) => {
    const groupIngredients = ingredients[groupId];
    let total = 0;
    for (const ingredient of groupIngredients) {
      total += ingredient.quantity;
    }
    return total;
  }

  const groupExtraPrice = (groupId: string) => {
    const groupLimit = config.dimensioni[size]?.limiti[groupId];
    if (groupCount(groupId) <= groupLimit) return 0;

    // order selected ingredient based on extra price
    // NB: shallow copy, do NOT edit ingredients props from this array, as they still reference the original state
    const sortedIngredients = ingredients[groupId].slice().sort((a: ContextIngredient, b: ContextIngredient) => b.price - a.price);

    // Find te most expensive items price
    let deductedCounter = 0;
    let deductedPrice = 0;
    let total = 0;
    for (let i = 0; i < sortedIngredients.length; i++) {
      const ingredient = sortedIngredients[i];
      let j = 0;
      while (deductedCounter < groupLimit && ingredient.quantity > j) {
        deductedPrice += ingredient.price;
        deductedCounter++;
        j++;
      }

      total += ingredient.price * ingredient.quantity;
    }

    total -= deductedPrice;

    return total;
  }

  const getTotalPrice = () => {
    const basePrice = config.dimensioni[size].prezzo;
    let price = basePrice;

    for (const group of Object.keys(ingredients)) {
      price += groupExtraPrice(group);
    }

    return price;
  }

  const selectSize = (newSelectedSize: string) => {
    if (size != newSelectedSize) {
      setSize(newSelectedSize);
    }
  }

  // Return limit for current size and groupId
  const getLimit = (groupId: string) => {
    return config.dimensioni[size]?.limiti[groupId] ?? 0;
  }

  // Reset ingredients selected
  const resetContext = () => {
    dispatch({
      type: SELECTION_ACTIONS.RESET,
    })
  }

  const loadItemIntoConfigurator = (item: Poke) => {
    const newIngredients = structuredClone(item.ingredients) || {};

    dispatch({
      type: SELECTION_ACTIONS.SET_INGREDIENTS,
      ingredients: newIngredients
    });

    setSize(item.size);

    setName(item.name);

    setPaymentMethod(item.paymentMethod || PAYMENT_METHODS.CASH);

    setEditingId(item.id);
  }

  return (
    <SelectionContext.Provider value={{
      size,
      selectSize,
      getLimit,

      ingredients,
      addIngredient,
      removeIngredient,
      increaseQuantity,
      hasIngredients,
      groupCount,
      groupExtraPrice,
      getTotalPrice,
      resetContext,

      loadItemIntoConfigurator,

      name,
      setName,

      paymentMethod,
      setPaymentMethod,

      editingId,
      setEditingId
    } as SelectionContext}>
      <Outlet />
    </SelectionContext.Provider>
  );
}