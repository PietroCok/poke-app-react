import { createContext, useContext, useReducer, useState } from "react";

import appConfig from '../../../config.json';
import { ingredientIdToName } from "../../scripts/utils";
import { ACTIONS, emptyIngredients, selectionReducer } from "./selectionReducer";
import type { AppConfig, ContextIngredient, SelectionContext } from "@/types";


export interface SelectionProviderProps {
  children: React.ReactNode
}

const config: AppConfig = appConfig;

const defaultSize = Object.keys(config.dimensioni)[0] ?? '';

const SelectionContext = createContext<SelectionContext | null>(null);

export const useSelection = () => {
  const ctx = useContext(SelectionContext);
  if (!ctx) throw new Error('useSelection must be used within a SelectionProvider');
  return ctx;
};

export function SelectionProvider({ children }: SelectionProviderProps) {
  const [size, setSize] = useState(defaultSize);
  const [ingredients, dispatch] = useReducer(selectionReducer, emptyIngredients);

  // Add or increase quantity of ingredient to selection
  const addIngredient = (group: string, ingredientId: string) => {
    const ingredientName = ingredientIdToName(ingredientId);
    const price = config.gruppi[group]?.opzioni.find(i => i.name == ingredientName)?.prezzo || 0;

    dispatch({
      type: ACTIONS.ADD_INGREDIENT,
      payload: { group, ingredient: { id: ingredientId, quantity: 1, price } }
    });
  }

  // Completetly an ingredient from selection
  const removeIngredient = (group: string, ingredientId: string) => {
    dispatch({
      type: ACTIONS.REMOVE_INGREDIENT,
      payload: { group, ingredientId }
    })
  }

  const increaseQuantity = (group: string, ingredientId: string) => {
    dispatch({
      type: ACTIONS.INCREMENT_QUANTITY,
      payload: { group, ingredientId }
    })
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
    if (groupCount(groupId) < groupLimit) return 0;

    // order selected ingredient based on extra price
    const sortedIngredients = ingredients[groupId].sort((a: ContextIngredient, b: ContextIngredient) => b.price - a.price).slice();
    console.log(sortedIngredients);

    // Find te most expensive items price
    let deductedCounter = 0;
    let deductedPrice = 0;
    let total = 0;
    for (let i = 0; i < sortedIngredients.length; i++) {
      const ingredient = sortedIngredients[i];
      let j = 0;
      while(deductedCounter < groupLimit && ingredient.quantity > j){
        deductedPrice += ingredient.price;
        deductedCounter++;
        j++;
      }

      total += ingredient.price * ingredient.quantity;
    }

    total -= deductedPrice;

    return total;
  }

  const selectSize = (newSelectedSize: string) => {
    if (size != newSelectedSize) {
      setSize(newSelectedSize);
    }
  }

  // Return limit for current size and groupId
  const getLimit = (groupId: string) => {
    return config.dimensioni[size]?.limiti[groupId] || 0;
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
      groupCount,
      groupExtraPrice
    } as SelectionContext}>
      {children}
    </SelectionContext.Provider>
  );
}