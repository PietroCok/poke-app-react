import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faPen, faStar, faTrash } from "@fortawesome/free-solid-svg-icons";

import type { DishSelection, Poke } from "@/types";
import { Item } from "./Item";
import { ButtonIcon } from "./ButtonIcon";
import { usePokeSelection } from "@/context/PokeSelectionContext";
import { useFavorite } from "@/context/FavoriteContext";
import { useMenuSelection } from "@/context/MenuSelectionContext";
import { isDishSelection, isPoke } from "@/scripts/utils";


export interface CartItemProps {
  item: Poke | DishSelection
  disabled?: boolean
  useMemo?: boolean
  deleteItem: (itemId: string, itemName: string) => void
  duplicate: (itemId: string) => void
}

export function CartItem({ item, disabled, deleteItem, duplicate, useMemo = false }: CartItemProps) {
  const { loadItemIntoConfigurator: loadPokeIntoConfigurator } = usePokeSelection();
  const { loadDishesIntoMenu } = useMenuSelection();
  const { addFavorite, hasItem } = useFavorite();

  const loadItemIntoConfigurator = (item: Poke | DishSelection, navigateHome?: boolean) => {
    if (isPoke(item)) {
      return loadPokeIntoConfigurator(item, navigateHome);
    } else if (isDishSelection(item)) {
      return loadDishesIntoMenu(item, navigateHome)
    }
  }

  const isInFavorite = hasItem(item.id);

  return (
    <Item
      item={item}
      disabled={disabled}
      useMemo={useMemo}
      actions={[
        <ButtonIcon
          key={`edit`}
          tooltip="Modifica elemento"
          icon={<FontAwesomeIcon icon={faPen} />}
          classes="small border-r-10 primary-color"
          clickHandler={() => loadItemIntoConfigurator(item, true)}
          disabled={disabled}
          disabledMessage={`Non è possibile modificare l'elemento di un altro utente`}
        />,
        <ButtonIcon
          key={`addCart`}
          tooltip="Aggiungi ai preferiti"
          icon={<FontAwesomeIcon icon={faStar} />}
          classes="small border-r-10 gold"
          disabled={isInFavorite || disabled}
          disabledMessage={isInFavorite ? `Elemento già presente nei preferiti` : `Elemento appartenente ad un altro utente`}
          clickHandler={() => { addFavorite(item) }}
        />,
        <ButtonIcon
          key={`duplicate`}
          tooltip="Duplica elemento"
          icon={<FontAwesomeIcon icon={faCopy} />}
          classes="small border-r-10 primary-color"
          clickHandler={() => { duplicate(item.id) }}
        />,
        <ButtonIcon
          key={`delete`}
          tooltip="Cancella elemento"
          icon={<FontAwesomeIcon icon={faTrash} />}
          classes="small border-r-10 red"
          clickHandler={() => { deleteItem(item.id, item.name) }}
          disabled={disabled}
          disabledMessage={`Non è possibile eliminare l'elemento di un altro utente`}
        />
      ]}
    />
  )
}