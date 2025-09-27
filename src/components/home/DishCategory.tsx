import { useState, type ToggleEvent } from "react";

import type { DishType } from "@/types";
import { Dish } from "./Dish";
import { ingredientNameToId } from "@/scripts/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

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

export function DishCategory({ category, dishes, addDish, removeDish, increaseQuantity }: DishCategoryProps) {

  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = (event: ToggleEvent<HTMLDetailsElement>) => {
    const target = event.target as HTMLDetailsElement;
    setIsOpen(target.open);
  }

  const selectedCount = dishes.reduce((count, dish) => count + dish.quantity, 0);
  const classes = selectedCount > 0 ? 'selected' : '';

  return (
    <details
      onToggle={handleToggle}
    >
      <summary
        className={`dish-menu-category-header pointer sticky top-0 main-bg padding-1-0 text-uppercase text-center weight-bold z-1 ${classes}`}
      >
        <span
          data-dish-count={(selectedCount > 0) ? selectedCount : null}
        >
          {category}
        </span>
        <FontAwesomeIcon
          icon={faAngleDown}
          className={`absolute right-1 ${isOpen && 'rotate-180'}`}
        />
      </summary>

      <div
        className="flex flex-column gap-1 padding-0-1"
      >
        {renderDishes(dishes, addDish, removeDish, increaseQuantity)}
      </div>
    </details>
  );
}

function renderDishes(
  dishes: DishInfo[],
  addDish: (dishId: string) => void,
  removeDish: (dishId: string) => void,
  increaseQuantity: (dishId: string) => void,
) {
  if(dishes.length == 0) {
    return (
      <span className="text-center">Ops, sembra che non ci siano ancora elementi in questa categoria</span>
    )
  }

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
