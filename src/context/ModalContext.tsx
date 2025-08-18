import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { createPortal } from "react-dom";

import { ButtonText } from "@/components/common/ButtonText";
import { Modal } from "@/components/common/Modal";

export type Modal = {
  type: 'alert' | 'confirm' | 'custom',
  title: string,
  content: React.ReactNode,
  actions?: React.ReactNode[],
  onCancel?: () => void
}

export type ModalContext = {
  showModal: (modalProps: Modal) => void
  showAlert: (message: string, title?: string) => void
  showConfirm: (message: string, title?: string) => Promise<boolean>
  hideModal: () => void
}

const ModalContext = createContext<ModalContext | null>(null);

export const useModal = () => {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error('useModal must be used within an ModalProvider');
  return ctx;
};

export interface ModalProviderProps {
  children: React.ReactNode
}

export function ModalProvider({ children }: ModalProviderProps) {
  const [modalProps, setModalProps] = useState<Modal | null>(null);

  const showModal = useCallback(({ type, title, content, actions, onCancel }: Modal) => {
    setModalProps({ type, title, content, actions, onCancel });
  }, []);

  const hideModal = useCallback(() => {
    setModalProps(null)
  }, []);

  const showAlert = useCallback((message: string, title?: string) => showModal({
    type: 'alert',
    title: title ?? 'Poke App',
    content: message,
    actions: [
      <ButtonText
        key='ok'
        text="OK"
        classes="primary-bg primary-contrast-color border-r-10"
        clickHandler={hideModal}
      />
    ]
  }), [showModal, hideModal])

  const showConfirm = useCallback(async (message: string, title?: string) => {
    return await new Promise<boolean>((resolve, _) => {
      showModal({
        type: 'confirm',
        title: title ?? 'Poke App',
        content: message,
        onCancel: () => resolve(false),
        actions: [
          <ButtonText
            key='ok'
            text="OK"
            classes="primary-bg primary-contrast-color border-r-10"
            clickHandler={() => {
              hideModal();
              resolve(true);
            }}
          />,
          <ButtonText
            key='cancel'
            text="Cancel"
            classes="red-bg primary-contrast-color border-r-10"
            clickHandler={() => {
              hideModal();
              resolve(false);
            }}
          />
        ]
      })
    })
  }, [showModal, hideModal])

  // Avoids children re-render on function calls,
  // if the function references does not change (useMemo stabilizes them) context does not change
  const staticContextValue = useMemo(() => ({
    showModal,
    showAlert,
    showConfirm,
    hideModal
  }), [showModal, showAlert, showConfirm, hideModal]);

  return (
    <ModalContext.Provider
      value={staticContextValue}
    >
      {children}
      {modalProps &&
        createPortal(
          <Modal
            hideModal={hideModal}
            title={modalProps.title}
            content={modalProps.content}
            actions={modalProps?.actions || []}
            onCancel={modalProps?.onCancel}
          />,
          document.body
        )
      }
    </ModalContext.Provider>
  )
}



