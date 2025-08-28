import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowsRotate, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";

import type { Cart } from "@/types";
import { getCarts } from "@/firebase/db";
import { ButtonIcon } from "@/components/common/ButtonIcon";
import { PageHeader } from "@/components/common/PageHeader";
import { MainMenu } from "@/components/common/MainMenu";
import { PageFooter } from "@/components/common/PageFooter";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { useModal } from "@/context/ModalContext";
import { CreateSharedCartModal } from "@/components/modals/CreateSharedCartModal";
import { useToast } from "@/context/ToastContext";
import { SharedCart } from "@/components/cart/SharedCart";


export interface SharedCartsProps {

}

export function SharedCarts({ }: SharedCartsProps) {
  const navigate = useNavigate();
  const { user, isUserActive } = useAuth();
  const { cart, updateCart, unlinkCart, deleteCart, deleteCarts } = useCart();
  const [carts, setCarts] = useState<Cart[]>([]);
  const [loading, setLoading] = useState(false);
  const [isCreateCartOpen, setIsCreateCartOpen] = useState(false);
  const { showConfirm } = useModal();
  const { showInfo } = useToast();

  useEffect(() => {
    reloadSharedCarts();
  }, []);

  const reloadSharedCarts = async () => {
    if (!user) return;
    if (loading) return;

    setLoading(true);
    const sharedCarts = await getCarts(user.uid);
    if (sharedCarts) {
      setCarts(sharedCarts);
    }
    console.log(sharedCarts);

    setLoading(false);
  }

  const loadCartAsActive = (cartId: string) => {
    const newCart = carts.find(cart => cart.id == cartId);
    if (!newCart) return;

    updateCart(newCart);

    showInfo(`Caricato il carrello condiviso: ${newCart.name}`)

    navigate('/cart');
  }

  const deleteSharedCart = async (cart: Cart, cartName: string) => {
    if (!await showConfirm(`Eliminare il carrello ${cartName}?`)) {
      return;
    }

    if (await deleteCart(cart)) {
      reloadSharedCarts();
    }
  }

  const unlinkSharedCart = () => {
    unlinkCart();
  }

  const deleteAllSharedCarts = async () => {
    if (!user?.uid) return;

    if (!await showConfirm(`Eliminare/Scollegare definitivamente TUTTI i carrelli condivisi?`)) {
      return;
    }

    if (await deleteCarts(carts)) {
      reloadSharedCarts();
    }
  }

  const openSharedCartCreationModal = () => {
    setIsCreateCartOpen(true);
  }

  return (
    <div className="page-container h-100 flex flex-column">
      <PageHeader
        left={
          <ButtonIcon
            icon={<FontAwesomeIcon icon={faArrowLeft} />}
            classes="primary-color border-r-10"
            tooltip="Indietro"
            clickHandler={() => navigate(-1)}
          />
        }
        center={
          <h3 className="h-100 flex flex-center text-center">
            Carrelli condivisi
          </h3>
        }
        right={
          <MainMenu />
        }
        classes="main-bg"
      />

      {
        isCreateCartOpen &&
        <CreateSharedCartModal
          setIsOpen={setIsCreateCartOpen}
        />
      }

      {
        loading ?
          <LoadingSpinner
            radius={30}
            duration={2}
            color={`var(--primary-color)`}
          />
          :
          <section
            id="shared-cart-list"
            className="flex-1 flex flex-column gap-1 padding-1 scroll"
          >
            {
              carts.length > 0 ?
                renderSharedCartList(carts, cart.id, deleteSharedCart, loadCartAsActive, unlinkSharedCart)
                :
                <span
                  className="flex flex-center h-100"
                >
                  Nessun carrello condiviso trovato
                </span>
            }
          </section>
      }

      <PageFooter
        classes="main-bg"
        left={
          <ButtonIcon
            icon={<FontAwesomeIcon icon={faTrash} />}
            classes="border-r-10 red"
            tooltip="Cancella tutti i carrelli considivi"
            clickHandler={deleteAllSharedCarts}
            disabled={carts.length == 0}
            disabledMessage={`Nessun carrello da eliminare`}
          />
        }
        center={
          <ButtonIcon
            icon={<FontAwesomeIcon icon={faPlus} />}
            classes="border-r-10 primary-color"
            tooltip="Nuovo carrello condiviso"
            clickHandler={openSharedCartCreationModal}
            disabled={!isUserActive()}
            disabledMessage={`Operazione disponibile ai soli utenti abilitati`}
          />
        }
        right={
          <ButtonIcon
            icon={<FontAwesomeIcon icon={faArrowsRotate} />}
            classes="border-r-10 primary-color"
            tooltip="Ricarica"
            clickHandler={reloadSharedCarts}
          />
        }
      />
    </div>
  )
}


const renderSharedCartList = (
  carts: Cart[],
  activeCartId: string,
  deleteSharedCart: (cart: Cart, cartName: string) => void,
  loadCartAsActive: (cartId: string) => void,
  unlinkSharedCart: () => void
) => {

  // sort carts by most recent
  const sortedCarts = carts.sort((cartA: Cart, cartB: Cart) => {
    // If createdAt field is missing we use an empty string
    // This should push the record as the first (chronologically)
    return (cartA.createdAt ?? '') < (cartB.createdAt ?? '') ? 1 : -1;
  });

  return sortedCarts.map((cart) => {
    return (
      <SharedCart
        key={cart.id}
        cart={cart}
        deleteSharedCart={deleteSharedCart}
        unlinkSharedCart={unlinkSharedCart}
        loadCartAsActive={loadCartAsActive}
        activeCartId={activeCartId}
      />
    )
  })
}