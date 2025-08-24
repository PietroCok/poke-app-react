import type { IngredientsState } from "./context"

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

export type Poke = {
  id: string
  name: string
  ingredients: IngredientsState,
  createdBy: string
  size: string,
  price: number
  paymentMethod?: PaymentMethod
}

export type Cart = {
  id: string,
  items: {
    [id: string]: Poke
  },
  name: string,
  createdBy: string,
  createdAt: string,
  isShared: boolean
}
