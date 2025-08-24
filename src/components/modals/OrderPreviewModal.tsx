
import { useEffect, useRef, useState } from "react";

import { Modal } from "./Modal";
import { ButtonText } from "../common/ButtonText";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import type { Poke } from "@/types";
import { useCart } from "@/context/CartContext";

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
          classes="red-bg primary-contrast-color border-r-10"
          tooltip="Annulla"
          clickHandler={hideModal}
        />
      ]}
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
            <span id="order-price">{getTotalPrice().toFixed(2)}</span>
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



function generateOrderMessage(items: Poke[], orderName: string, orderTime: string,) {
  let greetings = 'Buongiorno';

  if ((new Date()).getHours() > 14) {
    greetings = 'Buonasera';
  }

  let itemOrderString = '';

  for (const [index, item] of Object.entries(items)) {
    let singleItemString = ''
    singleItemString += `${Number(index) + 1}) ${item.size.toUpperCase()}: `;

    for (const elements of Object.values(item.ingredients)) {
      for (const element of elements) {
        singleItemString += element.id.replaceAll("-", " ").replaceAll("--", "'") + (element.quantity > 1 ? " x" + element.quantity : "") + ", ";
      }
    }
    // rimozione ultima virgola
    singleItemString = singleItemString.slice(0, singleItemString.length - 2);

    singleItemString += '\n\r';

    itemOrderString += singleItemString;
  }

  const completeOrderString =
    `${greetings},
vorrei ordinare ${items.length > 1 ? items.length : "una"} poke da asporto per le ${orderTime}${orderName ? " a nome: " + orderName : ""}.

${itemOrderString}`;

  return completeOrderString;
}