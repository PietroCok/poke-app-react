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
import { faLink } from "@fortawesome/free-solid-svg-icons";


export function Cart() {
  const { cart, deleteAllItems } = useCart();
  const { user } = useAuth();

  const userUid = user?.uid || '';

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
        {renderItems(cart, userUid)}
      </section>

      <PageFooter
        left={
          <ButtonText
            text="svuota"
            classes="red-bg primary-contrast-color border-r-10"
            clickHandler={() => deleteAllItems()}
            disabled={userUid != cart.createdBy || Object.keys(cart.items || {}).length == 0}
          />
        }

        right={
          <ButtonText
            text="Preview"
            classes="primary-bg primary-contrast-color border-r-10"
            clickHandler={() => alert('Coming soon!')}
            disabled={userUid != cart.createdBy || Object.keys(cart.items || {}).length == 0}
          />
        }

        classes="main-bg"
      />
    </div>
  )
}

const renderItems = (cart: Cart, userUid: string) => {
  const items = cart.items;
  if (!items || Object.keys(items).length == 0) {
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
      />
    )
  })
}