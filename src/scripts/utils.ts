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
