import { createPortal } from "react-dom";

export interface ModalPros {
  hideModal?: () => void
  title: string
  actions: React.ReactNode[]
  content: React.ReactNode,
  onCancel?: () => void
}

export function Modal({ hideModal, onCancel, title, content, actions }: ModalPros) {

  const handleClickOut = (event: React.MouseEvent) => {
    const target = event.target as HTMLDivElement;
    if (target.id === 'save-modal-backdrop') {
      if(onCancel) onCancel();
      if(hideModal) hideModal();
    }
  }

  return (
    createPortal(
      <div
        id="save-modal-backdrop"
        className="modal-backdrop"
        onClick={handleClickOut}
      >
        <div
          className="modal-container"
        >
          {/* TITLE */}
          <h3 
            className="modal-title text-center selectable"
          >
            {title}
          </h3>

          {/* CONTENT */}
          <div
            className="modal-content text-center selectable"
          >
            {content}
          </div>

          {/* ACTIONS */}
          <div
            className="modal-controls flex just-between row-reverse"
          >
            {actions}
          </div>

        </div>
      </div>
      ,
      document.body
    )
  )
}


