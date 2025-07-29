


export default function Ingredient({ ingredientId, ingredientName }){

  return (
    <div className="ingredient-container">
      <label 
        htmlFor={ingredientId} 
        className="ingredient-name">
          {ingredientName}
      </label>
      <input 
        type="checkbox"
        id={ingredientId}
      />
    </div>
  )
}