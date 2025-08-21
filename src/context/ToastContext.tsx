import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamation, faInfo } from "@fortawesome/free-solid-svg-icons";

import type { ToastContextType, ToastOptions, ToastType } from "@/types";
import { Toast } from "@/components/common/Toast";

const ToastContext = createContext<ToastContextType | null>(null);

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within an ToastProvider');
  return ctx;
};

export interface ToastProviderProps {
  children: React.ReactNode
}

const defaultColor = 'var(--primary-color)';
const defaultDuration = 2
const defaultErrorDuration = 2;
const defaultInfoDuration = 1;
const minToastDuration = 1;

export function ToastProvider({ children }: ToastProviderProps) {
  const [manager, setManager] = useState<{ current: ToastType | null, queue: ToastType[] }>({
    current: null,
    queue: []
  });

  const { current: currentToast } = manager;

  const addToQueue = (toast: ToastType) => {
    setManager(
      prevState => {
        const { current, queue } = prevState;
        if (queue.length == 0 && !current) {
          return {
            current: toast,
            queue: []
          }
        }

        const alreadyQueued = queue.find(t => t.message === toast.message) || current?.message == toast.message;
        if (alreadyQueued) {
          return prevState;
        }

        console.log('Toast added to the queue', toast);

        return {
          current: current,
          queue: [...queue, toast]
        }
      }
    )
  }

  const showNext = useCallback(() => {
    setManager(
      prevState => {
        const { queue } = prevState;
        const [nextToast, ...updatedQueue] = queue;

        return {
          current: nextToast ?? null,
          queue: updatedQueue
        }
      }
    )
  }, [])

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
      id: crypto.randomUUID(),
      message: message,
      color: color,
      duration: Math.max(duration, minToastDuration),
      icon: icon,
      doAnimate: doAnimate
    }

    addToQueue(newToast);
  }, [])

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
        <Toast
          key={currentToast.id}
          toast={currentToast}
          showNext={showNext}
        />
      }
    </ToastContext>
  )
}