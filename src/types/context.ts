import type { FirebaseError } from "firebase/app"
import type { User, UserCredential } from "firebase/auth"

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
  user: User | null;
  isOffline: boolean;
  login: (email: string, password: string) => Promise<UserCredential | FirebaseError | null>;
  signUp: (email: string, password: string) => Promise<UserCredential | FirebaseError | null>;
  logout: () => Promise<void>;
  setOffline: (value: boolean) => void;
}