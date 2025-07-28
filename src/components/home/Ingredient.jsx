import { ingredientIdToName } from "../../scripts/utils";


export default function Ingredient({ ingredientId }){
  const ingredientName = ingredientIdToName(ingredientId); 

  return (
    <div className="option-container">
      <label 
        htmlFor={ingredientId} 
        className="option-name">
          {ingredientName}
      </label>
      <input 
        type="checkbox"
        id={ingredientId}
      />
    </div>
  )
}