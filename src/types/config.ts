import type { PokeSize } from "./context"

export type AppConfig = {
  dimensioni: Record<PokeSize, Dimension>,
  gruppi: {
    [key: string]: Group
  }
}

export type Dimension = {
  limiti: {
    [key: string]: number
  },
  prezzo: number
}

export type Group = {
  extras: string,
  opzioni: {
    name: string,
    prezzo: number
  }[],
  order: number
}
