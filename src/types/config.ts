import type { PokeSize } from "./context"

export type AppConfig = {
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
