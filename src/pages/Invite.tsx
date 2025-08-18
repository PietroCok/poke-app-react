import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { faHouse } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { ButtonIcon } from "@/components/common/ButtonIcon";
import { ButtonText } from "@/components/common/ButtonText";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { PageFooter } from "@/components/common/PageFooter";
import { PageHeader } from "@/components/common/PageHeader";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { addCartUser, getCart, hasCartUser } from "@/firebase/db";
import { useModal } from "@/context/ModalContext";

export interface InviteProps {

}

export function Invite({ }: InviteProps) {
  const [loading, setLoading] = useState(false);
  const [alreadyInvited, setAlreadyInvited] = useState(false);
  const { user } = useAuth();
  const { cartId, cartName } = useParams();
  const { updateCart } = useCart();
  const { showAlert } = useModal();
  const navigate = useNavigate();

  const userUid = user?.uid || '';

  // Should never happen
  if (!cartId || !cartName) {
    return <div>Invalid link</div>;
  }

  useEffect(() => {
    setLoading(true);

    // Checks if user has already registered the cart
    const checkAlreadyRegistered = async () => {
      if (await hasCartUser(cartId, userUid)) {
        setAlreadyInvited(true);
      }
      setLoading(false);
    }

    checkAlreadyRegistered();
  }, []);

  const registerCart = async () => {
    setLoading(true);
    if (!await addCartUser(cartId, userUid)) {
      showAlert(`Ops, qualcosa è andato storto...`);
      setLoading(false);
      return;
    }

    loadAndGo(cartId);
  }

  const loadCart = async (cartId: string) => {
    const cart = await getCart(cartId);
    if (!cart) {
      showAlert(`Ops, qualcosa è andato storto...`);
      setLoading(false);
      return false;;
    }

    updateCart(cart);
    return true;
  }

  const loadAndGo = async (cartId: string) => {
    if(await loadCart(cartId)){
      navigate('/cart', {replace: true});
    }
  }

  return (
    <div className="page-container h-100 flex flex-column">

      <PageHeader
        left={
          <ButtonIcon
            icon={<FontAwesomeIcon icon={faHouse} />}
            classes="primary-color border-r-10"
            linkTo="/"
          />
        }
      />

      {
        loading ?
          <LoadingSpinner
            radius={30}
            duration={2}
            color={`var(--primary-color)`}
          />
          :
          <section
            className="flex flex-center flex-column gap-2 flex-1 scroll  text-center"
          >
            {
              alreadyInvited ?
                <>
                  <p>Il carrello <strong>{cartName}</strong> è già registrato tra quelli disponibili</p>
                  <ButtonText
                    text="vai al carrello"
                    classes="border-r-10 primary-bg primary-contrast-color w-fit"
                    clickHandler={() => loadAndGo(cartId)}
                  />
                </>
                :
                <>
                  Sei stato invitato ad unirti al carrello condiviso: <strong>{cartName}</strong>
                </>
            }
          </section>
      }

      <PageFooter
        classes="main-bg"
        left={
          <ButtonText
            text="rifiuta"
            classes="border-r-10 red-bg primary-contrast-color"
            linkTo="/"
            disabled={alreadyInvited}
          />
        }
        right={
          <ButtonText
            text="accetta"
            classes="border-r-10 primary-bg primary-contrast-color"
            clickHandler={registerCart}
            disabled={alreadyInvited}
          />
        }
      />

    </div>
  )
}
