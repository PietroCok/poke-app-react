import React from "react";
import { createContext, useCallback, useContext, useMemo, useState } from "react";

import { ButtonText } from "@/components/common/ButtonText";
import { Modal } from "@/components/modals/Modal";
import type { ModalContextType, ModalType } from "@/types";

const ModalContext = createContext<ModalContextType | null>(null);

export const useModal = () => {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error('useModal must be used within an ModalProvider');
  return ctx;
};

export interface ModalProviderProps {
  children: React.ReactNode
}

export function ModalProvider({ children }: ModalProviderProps) {
  const [modalProps, setModalProps] = useState<ModalType | null>(null);

  const showModal = useCallback(({ type, title, content, actions, onCancel }: ModalType) => {
    setModalProps({ type, title, content, actions, onCancel });
  }, []);

  const hideModal = useCallback(() => {
    setModalProps(null);
  }, []);

  const showAlert = useCallback((message: string, title?: string) => showModal({
    type: 'alert',
    title: title ?? 'Poke App',
    content: message,
    actions: [
      <ButtonText
        key='ok'
        text="ok"
        classes="primary-bg primary-contrast-color border-r-10 medium"
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
            text="ok"
            classes="primary-bg primary-contrast-color border-r-10 medium"
            clickHandler={() => {
              hideModal();
              resolve(true);
            }}
          />,
          <ButtonText
            key='cancel'
            text="annulla"
            classes="red-bg primary-contrast-color border-r-10 medium"
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
    hideModal,
  }), [showModal, showAlert, showConfirm, hideModal]);

  return (
    <ModalContext.Provider
      value={staticContextValue}
    >
      {children}
      {
        modalProps &&
        <Modal
          hideModal={hideModal}
          title={modalProps.title}
          content={modalProps.content}
          actions={modalProps?.actions || []}
          onCancel={modalProps?.onCancel}
        />
      }
    </ModalContext.Provider>
  )
}



