import { useState } from "react";



export default function Ingredient({
  ingredientGroup,
  ingredientId,
  ingredientName,
  addIngredient,
  removeIngredient,
  isSelected = false
}) {
  const selected = isSelected ? 'selected' : '';

  function handleChange(event) {
    const checked = event.target.checked;

    if (checked) {
      addIngredient(ingredientGroup, ingredientId)
    } else {
      removeIngredient(ingredientGroup, ingredientId)
    }
  }

  return (
    <div className={`ingredient-container${' ' + selected}`}>
      <label
        htmlFor={ingredientId}
        className="ingredient-name">
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