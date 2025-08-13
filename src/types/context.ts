import type { FirebaseError } from "firebase/app"
import type { User, UserCredential } from "firebase/auth"
import type { Cart, Poke } from "./common"

export type ContextIngredient = {
  id: string,
  quantity: number,
  price: number,
}

export type IngredientsState = {
  [key: string]: ContextIngredient[],
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
  getTotalPrice: () => number,

  resetContext: () => void,
}


export type UserProfile = {
  createdAt: string
  email: string,
  status: UserStatus,
  role: string,
  uid: string
}

export type UserStatus = 'active' | 'pending' | 'disabled';
export const UserStatusLevel: { [key in UserStatus]: number } = {
  'disabled': 0,
  'pending': 1,
  'active': 3
} as const;

export type AuthContextType = {
  user: User | null,
  profile: UserProfile | null,
  isOffline: boolean,
  login: (email: string, password: string) => Promise<UserCredential | FirebaseError | null>,
  signUp: (email: string, password: string) => Promise<UserCredential | FirebaseError | null>,
  logout: () => Promise<void>,
  setOffline: (value: boolean) => void,
  deleteAccount: () => void
}



export type CartContextType = {
  cart: Cart,
  updateCartName: (newName: string) => void,
  addItem: (item: Poke) => void,
  duplicateItem: (itemId: string) => void,
  deleteItem: (itemId: string) => void
}