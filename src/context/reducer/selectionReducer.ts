import appConfig from '../../../config.json';
import type { ContextIngredient, IngredientsState } from '@/types';

export type ActionType = typeof SELECTION_ACTIONS[keyof typeof SELECTION_ACTIONS];

type Action = {
  type: ActionType,
  groupId?: string,
  ingredientId?: string
  ingredient?: ContextIngredient
  ingredients?: IngredientsState
}

export const emptyIngredients = Object.fromEntries(Object.entries(appConfig.groups).map(group => [group[0], []]));

export const SELECTION_ACTIONS = {
  ADD_INGREDIENT: 'add_ingredient',
  REMOVE_INGREDIENT: 'remove_ingredient',
  INCREMENT_QUANTITY: 'increment_quantity',
  SET_INGREDIENTS: 'set_ingredients',
  RESET: 'reset',
} as const;

export function selectionReducer(state: IngredientsState, action: Action): IngredientsState {
  switch (action.type) {

    case SELECTION_ACTIONS.ADD_INGREDIENT: {
      const { groupId, ingredient } = action;
      if(!groupId || !ingredient){
        console.error(`One or more parameter is missing for action: ${SELECTION_ACTIONS.ADD_INGREDIENT} on SelectionReducer`);
         return state;
      }

      const updatedState = {
        ...state,
        [groupId]: [...state[groupId], ingredient]
      };
      return updatedState;
    }

    case SELECTION_ACTIONS.REMOVE_INGREDIENT: {
      const { groupId, ingredientId } = action;
      if(!groupId || !ingredientId) {
        console.error(`One or more parameter is missing for action: ${SELECTION_ACTIONS.REMOVE_INGREDIENT} on SelectionReducer`);
        return state;
      }

      const updatedState = {
        ...state,
        [groupId]: state[groupId].filter((ingredient: ContextIngredient) => ingredient.id != ingredientId)
      };
      return updatedState;
    }

    case SELECTION_ACTIONS.INCREMENT_QUANTITY: {
      const { groupId, ingredientId } = action;
      if(!groupId || !ingredientId) {
        console.error(`One or more parameter is missing for action: ${SELECTION_ACTIONS.INCREMENT_QUANTITY} on SelectionReducer`);
        return state;
      }

      const updatedState = {
        ...state,
        [groupId]: state[groupId].map((ingredient: ContextIngredient) =>
          ingredient.id == ingredientId ? { ...ingredient, quantity: ingredient.quantity + 1 } : ingredient
        )
      }
      return updatedState;
    }

    case SELECTION_ACTIONS.SET_INGREDIENTS: {
      const { ingredients } = action;
      if(!ingredients){
        console.error(`One or more parameter is missing for action: ${SELECTION_ACTIONS.SET_INGREDIENTS} on SelectionReducer`);
        return state;
      }

      return {
        ...emptyIngredients,
        ...ingredients
      }
    }

    case SELECTION_ACTIONS.RESET: {
      return emptyIngredients;
    }

    default:
      return state;
  }
}