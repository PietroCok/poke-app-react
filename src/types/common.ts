import type { Dish } from "./config";
import type { IngredientsState, PokeSize } from "./context"

export interface SubMenuProps {
  menuId: string,
  openMenuId: string
  setMenuId: (id: string) => void
}

export const PAYMENT_METHODS = {
  PAYPAL: 'P',
  CASH: 'C'
} as const;

export type PaymentMethod = typeof PAYMENT_METHODS[keyof typeof PAYMENT_METHODS];

export type CartItem = {
  id: string
  name: string
  createdBy: string
  paymentMethod?: PaymentMethod
}

export type Poke = CartItem & {
  ingredients: IngredientsState,
  size: PokeSize,
}

export type DishSelection = CartItem & {
  dishes: Dish[]
}

export type Cart = {
  id: string,
  items: {
    [id: string]: Poke | DishSelection
  },
  name: string,
  createdBy: string,
  createdAt: string,
  isShared: boolean
}
