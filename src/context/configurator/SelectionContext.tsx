import { createContext, useContext, useMemo, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import type { AppConfig, IngredientsState, PaymentMethod, Poke, PokeSize, SelectionContextType, StaticSelectionContextType } from "@/types";
import { PAYMENT_METHODS } from "@/types";

import appConfig from '../../../config.json';
import { getLimit, groupCount, ingredientIdToName } from "../../scripts/utils";
import { SELECTION_ACTIONS, emptyIngredients, selectionReducer } from "./selectionReducer";
import { useLocalStorage, useLocalStorageReducer } from "../../hooks/useLocalStorage";
import { useToast } from "../ToastContext";
import { getPokePrice, groupExtraPrice } from "../../scripts/utils";

export interface SelectionProviderProps {

}

export const ingredientsStorageKey = 'poke-ingredients';
export const sizeStorageKey = 'poke-size';

const config: AppConfig = appConfig;

const defaultSize = Object.keys(config.dimensioni)[0] as PokeSize;

const SelectionContext = createContext<SelectionContextType | null>(null);
const StaticSelectionContext = createContext<StaticSelectionContextType | null>(null);

export const useSelection = () => {
  const ctx = useContext(SelectionContext);
  if (!ctx) throw new Error('useSelection must be used within a SelectionProvider');

  const staticCtx = useContext(StaticSelectionContext);
  if (!staticCtx) throw new Error('useSelection must be used within a SelectionProvider');

  return { ...ctx, ...staticCtx };
};

export function SelectionProvider({ }: SelectionProviderProps) {
  const [size, setSize] = useLocalStorage<PokeSize>(sizeStorageKey, defaultSize);
  const [ingredients, dispatch] = useLocalStorageReducer(
    ingredientsStorageKey,
    selectionReducer,
    emptyIngredients
  );
  const [paymentMethod, setPaymentMethod] = useLocalStorage<PaymentMethod>('poke-payment-method', PAYMENT_METHODS.CASH);
  const [name, setName] = useLocalStorage('poke-save-name', '');
  const [editingId, setEditingId] = useState('');
  const { showInfo } = useToast();
  const navigate = useNavigate();

  // Add or increase quantity of ingredient to selection
  const addIngredient = (group: string, ingredientId: string) => {
    const ingredientName = ingredientIdToName(ingredientId);
    const price = config.gruppi[group]?.opzioni.find(i => i.name == ingredientName)?.prezzo ?? 0;

    dispatch({
      type: SELECTION_ACTIONS.ADD_INGREDIENT,
      groupId: group,
      ingredient: { id: ingredientId, quantity: 1, price }
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

    showInfo(`${item.name} caricato`, {duration: 2});

    if (navigateHome) {
      navigate('/');
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
    <StaticSelectionContext.Provider
      value={staticContextValue}
    >
      <SelectionContext.Provider value={{
        size,
        ingredients,
        name,
        paymentMethod,
        editingId,
        selectSize,
        addIngredient,
        removeIngredient,
        increaseQuantity,
        resetContext,
        loadItemIntoConfigurator,
        setName,
        setPaymentMethod,
        setEditingId
      }}>
        <Outlet />
      </SelectionContext.Provider>
    </StaticSelectionContext.Provider>
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

