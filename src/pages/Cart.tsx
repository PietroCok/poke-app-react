import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-regular-svg-icons";
import { faLink } from "@fortawesome/free-solid-svg-icons";

import type { Cart, Poke } from "../types";
import { ButtonIcon } from "../components/common/ButtonIcon";
import { MainMenu } from "../components/common/MainMenu";
import { PageHeader } from "../components/common/PageHeader";
import { PageFooter } from "../components/common/PageFooter";
import { ButtonText } from "../components/common/ButtonText";
import { Item } from "../components/cart/Item";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const ITEM_MEMO_THRESHOLD = 10;

export function Cart() {
  const { cart, deleteAllItems, deleteItem, duplicateItem } = useCart();
  const { user } = useAuth();

  const userUid = user?.uid || '';

  // console.log(Object.keys(cart.items || {}).length);

  const generateInviteLink = () => {
    alert('Coming soon');
  }

  return (
    <div className="page-container h-100 flex flex-column">
      <PageHeader
        left={
          <ButtonIcon
            icon={<FontAwesomeIcon icon={faHouse} />}
            classes="primary-color border-r-10"
            tooltip="Chiudi"
            linkTo={"/"}
          />
        }
        center={
          <h3
            className="h-100 flex flex-center gap-05 text-center"
          // contentEditable={"plaintext-only"}
          >
            {
              cart.isShared &&
              <FontAwesomeIcon
                icon={faLink}
                title="Carello condiviso"
              />
            }
            <span>
              {cart.name}
            </span>
          </h3>
        }
        right={
          <MainMenu />
        }
        classes="main-bg"
      />


      {
        cart.isShared &&
        <section
          id="invite-link"
          className="text-center"
        >
          <span
            className="fake-link"
            onClick={generateInviteLink}
          >
            Genera link di invito
          </span>
        </section>
      }

      <section
        className="flex flex-column flex-1 padding-1 gap-1 scroll
        "
      >
        {renderItems(cart, userUid, deleteItem, duplicateItem)}
      </section>

      <PageFooter
        left={
          <ButtonText
            text="svuota"
            classes="red-bg primary-contrast-color border-r-10"
            clickHandler={() => deleteAllItems()}
            disabled={(cart.isShared && userUid != cart.createdBy) || Object.keys(cart.items || {}).length == 0}
          />
        }

        right={
          <ButtonText
            text="Preview"
            classes="primary-bg primary-contrast-color border-r-10"
            clickHandler={() => alert('Coming soon!')}
            disabled={(cart.isShared && userUid != cart.createdBy) || Object.keys(cart.items || {}).length == 0}
          />
        }

        classes="main-bg"
      />
    </div>
  )
}

const renderItems = (
  cart: Cart,
  userUid: string,
  deleteItem: (itemId: string, itemName: string) => void,
  duplicateItem: (itemId: string) => void
) => {

  const items = cart.items;
  const itemsCount = Object.keys(items).length;
  
  if (!items || itemsCount == 0) {
    return <span className="flex flex-center h-100">Il carrello è vuoto</span>
  }

  // sort by cart name
  const sortedItems: Poke[] = Object.values(items).sort((itemA: Poke, itemB: Poke) => {
    return itemA.name > itemB.name ? 1 : -1;
  })

  return sortedItems.map(item => {
    return (
      <Item
        key={item.id}
        item={item}
        disabled={item.createdBy != userUid && cart.createdBy != userUid}
        deleteItem={deleteItem}
        duplicateItem={duplicateItem}
        useMemo={itemsCount > ITEM_MEMO_THRESHOLD}
      />
    )
  })
}