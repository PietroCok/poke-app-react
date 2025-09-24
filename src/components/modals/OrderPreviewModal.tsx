
import { useEffect, useRef, useState } from "react";

import { Modal } from "./Modal";
import { ButtonText } from "../common/ButtonText";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import type { DishSelection, Poke } from "@/types";
import { useCart } from "@/context/CartContext";
import { itemToString } from "@/scripts/utils";

export interface OrderPreviewModalProps {
  hideModal: () => void
}

export function OrderPreviewModal({ hideModal }: OrderPreviewModalProps) {
  const [orderName, setOrderName] = useLocalStorage('poke-order-name', '');
  const [orderTime, setOrderTime] = useLocalStorage('poke-order-time', '');
  const [orderTimeMessage, setOrderTimeMessage] = useState('');
  const { cart, getTotalPrice } = useCart();
  const [orderMessage, setOrderMessage] = useState('');
  const messageRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    updateOrderMessage();
  }, [orderName, orderTime, cart]);

  useEffect(() => {
    // Update textarea dimension to match content
    if (CSS.supports('field-sizing', 'content')) {
      return;
    }
    console.log('field-sizing not suppoter -> manual workaround');
    if(messageRef.current){
      messageRef.current.style.height = messageRef.current.scrollHeight + 3 + "px"
    }
  }, [orderMessage])

  const updateOrderMessage = () => {
    const items = Object.values(cart.items || {});
    const newOrderMessage = generateOrderMessage(items, orderName, orderTime);
    setOrderMessage(newOrderMessage)
  }

  const updateTime = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = event.target.value;
    if (!newTime) {
      setOrderTimeMessage('Scegliere un orario per il rititiro prima di procedere')
      return;
    }
    setOrderTimeMessage('');
    setOrderTime(newTime);
  }

  const confirmOrder = () => {
    if (!orderTime) {
      setOrderTimeMessage('Scegliere un orario per il rititiro prima di procedere')
      return;
    }

    window.open(`https://wa.me/?text=${encodeURIComponent(orderMessage)}`);
    hideModal();
  }

  return (
    <Modal
      title="Completa l'ordine"
      hideModal={hideModal}
      autoFocus={true}
      actions={[
        <ButtonText
          key={`confirm`}
          text={`Conferma`}
          classes="primary-bg primary-contrast-color border-r-10"
          tooltip="Salva nei preferiti"
          clickHandler={confirmOrder}
        />,
        <ButtonText
          key={`cancel`}
          text={`Annulla`}
          classes="red main-bg border-r-10"
          tooltip="Annulla"
          clickHandler={hideModal}
        />
      ]}
      actionsClasses="just-between"
      content={
        <div
          id="order-preview-container"
        >
          <div
            className="group"
          >
            <label htmlFor="order-name" className="group-label">Nome</label>
            <input type="text"
              name="order-name"
              id="order-name"
              className="flex-1"
              value={orderName}
              onChange={(event) => setOrderName(event.target.value)}
            />
          </div>

          <div
            className="flex flex-column"
          >
            <div
              className="group"
            >
              <label htmlFor="order-time" className="group-label">Orario</label>
              <input
                type="time"
                name="order-time"
                id="order-time"
                value={orderTime}
                onChange={updateTime}
              />
            </div>
            <div
              id="order-time-error"
              className="error-message"
            >
              {orderTimeMessage}
            </div>
          </div>

          <div
            className="group"
          >
            <span className="group-label">Totale</span>
            <span id="order-price">{getTotalPrice().toFixed(2)} €</span>
          </div>


          <textarea
            ref={messageRef}
            id="order-message"
            value={orderMessage}
            onChange={(event) => setOrderMessage(event.target.value)}
          >
          </textarea>
        </div>
      }
    />
  )
}



function generateOrderMessage(items: (Poke | DishSelection)[], orderName: string, orderTime: string,) {
  let greetings = 'Buongiorno';

  if ((new Date()).getHours() > 14) {
    greetings = 'Buonasera';
  }

  const stringedItems = [];

  for (const [index, item] of Object.entries(items)) {
    stringedItems.push(`${Number(index) + 1}) ${itemToString(item)}`)
  }

  const completeOrderString =
    `${greetings},
vorrei ordinare ${items.length > 1 ? items.length : "una"} poke da asporto per le ${orderTime}${orderName ? " a nome: " + orderName : ""}.

${stringedItems.join('\n\r')}`;

  return completeOrderString;
}