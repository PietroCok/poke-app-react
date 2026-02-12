import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink, faLinkSlash } from "@fortawesome/free-solid-svg-icons";

import type { Cart, DishSelection, Poke } from "../types";
import { MainMenu } from "../components/common/MainMenu";
import { PageHeader } from "../components/common/PageHeader";
import { PageFooter } from "../components/common/PageFooter";
import { ButtonText } from "../components/common/ButtonText";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { CartSubHeader } from "@/components/cart/CartSubHeader";
import { CartHeader } from "@/components/cart/CartHeader";
import { CartItem } from "@/components/common/CartItem";
import { OrderPreviewModal } from "@/components/modals/OrderPreviewModal";
import { ButtonIcon } from "@/components/common/ButtonIcon";
import { useModal } from "@/context/ModalContext";
import { CreateSharedCartModal } from "@/components/modals/CreateSharedCartModal";
import { useToast } from "@/context/ToastContext";

const ITEM_MEMO_THRESHOLD = 10;

export function Cart() {
  const { cart, deleteAllItems, deleteItem, duplicateItem, getItemsCount, unlinkCart } = useCart();
  const { user, isUserActive } = useAuth();
  const [isOrderPreviewOpen, setIsOrderPreviewOpen] = useState(false);
  const [isCreateCartOpen, setIsCreateCartOpen] = useState(false);
  const { showConfirm } = useModal();
  const { showInfo } = useToast();

  const userUid = user?.uid || '';
  const itemsCount = getItemsCount();
  const hasItems = itemsCount > 0;
  const isCartOwner = !cart.isShared || userUid === cart.createdBy;

  const unlinkSharedCart = async () => {
    if (await showConfirm("Scollegare il carrello corrente?")) {
      unlinkCart();
      showInfo("Carrello condiviso scollegato");
    }
  }

  const openSharedCartCreationModal = () => {
    setIsCreateCartOpen(true);
  }

  const onCartShared = () => {
    setIsCreateCartOpen(false);
    showInfo('Il carrello è stato condiviso')
  }

  return (
    <div className="page-container h-100 flex flex-column">
      <PageHeader
        left={
          cart.isShared ?
            <ButtonIcon
              icon={<FontAwesomeIcon icon={faLinkSlash} />}
              classes="red border-r-10"
              tooltip="Scollega carrello"
              clickHandler={() => unlinkSharedCart()}
            />
            :
            <ButtonIcon
              icon={<FontAwesomeIcon icon={faLink} />}
              classes="border-r-10 primary-color"
              tooltip="Nuovo carrello condiviso"
              clickHandler={openSharedCartCreationModal}
              disabled={!isUserActive()}
            disabledMessage={`Operazione disponibile ai soli utenti abilitati`}
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
        {renderItems(cart, userUid, deleteItem, duplicateItem)}
      </section>

      {
        isCreateCartOpen &&
        <CreateSharedCartModal
          setIsOpen={setIsCreateCartOpen}
          linkLocalCart={true}
          callback={() => onCartShared()}
        />
      }

      {
        isOrderPreviewOpen &&
        <OrderPreviewModal
          hideModal={() => setIsOrderPreviewOpen(false)}
        />
      }

      <PageFooter
        left={
          <ButtonText
            text="svuota"
            classes="red-bg primary-contrast-color border-r-10"
            clickHandler={() => deleteAllItems()}
            disabled={!isCartOwner || !hasItems}
            disabledMessage={
              !isCartOwner ?
                `Operazione consentita solo al creatore del carrello`
                :
                `Il carrello è vuoto`
            }
          />
        }

        right={
          <ButtonText
            text="Preview"
            classes="primary-bg primary-contrast-color border-r-10"
            clickHandler={() => { setIsOrderPreviewOpen(true) }}
            disabled={!isCartOwner || !hasItems}
            disabledMessage={
              !isCartOwner ?
                `Operazione consentita solo al creatore del carrello`
                :
                `Il carrello è vuoto`
            }
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
) => {

  const items = cart.items || {};
  const itemsCount = Object.keys(items).length;

  if (itemsCount == 0) {
    return <span className="flex flex-center h-100">Il carrello è vuoto</span>
  }

  // sort by cart name
  const sortedItems: (Poke | DishSelection)[] = Object.values(items).sort((itemA: Poke | DishSelection, itemB: Poke | DishSelection) => {
    return itemA.name > itemB.name ? 1 : -1;
  })

  return sortedItems.map(item => {
    return (
      <CartItem
        key={item.id}
        item={item}
        disabled={item.createdBy != userUid && cart.createdBy != userUid}
        useMemo={itemsCount > ITEM_MEMO_THRESHOLD}
        duplicate={duplicateItem}
        deleteItem={deleteItem}
      />
    )
  })
}