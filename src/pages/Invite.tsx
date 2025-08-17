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

export interface InviteProps {

}

export function Invite({ }: InviteProps) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const { cartId, cartName } = useParams();
  const { updateCart } = useCart();
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
        await loadCart(cartId);
        console.log('User already registered to cart, loading cart and redirecting to cart page...');
        navigate("/cart", { replace: true });
        setLoading(false);
      }
      setLoading(false);
    }

    checkAlreadyRegistered();
  }, []);


  const registerCart = async () => {
    setLoading(true);
    if (!await addCartUser(cartId, userUid)) {
      alert(`Ops, qualcosa è andato storto...`);
      setLoading(false);
      return;
    }

    await loadCart(cartId);

    navigate("/cart");
    setLoading(false);
  }

  const loadCart = async (cartId: string) => {
    const cart = await getCart(cartId);
    if (!cart) {
      alert(`Ops, qualcosa è andato storto...`);
      setLoading(false);
      return;
    }

    updateCart(cart);
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
            className="flex-1 scroll"
          >
            Sei stato invitato ad unirti al carrello condiviso: {cartName}
          </section>
      }

      <PageFooter
        classes="main-bg"
        left={
          <ButtonText
            text="rifiuta"
            classes="border-r-10 red-bg primary-contrast-color"
            linkTo="/"
          />
        }
        right={
          <ButtonText
            text="accetta"
            classes="border-r-10 primary-bg primary-contrast-color"
            clickHandler={registerCart}
          />
        }
      />

    </div>
  )
}