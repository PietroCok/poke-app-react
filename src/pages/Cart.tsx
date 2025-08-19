import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-regular-svg-icons";

import type { Cart, Poke } from "../types";
import { ButtonIcon } from "../components/common/ButtonIcon";
import { MainMenu } from "../components/common/MainMenu";
import { PageHeader } from "../components/common/PageHeader";
import { PageFooter } from "../components/common/PageFooter";
import { ButtonText } from "../components/common/ButtonText";
import { Item } from "../components/cart/Item";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useSelection } from "@/context/configurator/SelectionContext";
import { useModal } from "@/context/ModalContext";
import { CartSubHeader } from "@/components/cart/CartSubHeader";
import { CartHeader } from "@/components/cart/CartHeader";

const ITEM_MEMO_THRESHOLD = 10;

export function Cart() {
  const { cart, deleteAllItems, deleteItem, duplicateItem, getItemsCount } = useCart();
  const { loadItemIntoConfigurator } = useSelection();
  const { user } = useAuth();
  const { showAlert } = useModal();

  const userUid = user?.uid || '';
  const itemsCount = getItemsCount();
  const hasItems = itemsCount > 0;
  const isCartOwner = !cart.isShared || userUid === cart.createdBy;

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
          <CartHeader />
        }
        right={
          <MainMenu />
        }
        classes="main-bg"
      />

      <CartSubHeader />

      <section
        className="flex flex-column flex-1 padding-1 gap-1 scroll
        "
      >
        {renderItems(cart, userUid, deleteItem, duplicateItem, loadItemIntoConfigurator)}
      </section>

      <PageFooter
        left={
          <ButtonText
            text="svuota"
            classes="red-bg primary-contrast-color border-r-10"
            clickHandler={() => deleteAllItems()}
            disabled={!isCartOwner || !hasItems}
            disabledMessage={`Operazione consentita solo al creatore del carrello`}
          />
        }

        right={
          <ButtonText
            text="Preview"
            classes="primary-bg primary-contrast-color border-r-10"
            clickHandler={() => showAlert('Coming soon!')}
            disabled={!isCartOwner || !hasItems}
            disabledMessage={`Operazione consentita solo al creatore del carrello`}
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
  duplicateItem: (itemId: string) => void,
  loadItemIntoConfigurator: (item: Poke) => void
) => {

  const items = cart.items || {};
  const itemsCount = Object.keys(items).length;

  if (itemsCount == 0) {
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
        editItem={loadItemIntoConfigurator}
        useMemo={itemsCount > ITEM_MEMO_THRESHOLD}
      />
    )
  })
}