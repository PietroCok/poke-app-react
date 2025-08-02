import appConfig from '../../../config.json';
import type { ContextIngredient, IngredientsState } from './SelectionContext';

export type ActionType = typeof ACTIONS[keyof typeof ACTIONS];

type Action = {
  type: ActionType,
  payload: any
}

export const emptyIngredients = Object.fromEntries(Object.entries(appConfig.gruppi).map(group => [group[0], []]));

export const ACTIONS = {
  ADD_INGREDIENT: 'add_ingredient',
  REMOVE_INGREDIENT: 'remove_ingredient',
  INCREMENT_QUANTITY: 'increment_quantity',
  RESET: 'reset',
} as const;

export function selectionReducer(state: IngredientsState, action: Action): IngredientsState {
  switch (action.type) {

    case ACTIONS.ADD_INGREDIENT: {
      const { group, ingredient } = action.payload;
      return {
        ...state,
        [group]: [...state[group], ingredient]
      };
    }

    case ACTIONS.REMOVE_INGREDIENT: {
      const { group, ingredientId } = action.payload;
      return {
        ...state,
        [group]: state[group].filter((ingredient: ContextIngredient) => ingredient.id != ingredientId)
      };
    }

    case ACTIONS.INCREMENT_QUANTITY: {
      const { group, ingredientId } = action.payload;

      return {
        ...state,
        [group]: state[group].map((ingredient: ContextIngredient) =>
          ingredient.id == ingredientId ? { ...ingredient, quantity: ingredient.quantity + 1 } : ingredient
        )
      }
    }

    case ACTIONS.RESET: {
      return emptyIngredients;
    }

    default:
      return state;
  }
}