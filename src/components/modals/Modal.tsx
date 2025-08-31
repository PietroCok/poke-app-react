import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export interface ModalPros {
  hideModal?: () => void
  title: string
  actions: React.ReactNode[]
  content: React.ReactNode,
  titleClasses?: string,
  contentClasses?: string,
  actionsClasses?: string,
  autoFocus?: boolean,
  onCancel?: () => void
}

export function Modal({
  hideModal,
  onCancel,
  title,
  titleClasses,
  content,
  contentClasses,
  actions,
  actionsClasses,
  autoFocus,
}: ModalPros) {

  const contentRef = useRef<HTMLDivElement>(null);

  const handleClickOut = (event: React.MouseEvent) => {
    const target = event.target as HTMLDivElement;
    if (target.id === 'save-modal-backdrop') {
      if (onCancel) onCancel();
      if (hideModal) hideModal();
    }
  }

  useEffect(() => {
    if (!autoFocus) return;

    const container = contentRef.current;
    if (container) {
      const firstFocusableChild = container.querySelector<HTMLElement>(
        `button, input, select, textarea, [tabindex]:not([tabindex='-1'])`
      );
      if (firstFocusableChild) firstFocusableChild.focus();
    }
  }, [autoFocus])

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
          {
            title &&
            <h3
              className={`modal-title selectable ${titleClasses ?? ''}`}
            >
              {title}
            </h3>
          }

          {/* CONTENT */}
          <div
            ref={contentRef}
            className={`modal-content selectable ${contentClasses ?? ''}`}
          >
            {content}
          </div>

          {/* ACTIONS */}
          <div
            className={`modal-controls flex gap-1 row-reverse ${actionsClasses ?? ''}`}
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


