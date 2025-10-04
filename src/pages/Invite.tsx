import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { ButtonText } from "@/components/common/ButtonText";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { PageFooter } from "@/components/common/PageFooter";
import { PageHeader } from "@/components/common/PageHeader";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { addCartUser, getCart, hasCartUser } from "@/firebase/db";
import { useToast } from "@/context/ToastContext";

export interface InviteProps {

}

export function Invite({ }: InviteProps) {
  const [loading, setLoading] = useState(false);
  const [alreadyInvited, setAlreadyInvited] = useState(false);
  const { user } = useAuth();
  const { cartId, cartName } = useParams();
  const { updateCart } = useCart();
  const { showError } = useToast();
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
      showError(`Ops, qualcosa è andato storto durante la registrazione del carrello condiviso.`);
      setLoading(false);
      return;
    }

    loadAndGo(cartId);
  }

  const loadCart = async (cartId: string) => {
    const cart = await getCart(cartId);
    if (!cart) {
      showError(`Ops, qualcosa è andato storto durante il recupero del carello condiviso`);
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

      <PageHeader />

      {
        loading ?
          <LoadingSpinner
            radius={30}
            duration={2}
            color={`var(--primary-color)`}
          />
          :
          <section
            className="flex flex-center flex-column gap-2 flex-1 scroll text-center padding-1"
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
