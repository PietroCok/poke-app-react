import { PAYMENT_METHODS, type AppConfig, type ContextIngredient, type Dish, type DishSelection, type IngredientsState, type Poke, type PokeSize } from "@/types";

import appConfig from '../../config.json';
import { emptyIngredients } from "@/context/reducer/selectionReducer";

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

export function isPoke(item: Poke | DishSelection): item is Poke {
  return "size" in item;
}

export function isDishSelection(item: Poke | DishSelection): item is DishSelection {
  return "dishes" in item;
}

/**
* Converts an item to a string
* 
* @retruns a string representing the item
*/
export function itemToString(item: Poke | DishSelection) {
  if(isPoke(item)) {
    return itemPokeToString(item);
  } else if (isDishSelection(item)){
    return itemDishToString(item);
  } else {
    return 'Unknown item type...';
  }
}

function itemPokeToString(item: Poke) {
  let str = '';
  try {
    str = `${item.size.toUpperCase()}: `;
    const ingredients = item.ingredients;
    const groups = Object.keys(ingredients);
    groups.sort((groupA, groupB) => {
      const orderA = config.groups[groupA].order;
      const orderB = config.groups[groupB].order;

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


function itemDishToString(item: DishSelection) {
  let str = [];

  try {

    for (const dish of item.dishes) {
      str.push(`- ${ingredientIdToName(dish.id)}${dish.quantity > 1 ? (' x' + dish.quantity): ''}`);
    }

  } catch (error) {
    str.push('Error loading item description...');
  }

  return str.join('\n');
}

export const hasItem = (items: (Poke | DishSelection)[], itemId: string) => {
  return !!items.find(item => item.id === itemId);
}

// Cache dishes price on load
const dishes: { [key: string]: number } = {};
for (const _dishes of Object.values(appConfig.menu)) {
  for (const dish of _dishes) {
    dishes[ingredientNameToId(dish.name)] = dish.price;
  }
}

export const getDishPrice = (dishId: string): number => {
  return dishes[dishId] ?? 0;
}

export const totalMenuSelectionPrice = (_dishes: Dish[]) => {
  return _dishes.reduce((sum: number, dish: Dish) => sum + getDishPrice(dish.id) * dish.quantity, 0);
}

// Cache ingredients price on load
const items: { [key: string]: number } = {};
for (const group of Object.values(appConfig.groups)) {
  for (const ingredient of group.options) {
    items[ingredientNameToId(ingredient.name)] = ingredient.price;
  }
}

export const getIngredientPrice = (ingredientId: string): number => {
  return items[ingredientId] ?? 0;
}

export const getPokePrice = (size: PokeSize, ingredients: IngredientsState) => {
  const basePrice = config.sizes[size].price;
  let price = basePrice;

  for (const group of Object.keys(ingredients)) {
    price += groupExtraPrice(size, group, ingredients);
  }

  return price;
}

export const groupExtraPrice = (size: PokeSize, groupId: string, ingredients: IngredientsState) => {
  const groupLimit = config.sizes[size]?.limits[groupId];
  if (groupCount(groupId, ingredients) <= groupLimit) return 0;

  // order selected ingredient based on extra price
  // NB: shallow copy, do NOT edit ingredients props from this array, as they still reference the original state
  const sortedIngredients = ingredients[groupId].slice().sort((a: ContextIngredient, b: ContextIngredient) => getIngredientPrice(b.id) - getIngredientPrice(a.id));

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
  return config.sizes[size]?.limits[groupId] ?? 0;
}





export const convertPoke = (oldItem: any): Poke => {

  const ingredients = oldItem.ingredients ?? {};
  if (ingredients.proteina) {
    ingredients.proteine = structuredClone(ingredients.proteina)
    delete ingredients.proteina;
  }

  const baseItem: Poke = {
    id: crypto.randomUUID(),
    name: oldItem.name ?? 'poke',
    ingredients: {
      ...emptyIngredients,
      ...ingredients
    },
    createdBy: '',
    size: oldItem.dimension ?? 'regular',
    paymentMethod: oldItem.paymentMethod ?? PAYMENT_METHODS.CASH,
  }

  return baseItem;
}


export const importOldFavorites = () => {
  console.log(`Importing old poke from favorites...`);

  try {
    const oldItems = localStorage.getItem('starred');
    if (!oldItems) {
      console.log(`No item to import`);
      localStorage.removeItem('starred');
      return;
    }
    const oldItemsParsed = JSON.parse(oldItems);

    const convertedItems = [];

    // Convert items
    for (const oldItem of oldItemsParsed) {
      const convertedItem = convertPoke(oldItem);
      if (convertedItem) {
        convertedItems.push(convertedItem);
      }
    }

    // Merge with current favorites
    if (convertedItems.length > 0) {
      const currentFavorites = localStorage.getItem('poke-favorites') ?? '[]';
      const mergedFavorites = [...JSON.parse(currentFavorites), ...convertedItems];
      localStorage.setItem('poke-favorites', JSON.stringify(mergedFavorites));
    }
  } catch (error) {
    console.warn(error);
  }

  // Remove localstorage data to avoid import next time
  localStorage.removeItem('starred');

  console.log(`Import of old poke from favorites completed`);
}

importOldFavorites();