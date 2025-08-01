import { useSelection } from "../../context/configurator/SelectionContext";
import { ingredientNameToId } from "../../scripts/utils";
import GroupLimits from "./GroupLimits"
import Ingredient from "./Ingredient"

export default function IngredientGroup({ group }) {
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
  const addIngredientGroup = (ingredientId) => addIngredient(group.id, ingredientId);
  const removeIngredientGroup = (ingredientId) => removeIngredient(group.id, ingredientId);
  const increaseQuantityGroup = (ingredientId) => increaseQuantity(group.id, ingredientId);

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
          const isSelected = selectedIngredients[group.id]?.find(ingredient => ingredient.id == ingredientId) || false;
          return (
            <Ingredient
              key={ingredientId}
              ingredientGroup={group.id}
              ingredientId={ingredientId}
              ingredientName={ingredient.name}
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

