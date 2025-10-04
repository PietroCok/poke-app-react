import { createContext, useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import type { AppConfig, IngredientsState, Poke, PokeSize, PokeSelectionContextType, StaticPokeSelectionContextType } from "@/types";
import { PAYMENT_METHODS } from "@/types";

import appConfig from '../../config.json';
import { getLimit, groupCount, getPokePrice, groupExtraPrice } from "../scripts/utils";
import { SELECTION_ACTIONS, emptyIngredients, selectionReducer } from "./reducer/selectionReducer";
import { useLocalStorage, useLocalStorageReducer } from "@/hooks/useLocalStorage";
import { useToast } from "./ToastContext";
import { useSelection } from "./SelectionContext";


export const ingredientsStorageKey = 'poke-ingredients';
export const sizeStorageKey = 'poke-size';

const config: AppConfig = appConfig;

const defaultSize = Object.keys(config.sizes)[0] as PokeSize;

const PokeSelectionContext = createContext<PokeSelectionContextType | null>(null);
const StaticPokeSelectionContext = createContext<StaticPokeSelectionContextType | null>(null);

export const usePokeSelection = () => {
  const ctx = useContext(PokeSelectionContext);
  if (!ctx) throw new Error('usePokeSelection must be used within a PokeSelectionProvider');

  const staticCtx = useContext(StaticPokeSelectionContext);
  if (!staticCtx) throw new Error('usePokeSelection must be used within a PokeSelectionProvider');

  return { ...ctx, ...staticCtx };
};

export function PokeSelectionProvider({ children }: { children: React.ReactNode }) {
  const [size, setSize] = useLocalStorage<PokeSize>(sizeStorageKey, defaultSize);
  const [ingredients, dispatch] = useLocalStorageReducer(
    ingredientsStorageKey,
    selectionReducer,
    emptyIngredients
  );
  const { setName, setPaymentMethod } = useSelection();
  const [editingId, setEditingId] = useState('');
  const { showInfo } = useToast();
  const navigate = useNavigate();

  // Add or increase quantity of ingredient to selection
  const addIngredient = (group: string, ingredientId: string) => {

    dispatch({
      type: SELECTION_ACTIONS.ADD_INGREDIENT,
      groupId: group,
      ingredient: { id: ingredientId, quantity: 1 }
    });
  }

  // Completetly an ingredient from selection
  const removeIngredient = (group: string, ingredientId: string) => {
    dispatch({
      type: SELECTION_ACTIONS.REMOVE_INGREDIENT,
      groupId: group,
      ingredientId: ingredientId
    })
  }

  const increaseQuantity = (group: string, ingredientId: string) => {
    dispatch({
      type: SELECTION_ACTIONS.INCREMENT_QUANTITY,
      groupId: group,
      ingredientId: ingredientId
    })
  }

  const selectSize = (newSelectedSize: PokeSize) => {
    if (size != newSelectedSize) {
      setSize(newSelectedSize);
    }
  }

  // Reset ingredients selected
  const resetContext = () => {
    setEditingId('');
    dispatch({
      type: SELECTION_ACTIONS.RESET,
    })
  }

  const loadItemIntoConfigurator = (item: Poke, navigateHome = false) => {
    const newIngredients = structuredClone(item.ingredients) || {};

    dispatch({
      type: SELECTION_ACTIONS.SET_INGREDIENTS,
      ingredients: newIngredients
    });

    setSize(item.size);

    setName(item.name);

    setPaymentMethod(item.paymentMethod || PAYMENT_METHODS.CASH);

    setEditingId(item.id);

    showInfo(`${item.name} caricato`, { duration: 2 });

    if (navigateHome) {
      navigate('/poke-configurator');
    }
  }

  const staticContextValue = useMemo(() => ({
    hasIngredients: () => hasIngredients(ingredients),
    getLimit: (groupId: string) => getLimit(size, groupId),
    groupCount: (groupId: string) => groupCount(groupId, ingredients),
    groupExtraPrice: (groupId: string) => groupExtraPrice(size, groupId, ingredients),
    getTotalPrice: () => getPokePrice(size, ingredients),
  }), [size, ingredients]);

  return (
    <StaticPokeSelectionContext.Provider
      value={staticContextValue}
    >
      <PokeSelectionContext.Provider value={{
        size,
        ingredients,
        editingId,
        selectSize,
        addIngredient,
        removeIngredient,
        increaseQuantity,
        resetContext,
        loadItemIntoConfigurator,
        setEditingId
      }}>
        {children}
      </PokeSelectionContext.Provider>
    </StaticPokeSelectionContext.Provider>
  );
}

const hasIngredients = (ingredients: IngredientsState) => {
  for (const [_, _ingredients] of Object.entries(ingredients)) {
    if (_ingredients.length > 0) {
      return true;
    }
  }

  return false;
}

