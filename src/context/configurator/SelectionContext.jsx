import { createContext, useContext, useReducer, useState } from "react";

import appConfig from '../../../config.json';
import { ingredientIdToName } from "../../scripts/utils";
import { ACTIONS, emptyIngredients, selectionReducer } from "./selectionReducer";

const defaultSize = Object.keys(appConfig?.dimensioni)[0] ?? '';

const SelectionContext = createContext(null);

export const useSelection = () => {
  const ctx = useContext(SelectionContext);
  if (!ctx) throw new Error('useSelection must be used within a SelectionProvider');
  return ctx;
};

export default function SelectionProvider({ children }) {
  const [size, setSize] = useState(defaultSize);
  const [ingredients, dispatch] = useReducer(selectionReducer, emptyIngredients);

  // Add or increase quantity of ingredient to selection
  const addIngredient = (group, ingredientId) => {
    const ingredientName = ingredientIdToName(ingredientId);
    const price = appConfig?.gruppi[group]?.opzioni.find(i => i.name == ingredientName)?.prezzo || 0;

    dispatch({
      type: ACTIONS.ADD_INGREDIENT,
      payload: { group, ingredient: { id: ingredientId, quantity: 1, price } }
    });
  }

  // Completetly an ingredient from selection
  const removeIngredient = (group, ingredientId) => {
    dispatch({
      type: ACTIONS.REMOVE_INGREDIENT,
      payload: { group, ingredientId }
    })
  }

  const increaseQuantity = (group, ingredientId) => {
    dispatch({
      type: ACTIONS.INCREMENT_QUANTITY,
      payload: { group, ingredientId }
    })
  }

  const groupCount = (groupId) => {
    const groupIngredients = ingredients[groupId];
    let total = 0;
    for (const ingredient of groupIngredients) {
      total += ingredient.quantity;
    }
    return total;
  }

  const groupExtraPrice = (groupId) => {
    const groupLimit = appConfig?.dimensioni[size]?.limiti[groupId];
    if (groupCount(groupId) < groupLimit) return 0;

    // order selected ingredient based on extra price
    const extraIngredients = ingredients[groupId].sort((a, b) => b.price - a.price).slice(groupLimit);

    console.log(extraIngredients);

    let total = 0;
    for (const ingredient of extraIngredients) {
      total += ingredient.price * ingredient.quantity;
    }

    return total;
  }

  const selectSize = (newSelectedSize) => {
    if (size != newSelectedSize) {
      setSize(newSelectedSize);
    }
  }

  // Return limit for current size and groupId
  const getLimit = (groupId) => {
    return appConfig?.dimensioni[size]?.limiti[groupId] || 0;
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
    }}>
      {children}
    </SelectionContext.Provider>
  );
}