import { createContext, useContext, useState } from "react";

import appConfig from '../../../config.json';
import { ingredientIdToName } from "../../scripts/utils";

const defaultSize = Object.keys(appConfig?.dimensioni)[0] ?? '';
const defaultIngredients = Object.fromEntries(Object.entries(appConfig.gruppi).map(group => [group[0], []]));

console.log(defaultIngredients);


const SelectionContext = createContext(null);

export const useSelection = () => {
  const ctx = useContext(SelectionContext);
  if (!ctx) throw new Error('useSelection must be used within a SelectionProvider');
  return ctx;
};

export default function SelectionProvider({ children }) {
  const [size, setSize] = useState(defaultSize);
  const [ingredients, setIngredient] = useState(defaultIngredients);

  // Add or increase quantity of ingredient to selection
  const addIngredient = (group, ingredientId) => {
    const ingredientName = ingredientIdToName(ingredientId);
    const groupIngredients = ingredients[group];
    const ingredient = {
      id: ingredientId,
      quantity: 1,
      price: appConfig?.gruppi[group]?.opzioni.find(i => i.name == ingredientName)?.prezzo || 0
    }
    const updateGroupIngredients = [...groupIngredients, ingredient];

    setIngredient({
      ...ingredients,
      [group]: updateGroupIngredients
    });
  }

  // Completetly an ingredient from selection
  const removeIngredient = (group, ingredientId) => {
    const groupIngredients = ingredients[group];

    const updateGroupIngredients = groupIngredients.filter(ingredient => ingredient.id != ingredientId);

    setIngredient({
      ...ingredients,
      [group]: updateGroupIngredients
    });
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
      groupCount,
      groupExtraPrice
    }}>
      {children}
    </SelectionContext.Provider>
  );
}