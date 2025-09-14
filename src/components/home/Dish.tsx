import type { DishType } from "@/types"

export interface DishProps {
  dish: DishType
}

export function Dish({dish}: DishProps) {
  const selected = false ? 'selected ' : '';

  return (
    <div
      className={`${selected}ingredient-container relative`}
    >
      {dish.name}
      {dish.price} €
    </div>
  )
}