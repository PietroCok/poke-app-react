import { useSelection } from "../../context/configurator/SelectionContext";
import { ingredientNameToId } from "../../scripts/utils";
import GroupLimits from "./GroupLimits"
import Ingredient from "./Ingredient"

export default function IngredientGroup({ group }) {
  const { 
    ingredients: selectedIngredients,
    groupCount, groupExtraPrice, getLimit, addIngredient, removeIngredient } = useSelection();
  const ingredients = group.opzioni;

  const count = groupCount(group.type);
  const limit = getLimit(group.type);

  return (
    <section className="ingredient-group">
      <div className="ingredient-group-header text-uppercase">
        <h3 className="ingredient-group-name">{group.type}</h3>
        <GroupLimits
          count={count}
          limit={limit}
          extraPrice={count > limit ? groupExtraPrice(group.type) : 0}
        />
        <h4 className="extra-label text-center">{group.extras}</h4>
      </div>

      <div className="ingredient-group-container">
        {ingredients.map(ingredient => {
          const ingredientId = ingredientNameToId(ingredient.name);
          const isSelected = selectedIngredients[group.type]?.find(ingredient => ingredient.id == ingredientId) || false;
          return (
            <Ingredient
              key={ingredientId}
              ingredientGroup={group.type}
              ingredientId={ingredientId}
              ingredientName={ingredient.name}
              addIngredient={addIngredient}
              removeIngredient={removeIngredient}
              isSelected={isSelected}
            />
          )
        })}
      </div>
    </section>
  )
}

