import { createContext, useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

import { ButtonIcon } from "@/components/common/ButtonIcon";
import type { ToastContextType } from "@/types";

const ToastContext = createContext<ToastContextType | null>(null);

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within an ToastProvider');
  return ctx;
};

type Toast = {
  message: string,
  color: string,
  duration: number
}

export interface ToastProviderProps {
  children: React.ReactNode
}

const defaultColor = 'var(--primary-color)';
const defaultDuration = 2
const defaultErrorDuration = 2;
const defaultInfoDuration = 1;
const delay = .5;

export function ToastProvider({ children }: ToastProviderProps) {
  const [currentToast, setCurrentToast] = useState<Toast | null>(null);
  const [toastsQueue, setToastsQueue] = useState<Toast[]>([]);


  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (currentToast) {
      timer = setTimeout(showNextToast, currentToast.duration * 1000);
    }
    return () => clearTimeout(timer);
  }, [currentToast]);

  const addToastToQueue = (toast: Toast) => {
    setToastsQueue(
      prevState => {
        // Add only one of the same message to the queue
        const alreadyQueued = prevState.find(t => t.message == toast.message) || currentToast?.message == toast.message;
        if(alreadyQueued) return prevState;

        console.log('Toast added to queue', toast);
        return [
          ...prevState,
          toast
        ]
      }
    )
  }

  const showError = (message: string, duration = defaultErrorDuration) => {
    showToast(message, 'var(--accent-red)', duration);
  }

  const showInfo = (message: string, duration = defaultInfoDuration) => {
    showToast(message, 'var(--accent-green)', duration);
  }

  const showToast = (message: string, color?: string, duration?: number) => {
    const newToast = {
      message: message,
      color: color || defaultColor,
      duration: duration || defaultDuration
    }

    if (currentToast || toastsQueue.length > 0) {
      addToastToQueue(newToast);
      return;
    }

    setCurrentToast(newToast)
  }

  const showNextToast = () => {
    setToastsQueue(prevState => {
      if (prevState.length == 0) {
        console.log('No more toasts to show');
        setCurrentToast(null);
        return prevState;
      };

      const [nextToast, ...others] = prevState;

      setCurrentToast(null);
      setTimeout(() => {
        console.log(`Showing toast (${others.length} left)`, nextToast);
        setCurrentToast(nextToast);
      }, delay * 1000);

      return others;
    })
  }

  return (
    <ToastContext
      value={{
        showToast,
        showInfo,
        showError
      }}
    >
      {children}
      {
        currentToast &&
        <div
          className="toast-container flex align-center gap-1 border-r-10"
          style={{
            color: currentToast.color,
            borderColor: currentToast.color,
            ["--toast-duration" as any]: `${currentToast.duration}s`,
            ["--toast-color" as any]: `${currentToast.color}`
          }}
        >
          <div
            className="toast-message text-center"
          >
            {currentToast.message}
          </div>

          <ButtonIcon
            icon={<FontAwesomeIcon icon={faX} />}
            classes="border-r-10 red small"
            clickHandler={showNextToast}
          />
        </div>
      }
    </ToastContext>
  )
}