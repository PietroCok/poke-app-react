import { faCopy, faPen, faShoppingCart, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import type { Poke } from "@/types";
import { ButtonIcon } from "./ButtonIcon";
import { Item } from "./Item";
import { usePokeSelection } from "@/context/PokeSelectionContext";
import { useCart } from "@/context/CartContext";

export interface FavoriteItemProps {
  item: Poke
  deleteItem: (itemId: string, itemName: string) => void
  duplicate: (itemId: string) => void
  useMemo?: boolean
 }

export function FavoriteItem({ item, deleteItem, duplicate, useMemo = false }: FavoriteItemProps) {
  const { loadItemIntoConfigurator } = usePokeSelection();
  const { addItem: addCart, hasItem } = useCart();

  const isInCart = hasItem(item.id);

  return (
    <Item
      item={item}
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
          tooltip="Aggiungi al carrello"
          icon={<FontAwesomeIcon icon={faShoppingCart} />}
          classes="small border-r-10 gold"
          disabled={isInCart}
          disabledMessage={`Elemento già presente nel carrello`}
          clickHandler={() => {addCart(item)}}
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