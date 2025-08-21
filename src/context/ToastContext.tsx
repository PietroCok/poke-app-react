import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamation, faInfo, faX } from "@fortawesome/free-solid-svg-icons";

import type { ToastContextType, ToastOptions } from "@/types";

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
  icon?: React.ReactNode
  doAnimate?: boolean
}

export interface ToastProviderProps {
  children: React.ReactNode
}

const defaultColor = 'var(--primary-color)';
const defaultDuration = 2
const defaultErrorDuration = 2;
const defaultInfoDuration = 1;
const delay = .5;
const animationDuration = .5 + .5;
const minToastDuration = 1;

export function ToastProvider({ children }: ToastProviderProps) {
  const [currentToast, setCurrentToast] = useState<Toast | null>(null);
  const [toastsQueue, setToastsQueue] = useState<Toast[]>([]);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (currentToast) {
      timer = setTimeout(showNextToast, (currentToast.duration + (currentToast.doAnimate ? animationDuration : 0)) * 1000);
      if (currentToast.doAnimate) {
        setTimeout(() => {
          document.querySelector('.toast-container')?.classList.add('animate-out');
        }, currentToast.duration * 1000)
      }
    }
    return () => clearTimeout(timer);
  }, [currentToast]);

  const addToastToQueue = (toast: Toast) => {
    setToastsQueue(
      prevState => {
        // Add only one of the same message to the queue
        const alreadyQueued = prevState.find(t => t.message == toast.message) || currentToast?.message == toast.message;
        if (alreadyQueued) return prevState;

        console.log('Toast added to queue', toast);
        return [
          ...prevState,
          toast
        ]
      }
    )
  }

  const showError = useCallback((
    message: string,
    options?: ToastOptions
  ) => {
    showToast(
      message,
      {
        duration: defaultErrorDuration,
        color: 'var(--accent-red)',
        icon: <FontAwesomeIcon icon={faExclamation} className="red circle" />,
        ...options
      });
  }, [])

  const showInfo = useCallback((
    message: string,
    options?: ToastOptions
  ) => {
    showToast(
      message,
      {
        duration: defaultInfoDuration,
        color: 'var(--primary-color)',
        icon: <FontAwesomeIcon icon={faInfo} className="primary-color circle" />,
        ...options
      }
    );
  }, [])

  const showToast = useCallback((
    message: string,
    {
      color = defaultColor,
      duration = defaultDuration,
      icon = null,
      doAnimate = true
    }: ToastOptions = {}
  ) => {
    const newToast = {
      message: message,
      color: color,
      duration: Math.max(duration, minToastDuration),
      icon: icon,
      doAnimate: doAnimate
    }

    if (currentToast || toastsQueue.length > 0) {
      addToastToQueue(newToast);
      return;
    }

    setCurrentToast(newToast)
  }, [])

  const showNextToast = () => {
    setToastsQueue(prevState => {
      if (prevState.length == 0) {
        console.log('No more toasts to show');
        setCurrentToast(null);
        return prevState;
      };

      const [nextToast, ...others] = prevState;

      setTimeout(() => {
        console.log(`Showing toast (${others.length} left)`, nextToast);
        setCurrentToast(nextToast);
      }, delay * 1000);

      return others;
    })
  }

  const contextValue = useMemo(() => ({
    showToast: (message: string, options?: ToastOptions) => showToast(message, options),
    showInfo: (message: string, options?: ToastOptions) => showInfo(message, options),
    showError: (message: string, options?: ToastOptions) => showError(message, options)
  }), [])

  return (
    <ToastContext
      value={contextValue}
    >
      {children}
      {
        currentToast &&
        <div
          className={`toast-container flex border-r-10 gap-05 ${currentToast.doAnimate ? 'animate-in' : 'no-animation'}`}
          style={{
            ["--toast-duration" as any]: `${currentToast.duration}s`,
            ["--toast-color" as any]: `${currentToast.color}`
          }}
        >

          {
            currentToast.icon &&
            <div
              className="icon"
              onClick={showNextToast}
            >
              {currentToast.icon}
            </div>
          }

          <div
            className="toast-message flex align-center"
          >
            {currentToast.message}
          </div>

          <div
            className="pointer icon"
            onClick={showNextToast}
          >
            <FontAwesomeIcon
              icon={faX}
            />
          </div>
        </div>
      }
    </ToastContext>
  )
}