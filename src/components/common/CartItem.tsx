import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faPen, faStar, faTrash } from "@fortawesome/free-solid-svg-icons";

import type { Poke } from "@/types";
import { Item } from "./Item";
import { ButtonIcon } from "./ButtonIcon";
import { useSelection } from "@/context/configurator/SelectionContext";
import { useFavorite } from "@/context/FavoriteContext";


export interface CartItemProps {
  item: Poke
  disabled?: boolean
  useMemo?: boolean
  deleteItem: (itemId: string, itemName: string) => void
  duplicate: (itemId: string) => void
 }

export function CartItem({ item, disabled, deleteItem, duplicate, useMemo = false }: CartItemProps) {
  const { loadItemIntoConfigurator } = useSelection();
  const { addFavorite, hasItem } = useFavorite();

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
        />,
        <ButtonIcon
          key={`addCart`}
          tooltip="Aggiungi ai preferiti"
          icon={<FontAwesomeIcon icon={faStar} />}
          classes="small border-r-10 gold"
          disabled={isInFavorite}
          disabledMessage={`Elemento già presente nei preferiti`}
          clickHandler={() => {addFavorite(item)}}
        />,
        <ButtonIcon
          key={`duplicate`}
          tooltip="Duplica elemento"
          icon={<FontAwesomeIcon icon={faCopy} />}
          classes="small border-r-10 primary-color"
          clickHandler={() => {duplicate(item.id)}}
        />,
        <ButtonIcon
          key={`delete`}
          tooltip="Cancella elemento"
          icon={<FontAwesomeIcon icon={faTrash} />}
          classes="small border-r-10 red"
          clickHandler={() => {deleteItem(item.id, item.name)}}
        />
      ]}
    />
  )
}