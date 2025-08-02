export type AppConfig = {
  dimensioni: {
    [key: string]: Dimension
  },
  gruppi: {
    [key: string]: Group
  },
  firebaseConfig: {
    [key: string]: string | number
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
  }[]
}
