import type { PokeSize } from "./context"

export type AppConfig = PokeConfig & {
  menu: MenuConfig
}

export type PokeConfig = {
  sizes: Record<PokeSize, SizeType>,
  groups: {
    [key: string]: Group
  }
}

export type SizeType = {
  limits: {
    [key: string]: number
  },
  price: number
}

export type Group = {
  extras: string,
  options: {
    name: string,
    price: number
  }[],
  order: number
}

export type MenuConfig = {
  [key: string]: DishType[]
}


/**
 * Basic dish type for display
 */
export type DishType = {
  name: string,
  description: string,
  price: number
}

/**
 * Effective dish added to the cart
 */
export type Dish = {
  id: string,
  quantity: number
}


