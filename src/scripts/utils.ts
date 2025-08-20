import type { AppConfig, Poke } from "@/types";

import appConfig from '../../config.json';

const config: AppConfig = appConfig;

export function ingredientNameToId(name: string){
  if(!name) return '';

  return name.replaceAll(" ", "-").replaceAll("'", "--");
}

export function ingredientIdToName(id: string){
  if(!id) return '';

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