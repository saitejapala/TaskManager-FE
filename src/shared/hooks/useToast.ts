import { useEffect, useState } from 'react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastItem {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}

type ToastCallback = (toast: ToastItem) => void;
const listeners = new Set<ToastCallback>();

export const toast = {
  show: (message: string, type: ToastType = 'info', duration = 4000) => {
    const id = Math.random().toString(36).substring(2, 9);
    listeners.forEach((listener) => {
      try {
        listener({ id, message, type, duration });
      } catch (e) {
        console.error('Error triggering toast listener', e);
      }
    });
  },
  success: (message: string, duration = 4000) => toast.show(message, 'success', duration),
  error: (message: string, duration = 4000) => toast.show(message, 'error', duration),
  warning: (message: string, duration = 4000) => toast.show(message, 'warning', duration),
  info: (message: string, duration = 4000) => toast.show(message, 'info', duration),
};

export const useToast = () => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  useEffect(() => {
    const handleToast = (newToast: ToastItem) => {
      setToasts((prev) => [...prev, newToast]);
      
      const timer = setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== newToast.id));
      }, newToast.duration || 4000);
      
      return () => clearTimeout(timer);
    };

    listeners.add(handleToast);
    return () => {
      listeners.delete(handleToast);
    };
  }, []);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return { toasts, removeToast };
};
