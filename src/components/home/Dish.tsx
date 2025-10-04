import type { DishType } from "@/types"
import { ButtonIcon } from "../common/ButtonIcon"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"

export interface DishProps {
  dish: DishType
  dishId: string
  quantity: number
  isSelected: boolean
  addDish: (dishId: string) => void,
  removeDish: (dishId: string) => void,
  increaseQuantity: (dishId: string) => void,
}

export function Dish({
  dish,
  dishId,
  quantity,
  isSelected,
  addDish,
  removeDish,
  increaseQuantity
}: DishProps) {
  const selected = isSelected ? 'selected ' : '';

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const checked = event.target.checked;

    if (checked) {
      addDish(dishId);
    } else {
      removeDish(dishId);
    }
  }

  return (
    <div
      className={`${selected}dish-container relative`}
      {...(quantity > 1 ? { 'data-extra': quantity } : {})}
    >
      <label
        htmlFor={dishId}
        className="flex flex-column pointer"
      >
        <div
          className="flex gap-05"
        >
          <span className="dish-code">{dish.code}</span>
          -
          <span className="dish-name">{dish.name}</span>
        </div>
        <span className="dish-price flex text-small">{dish.price} €</span>
      </label>

      <input
        type="checkbox"
        name={dishId}
        id={dishId}
        checked={isSelected}
        onChange={handleChange}
      />

      {
        isSelected &&
        <ButtonIcon
          icon={<FontAwesomeIcon icon={faPlus} />}
          classes={"add-extra flex flex-center transparent-bg h-100 aspect-1 border-round no-active right-0 absolute"}
          clickHandler={() => increaseQuantity(dishId)}
          tooltip="Aggiungi copia"
        />
      }
    </div>
  )
}