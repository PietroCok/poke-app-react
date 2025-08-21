import React, { useEffect } from "react";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import type { ToastType } from "@/types";

const animationDuration = 1;
const nextDelay = .2;

export interface ToastProps {
  toast: ToastType,
  showNext: () => void
}

// We want to avoid toast element re-render (and animation restart) on context change if the current toast has NOT changed
export const Toast = React.memo(
  _Toast,
  (prevProps, nextProps) => prevProps?.toast.id === nextProps?.toast.id
)

function _Toast({ toast, showNext }: ToastProps) {

  useEffect(() => {
    // Animation out
    const animateOutTimer = setTimeout(() => {
      document.getElementById(`toast-${toast.id}`)?.classList.add('animate-out');
    }, (toast.duration + animationDuration / 2) * 1000)

    // Next toast
    const nextTimer = setTimeout(() => {
      showNext();
    }, (toast.duration + animationDuration + nextDelay) * 1000);

    return () => {
      clearTimeout(animateOutTimer);
      clearTimeout(nextTimer);
    };
  }, [])

  return (
    <div
      id={`toast-${toast.id}`}
      className={`toast-container flex border-r-10 gap-05 ${toast.doAnimate ? 'animate-in' : 'no-animation'}`}
      style={{
        ["--toast-duration" as any]: `${toast.duration + animationDuration / 2}s`,
        ["--toast-color" as any]: `${toast.color}`
      }}
    >

      {
        toast.icon &&
        <div
          className="icon"
        >
          {toast.icon}
        </div>
      }

      <div
        className="toast-message flex align-center"
      >
        {toast.message}
      </div>

      <div
        className="pointer icon"
        onClick={showNext}
      >
        <FontAwesomeIcon
          icon={faX}
        />
      </div>
    </div>
  )
}