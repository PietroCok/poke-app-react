import type { DishType } from "@/types";
import { Dish } from "./Dish";
import { ingredientNameToId } from "@/scripts/utils";

type DishInfo = DishType & {
  id: string, 
  quantity: number,
  selected: boolean
}

export interface DishCategoryProps {
  category: string,
  dishes: DishInfo[],
  addDish: (dishId: string) => void,
  removeDish: (dishId: string) => void,
  increaseQuantity: (dishId: string) => void,
}

export function DishCategory({ category: _, dishes, addDish, removeDish, increaseQuantity }: DishCategoryProps) {
  return (
    renderDishes(dishes, addDish, removeDish, increaseQuantity)
  );
}

function renderDishes(
  dishes: DishInfo[],
  addDish: (dishId: string) => void,
  removeDish: (dishId: string) => void,
  increaseQuantity: (dishId: string) => void,
) {
  return dishes.map(dish => {
    const dishId = ingredientNameToId(dish.name);
    return (
      <Dish
        key={dishId}
        dish={dish}
        dishId={dishId}
        quantity={dish.quantity}
        isSelected={dish.selected}
        addDish={addDish}
        removeDish={removeDish}
        increaseQuantity={increaseQuantity}
      />
    )
  })
}