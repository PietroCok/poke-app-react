import type { FirebaseError } from "firebase/app"
import type { User, UserCredential } from "firebase/auth"
import type { Cart, PaymentMethod, Poke } from "./common"

export type ContextIngredient = {
  id: string,
  quantity: number,
  price: number,
}

export type IngredientsState = {
  [key: string]: ContextIngredient[],
}

export type StaticSelectionContextType = {
  getLimit: (groupId: string) => number,
  groupCount: (groupId: string) => number,
  groupExtraPrice: (groupId: string) => number,
  getTotalPrice: () => number,
  hasIngredients: () => boolean,
}

export type SelectionContextType = {
  ingredients: IngredientsState,
  size: string,

  selectSize: (newSelectedSize: string) => void,

  addIngredient: (groupId: string, ingredientId: string) => void,
  removeIngredient: (groupId: string, ingredientId: string) => void,
  increaseQuantity: (groupId: string, ingredientId: string) => void,
  loadItemIntoConfigurator: (item: Poke) => void,

  resetContext: () => void,

  name: string,
  setName: (name: string) => void,

  paymentMethod: PaymentMethod,
  setPaymentMethod: (paymentMethod: PaymentMethod) => void,

  editingId: string,
  setEditingId: (itemId: string) => void
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

export type StaticAuthContextType = {
  isUserActive: () => boolean,
}

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

export type StaticCartContextType = {
  getItemsCount: () => number
}

export type CartContextType = {
  cart: Cart,

  updateCart: (cart: Cart) => void,
  createCart: (name: string, copyActiveCart: boolean) => Promise<boolean>,
  deleteCart: (cartId: string) => Promise<boolean>,
  unlinkCart: () => void,
  updateCartName: (newName: string) => void,

  addItem: (item: Poke) => void,
  duplicateItem: (itemId: string) => void,
  deleteItem: (itemId: string, itemName: string) => void
  updateItemFromEditing: (item: Poke) => void,
  deleteAllItems: () => void
}