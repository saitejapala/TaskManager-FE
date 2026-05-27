import React from 'react';
import { X, CheckCircle2, AlertCircle, AlertTriangle, Info } from 'lucide-react';
import { cn } from '@utils/cn';
import { useToast, ToastItem } from '@shared/hooks/useToast';

interface ToastProps {
  toast: ToastItem;
  onClose: (id: string) => void;
}

export const ToastItemComponent: React.FC<ToastProps> = ({ toast, onClose }) => {
  const { id, message, type } = toast;

  const icons = {
    success: <CheckCircle2 className="h-5 w-5 text-success" />,
    error: <AlertCircle className="h-5 w-5 text-error" />,
    warning: <AlertTriangle className="h-5 w-5 text-warning" />,
    info: <Info className="h-5 w-5 text-primary" />,
  };

  const borderColors = {
    success: 'border-success',
    error: 'border-error',
    warning: 'border-warning',
    info: 'border-primary',
  };

  return (
    <div
      className={cn(
        // Flat styling rules: rounded-[10px], border, surface bg, px-4, h-14/flex, no shadows
        'flex items-center justify-between gap-3 p-4 bg-surface border rounded-[10px] min-w-[300px] max-w-sm',
        'animate-in slide-in-from-right-5 duration-[250ms] ease-out',
        borderColors[type] || 'border-border'
      )}
    >
      <div className="flex items-center gap-3">
        <span className="flex-shrink-0">{icons[type]}</span>
        <span className="text-xs font-semibold text-text tracking-wide font-body">
          {message}
        </span>
      </div>
      <button
        onClick={() => onClose(id)}
        className="text-muted hover:text-text p-1 rounded-md hover:bg-surface2 transition-colors duration-150 flex-shrink-0"
        aria-label="Dismiss toast"
      >
        <X size={14} />
      </button>
    </div>
  );
};

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-6 right-6 z-[100] flex flex-col gap-3 select-none">
      {toasts.map((toast) => (
        <ToastItemComponent key={toast.id} toast={toast} onClose={removeToast} />
      ))}
    </div>
  );
};
