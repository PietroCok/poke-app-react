import type { PokeSize } from "./context"

export type AppConfig = PokeConfig & MenuConfig

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
  menu: {
    [key: string]: DishType[]
  }
}

export type DishType = {
  name: string,
  description: string,
  price: number
}


