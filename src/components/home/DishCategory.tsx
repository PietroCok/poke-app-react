import type { DishType } from "@/types";
import { Dish } from "./Dish";
import { ingredientNameToId } from "@/scripts/utils";


export interface DishCategoryProps {
  category: string,
  dishes: DishType[]
}

export function DishCategory({ category, dishes }: DishCategoryProps) {
  console.log(category, dishes);

  return (
    <div
      className="flex flex-column gap-1"
    >
      <div>{category}</div>
      {renderDishes(dishes)}
    </div>
  );
}


function renderDishes(dishes: DishType[]) {
  return dishes.map(dish => {
    return (
      <Dish
        key={ingredientNameToId(dish.name)}
        dish={dish}
      />
    )
  })
}