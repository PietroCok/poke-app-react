import type { AppConfig, ContextIngredient, IngredientsState, Poke, PokeSize } from "@/types";

import appConfig from '../../config.json';

const config: AppConfig = appConfig;

export function ingredientNameToId(name: string) {
  if (!name) return '';

  return name.replaceAll(" ", "-").replaceAll("'", "--");
}

export function ingredientIdToName(id: string) {
  if (!id) return '';

  return id.replaceAll("--", "'").replaceAll("-", " ");
}

// First level compare of objects
export function shallowEqual(obj1: Record<string, any>, obj2: Record<string, any>) {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) return false;

  for (const key of keys1) {
    if (obj1[key] !== obj2[key]) return false;
  }
  return true;
}

/**
* Converts an item to a string
* 
* @retruns a string representing the item
*/
export function itemToString(item: Poke) {
  let str = '';
  try {
    str = `${item.size.toUpperCase()}: `;
    const ingredients = item.ingredients;
    const groups = Object.keys(ingredients);
    groups.sort((groupA, groupB) => {
      const orderA = config.gruppi[groupA].order;
      const orderB = config.gruppi[groupB].order;

      return orderA - orderB;
    })

    for (const group of groups) {
      for (const ingredient of ingredients[group]) {
        str += ingredient.id.replaceAll("-", " ").replaceAll("--", "'") + (ingredient.quantity > 1 ? " x" + ingredient.quantity : "") + ", ";
      }
    }

    // rimozione ultima virgola
    str = str.slice(0, str.length - 2);
  } catch (error) {
    str = 'Error loading item description...'
  }

  return str;
}


export const hasItem = (items: Poke[], itemId: string) => {
  return !!items.find(item => item.id === itemId);
}


// Cache ingredients price on load
const items: { [key: string]: number } = {};
for (const group of Object.values(appConfig.gruppi)) {
  for (const ingredient of group.opzioni) {
    items[ingredientNameToId(ingredient.name)] = ingredient.prezzo;
  }
}

export const getIngredientPrice = (ingredientId: string): number => {
  return items[ingredientId] ?? 0;
}

export const getPokePrice = (size: PokeSize, ingredients: IngredientsState) => {
  const basePrice = config.dimensioni[size].prezzo;
  let price = basePrice;

  for (const group of Object.keys(ingredients)) {
    price += groupExtraPrice(size, group, ingredients);
  }

  return price;
}

export const groupExtraPrice = (size: PokeSize, groupId: string, ingredients: IngredientsState) => {
  const groupLimit = config.dimensioni[size]?.limiti[groupId];
  if (groupCount(groupId, ingredients) <= groupLimit) return 0;

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
      deductedPrice += getIngredientPrice(ingredient.id);
      deductedCounter++;
      j++;
    }

    total += getIngredientPrice(ingredient.id) * ingredient.quantity;
  }

  total -= deductedPrice;

  return total;
}

export const groupCount = (groupId: string, ingredients: IngredientsState) => {
  const groupIngredients = ingredients[groupId];
  let total = 0;
  for (const ingredient of groupIngredients) {
    total += ingredient.quantity;
  }
  return total;
}

// Return limit for current size and groupId
export const getLimit = (size: PokeSize, groupId: string) => {
  return config.dimensioni[size]?.limiti[groupId] ?? 0;
}