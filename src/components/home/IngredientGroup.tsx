import type { ContextIngredient } from "@/types";

import { useSelection } from "../../context/SelectionContext";
import { ingredientNameToId } from "../../scripts/utils";
import { GroupLimits } from "./GroupLimits"
import { Ingredient } from "./Ingredient"

interface IngredientGroupProps {
  group: {
    extras: string;
    opzioni: {
      name: string;
      prezzo: number;
    }[];
    id: string;
  }
}

export function IngredientGroup({ group }: IngredientGroupProps) {
  const {
    ingredients: selectedIngredients,
    groupCount,
    groupExtraPrice,
    getLimit,
    addIngredient,
    increaseQuantity,
    removeIngredient
  } = useSelection();

  const ingredients = group.opzioni;

  const count = groupCount(group.id);
  const limit = getLimit(group.id);

  // Preconfigure callbacks
  const addIngredientGroup = (ingredientId: string) => addIngredient(group.id, ingredientId);
  const removeIngredientGroup = (ingredientId: string) => removeIngredient(group.id, ingredientId);
  const increaseQuantityGroup = (ingredientId: string) => increaseQuantity(group.id, ingredientId);

  return (
    <section className="ingredient-group">
      <div className="ingredient-group-header text-uppercase">
        <h3 className="ingredient-group-name">{group.id}</h3>
        <GroupLimits
          count={count}
          limit={limit}
          extraPrice={count > limit ? groupExtraPrice(group.id) : 0}
        />
        <h4 className="extra-label text-center">{group.extras}</h4>
      </div>

      <div className="ingredient-group-container">
        {ingredients.map(ingredient => {
          const ingredientId = ingredientNameToId(ingredient.name);
          const selectedIngredient = selectedIngredients[group.id]?.find((ingredient: ContextIngredient) => ingredient.id == ingredientId);
          const isSelected = selectedIngredient ? true : false;
          return (
            <Ingredient
              key={ingredientId}
              ingredientId={ingredientId}
              ingredientName={ingredient.name}
              ingredientQuantity={selectedIngredient?.quantity || 0}
              addIngredient={addIngredientGroup}
              removeIngredient={removeIngredientGroup}
              increaseQuantity={increaseQuantityGroup}
              isSelected={isSelected}
            />
          )
        })}
      </div>
    </section>
  )
}

