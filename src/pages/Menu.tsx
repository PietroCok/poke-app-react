import { useState } from "react";
import type { Dish, MenuConfig } from "@/types";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { ButtonIcon } from "@/components/common/ButtonIcon";
import { MainMenu } from "@/components/common/MainMenu";
import { PageHeader } from "@/components/common/PageHeader";
import { useCart } from "@/context/CartContext";
import { PageFooter } from "@/components/common/PageFooter";
import { ButtonText } from "@/components/common/ButtonText";
import { SaveSelectionModal } from "@/components/modals/SaveSelectionModal";
import { DishCategory } from "@/components/home/DishCategory";
import { useMenuSelection } from "@/context/MenuSelectionContext";
import { ingredientNameToId } from "@/scripts/utils";


export function Menu({ menu }: { menu: MenuConfig }) {
  const [isSaveOpen, setIsSaveOpen] = useState(false);
  const { dishes: selectedDishes, addDish, removeDish, increaseQuantity, resetContext, hasDishes, getTotalPrice } = useMenuSelection();
  const { getItemsCount } = useCart();

  const isEmpty = !hasDishes();

  return (
    <div className="page-container h-100 flex flex-column">
      <PageHeader
        left={
          <ButtonIcon
            icon={<FontAwesomeIcon icon={faCartShopping} />}
            classes="gold border-r-10"
            tooltip="Carrello"
            linkTo={"/cart"}
            data-cart-count={getItemsCount() || null}
          />
        }
        right={
          <MainMenu />
        }
      />

      <h2 id="page-title">Menu</h2>

      <section
        className="menu-container flex flex-column flex-1 padding-1"
      >
        {
          renderMenuCategories(
            menu, 
            selectedDishes,
            addDish,
            removeDish,
            increaseQuantity
          )
        }
      </section>


      <PageFooter
        left={
          <ButtonText
            text="svuota"
            classes="red-bg primary-contrast-color border-r-10"
            clickHandler={resetContext}
            disabled={isEmpty}
            disabledMessage={`Nessun ingrediente selezionato`}
            tooltip="Rimuove la selezione attuale"
          />
        }
        center={
          <div className="flex flex-center h-100 gap-5">
            Totale: <span>{getTotalPrice().toFixed(2)}</span> €
          </div>
        }
        right={
          <ButtonText
            text="salva"
            classes="primary-bg primary-contrast-color border-r-10"
            disabled={isEmpty}
            disabledMessage={`Nessun ingrediente selezionato`}
            tooltip="Salva la selezione attuale"
            clickHandler={() => setIsSaveOpen(true)}
          />
        }
        classes={'main-bg'}
      />

      {
        isSaveOpen &&
        <SaveSelectionModal
          hideModal={() => setIsSaveOpen(false)}
        />
      }

    </div>
  )
}

function renderMenuCategories(
  menu: MenuConfig,
  selectedDishes: Dish[],
  addDish: (dishId: string) => void,
  removeDish: (dishId: string) => void,
  increaseQuantity: (dishId: string) => void,
) {
  return Object.keys(menu).map(category => {
    const dishes = menu[category].map(
      dish => {
        const _dishId = ingredientNameToId(dish.name);
        const _dish = selectedDishes.find(d => d.id == _dishId);
        return {
          ...dish,
          id: _dishId,
          selected: !!_dish,
          quantity: _dish ? _dish.quantity : 0
        }
      }
    );
    return (
      <DishCategory
        key={category}
        category={category}
        dishes={dishes}
        addDish={addDish}
        removeDish={removeDish}
        increaseQuantity={increaseQuantity}
      />
    )
  })
}