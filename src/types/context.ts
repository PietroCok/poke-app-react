import type { FirebaseError } from "firebase/app"
import type { User, UserCredential } from "firebase/auth"
import type { Cart, PaymentMethod, Poke } from "./common"

import appConfig from '../../config.json';

export type ContextIngredient = {
  id: string,
  quantity: number,
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

export type PokeSize = keyof typeof appConfig.dimensioni;

export type SelectionContextType = {
  ingredients: IngredientsState,
  size: PokeSize,

  selectSize: (newSelectedSize: PokeSize) => void,

  addIngredient: (groupId: string, ingredientId: string) => void,
  removeIngredient: (groupId: string, ingredientId: string) => void,
  increaseQuantity: (groupId: string, ingredientId: string) => void,
  loadItemIntoConfigurator: (item: Poke, navigateHome?: boolean) => void,

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
  deleteAccount: () => Promise<{redirect: string} | undefined>
}

export type StaticCartContextType = {
  getItemsCount: () => number
  getTotalPrice: (method?: PaymentMethod) => number
  hasItem: (itemId: string) => boolean
}

export type CartContextType = {
  cart: Cart,

  updateCart: (cart: Cart) => void,
  createCart: (name: string, copyActiveCart: boolean) => Promise<boolean>,
  deleteCart: (cart: Cart) => Promise<boolean>,
  deleteCarts: (carts: Cart[]) => Promise<boolean>,
  unlinkCart: () => void,
  updateCartName: (newName: string) => void,

  addItem: (item: Poke, fromEdit?: boolean) => Promise<void>,
  duplicateItem: (itemId: string) => void,
  deleteItem: (itemId: string, itemName: string) => void
  deleteAllItems: () => void
}

export type ToastType = {
  id: string,
  message: string,
  color: string,
  duration: number
  icon?: React.ReactNode
  doAnimate?: boolean
}

export type ToastOptions = {
  color?: string,
  duration?: number
  icon?: React.ReactNode
  doAnimate?: boolean
}

export type ToastContextType = {
  showToast: (message: string, options?: ToastOptions) => void
  showInfo: (message: string, options?: ToastOptions) => void
  showError: (message: string, options?: ToastOptions) => void
}

export type ModalType = {
  type: 'alert' | 'confirm' | 'custom',
  title: string,
  content: React.ReactNode,
  actions?: React.ReactNode[],
  onCancel?: () => void
}

export type ModalContextType = {
  showModal: (modalProps: ModalType) => void
  showAlert: (message: string, title?: string) => void
  showConfirm: (message: string, title?: string) => Promise<boolean>
  hideModal: () => void
}

export type FavoriteContextType = {
  favorites: Poke[],
  addFavorite: (item: Poke, fromEdit?: boolean) => Promise<void>
  removeFavorite: (itemId: string, itemName: string) => void
  removeAllFavorites: () => void
  duplicateItem: (itemId: string) => void
}

export type StaticFavoriteContextType = {
  hasItem: (itemId: string) => boolean
}