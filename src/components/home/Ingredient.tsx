import { ButtonIcon } from "../common/ButtonIcon";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export interface IngredientProps {
  ingredientId: string,
  ingredientName: string,
  ingredientQuantity: number,
  addIngredient: Function,
  removeIngredient: Function,
  increaseQuantity: Function,
  isSelected: boolean
}

export function Ingredient({
  ingredientId,
  ingredientName,
  ingredientQuantity,
  addIngredient,
  removeIngredient,
  increaseQuantity,
  isSelected = false
}: IngredientProps) {
  const selected = isSelected ? 'selected ' : '';

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const checked = event.target.checked;

    if (checked) {
      addIngredient(ingredientId)
    } else {
      removeIngredient(ingredientId)
    }
  }

  return (
    <div 
      className={`${selected}ingredient-container relative`}
      {...(ingredientQuantity > 1 ? {'data-extra': ingredientQuantity} : {})}
    >
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

      {
        isSelected &&
        <ButtonIcon
          icon={faPlus}
          classes={"flex flex-center h-100 aspect-1 border-round right-0 absolute"}
          clickHandler={() => increaseQuantity(ingredientId)}
        />
      }
    </div>
  )
}