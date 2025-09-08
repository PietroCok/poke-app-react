import { createContext, useContext, useMemo } from "react";
import { Outlet } from "react-router-dom";

import { useLocalStorage } from "@/hooks/useLocalStorage";
import type { FavoriteContextType, Poke, StaticFavoriteContextType } from "@/types";
import { useModal } from "./ModalContext";
import { useToast } from "./ToastContext";
import { hasItem } from "@/scripts/utils";

const FavoriteContext = createContext<FavoriteContextType | null>(null);
const StaticFavoriteContext = createContext<StaticFavoriteContextType | null>(null);

export const useFavorite = () => {
  const ctx = useContext(FavoriteContext);
  if (!ctx) throw new Error('useFavorite must be used within an FavoriteProvider');

  const staticCtx = useContext(StaticFavoriteContext);
  if (!staticCtx) throw new Error('useFavorite must be used within an FavoriteProvider');

  return { ...ctx, ...staticCtx };
};

export interface FavoriteProviderProps { }

export function FavoriteProvider({ }: FavoriteProviderProps) {
  const [favorites, setFavorites] = useLocalStorage<Poke[]>('poke-favorites', []);
  const { showConfirm } = useModal();
  const { showInfo, showError } = useToast();

  const addFavorite = async (item: Poke, fromEdit?: boolean) => {
    setFavorites(
      prevState => {
        let oldItemId = item.id;
        const newItem = structuredClone(item);

        // For now, favorites are shared across any account using the device
        newItem.createdBy = '';

        // If the items is saved after edit, update its id and remove old item
        // this prevents having an item with the same id (but different content) in the cart
        if (fromEdit) {
          newItem.id = crypto.randomUUID();
        }

        const hasConflict = prevState.find(f => f.id == newItem.id)
        if (hasConflict) {
          queueMicrotask(() => showError(`Elemento già salvato nei preferiti`));
          return prevState;
        }

        queueMicrotask(() => {
          if (fromEdit) {
            showInfo(`Elemento aggiornato nei preferiti`);
          } else {
            showInfo(`Elemento salvato nei preferiti`);
          }
        });

        return [
          ...prevState.filter(f => f.id !== oldItemId),
          newItem
        ];
      }
    )
  }

  const duplicateItem = (itemId: string) => {
    const oldItem = favorites.find(f => f.id == itemId);
    if (!oldItem) {
      return;
    }

    const newItem = structuredClone(oldItem);
    newItem.id = crypto.randomUUID();
    addFavorite(newItem);
  }

  const removeFavorite = async (itemId: string, itemName: string) => {
    if (!await showConfirm(`Confermare la cancellazione dell'elemento ${itemName}`)) {
      return;
    }

    setFavorites(
      prevState => {
        return [...prevState.filter(f => f.id != itemId)]
      }
    )
  }

  const removeAllFavorites = async () => {
    if (!await showConfirm(`Confermare la cancellazione di tutti i preferiti?`)) {
      return;
    }

    setFavorites([])
  }

  const staticContextValue = useMemo(() => ({
    hasItem: (ItemId: string) => hasItem(favorites, ItemId)
  }), [favorites])

  return (
    <StaticFavoriteContext.Provider
      value={staticContextValue}
    >
      <FavoriteContext.Provider
        value={{
          favorites,
          addFavorite,
          removeFavorite,
          removeAllFavorites,
          duplicateItem
        }}
      >
        <Outlet />
      </FavoriteContext.Provider>
    </StaticFavoriteContext.Provider>
  )
}

