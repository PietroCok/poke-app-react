import { ingredientNameToId } from "../../scripts/utils";
import GroupLimits from "./GroupLimits"
import Ingredient from "./Ingredient"

export default function IngredientGroup({ group }) {
  const ingredients = group.opzioni;

  return (
    <>
      <section className="ingredient-group">
        <div className="ingredient-group-header text-uppercase">
          <h3 className="ingredient-group-name">{group.type}</h3>
          <GroupLimits
            count={0}
            limit={5}
            extraPrice={999999.99}
          />
          <h4 className="extra-label">{'descrizione extra'}</h4>
        </div>

        {renderIngredients(ingredients)}
      </section>
    </>
  )
}

function renderIngredients(ingredients) {
  return ingredients.map(ingredient => {
    const ingredientId = ingredientNameToId(ingredient.name);
    return (
      <Ingredient
        key={ingredientId}
        ingredientId={ingredientId}
        ingredientName={ingredient.name}
      />
    )
  })
}