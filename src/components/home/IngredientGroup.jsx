import GroupLimits from "./GroupLimits"
import Ingredient from "./Ingredient"


export default function IngredientGroup({ name, ingredients }) {

  return (
    <>
      <section className="ingredient-group">
        <div className="ingredient-group-header">
          <h3 className="ingredient-group-name">{name}</h3>
          <GroupLimits
            count={3}
            limit={4}
            extraPrice={1.00}
          />
          <h4 className="extra-label">extra €0.50</h4>
        </div>

        {renderIngredients(ingredients)}
      </section>
    </>
  )
}

function renderIngredients(ingredients){
  return ingredients.map(ingredient => {
    return (
      <Ingredient 
        key={ingredient.id} 
        ingredientId={ingredient.id} 
      />
    )
  })
}