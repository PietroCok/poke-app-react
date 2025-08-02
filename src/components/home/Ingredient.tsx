
export interface IngredientProps {
  ingredientId: string,
  ingredientName: string,
  addIngredient: Function,
  removeIngredient: Function,
  increaseQuantity: Function,
  isSelected: boolean
}

export function Ingredient({
  ingredientId,
  ingredientName,
  addIngredient,
  removeIngredient,
  increaseQuantity,
  isSelected = false
}: IngredientProps) {
  const selected = isSelected ? 'selected' : '';

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const checked = event.target.checked;

    if (checked) {
      addIngredient(ingredientId)
    } else {
      removeIngredient(ingredientId)
    }
  }

  return (
    <div className={`ingredient-container${' ' + selected}`}>
      <label
        htmlFor={ingredientId}
        className="ingredient-name"
      >
        {ingredientName}
      </label>
      <input
        type="checkbox"
        id={ingredientId}
        checked={isSelected}
        onChange={handleChange}
      />
    </div>
  )
}