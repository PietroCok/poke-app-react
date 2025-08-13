import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-regular-svg-icons";

import type { Poke } from "@/types";
import { ButtonIcon } from "../components/common/ButtonIcon";
import { MainMenu } from "../components/common/MainMenu";
import { PageHeader } from "../components/common/PageHeader";
import { PageFooter } from "../components/common/PageFooter";
import { ButtonText } from "../components/common/ButtonText";
import { Item } from "../components/cart/Item";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";


export function Cart() {
  const { user } = useAuth();
  const { cart } = useCart();

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
            className="h-100 flex flex-center text-center"
          // contentEditable={"plaintext-only"}
          >
            {cart.name}
          </h3>
        }
        right={
          <MainMenu />
        }
        classes="main-bg"
      />

      {
        user &&
        <section
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
        className="flex-1 padding-1"
      >
        {renderItems(cart.items)}
      </section>

      <PageFooter
        left={
          <ButtonText
            text="svuota"
            classes="red-bg primary-contrast-color border-r-10"
            clickHandler={() => alert('Coming soon!')}
          />
        }

        right={
          <ButtonText
            text="Preview"
            classes="primary-bg primary-contrast-color border-r-10"
            clickHandler={() => alert('Coming soon!')}
          />
        }
      />
    </div>
  )
}

const renderItems = (items: { [id: string]: Poke }) => {
  if (Object.keys(items).length == 0) {
    return <span className="flex flex-center h-100">Il carrello è vuoto</span>
  }

  return Object.entries(items).map(entry => {
    const [_, item] = entry;
    return (
      <Item
        item={item}
      />
    )
  })
}