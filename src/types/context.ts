export type ContextIngredient = {
  id: string,
  quantity: number
  price: number
}

export type IngredientsState = {
  [key: string]: ContextIngredient[]
}

export type SelectionContext = {
  ingredients: IngredientsState,
  size: string,

  getLimit: (groupId: string) => number,
  selectSize: (newSelectedSize: string) => void,

  addIngredient: (groupId: string, ingredientId: string) => void,
  removeIngredient: (groupId: string, ingredientId: string) => void,
  increaseQuantity: (groupId: string, ingredientId: string) => void,
  hasIngredients: () => boolean,
  groupCount: (groupId: string) => number,
  groupExtraPrice: (groupId: string) => number,

  resetContext: () => void
}

export type AuthContextType = {
  isAuthenticated: boolean;
  isOffline: boolean;
  loading: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  setOffline: (value: boolean) => void;
}