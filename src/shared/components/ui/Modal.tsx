import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { cn } from '@utils/cn';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, footer }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
      
      // Simple focus trap: focus the modal container
      modalRef.current?.focus();
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop: bg-black/50 */}
      <div
        className="fixed inset-0 bg-black/50 transition-opacity duration-[250ms]"
        onClick={onClose}
      />
      
      {/* Modal box: rounded-2xl (16px), border, surface bg, p-6 */}
      <div
        ref={modalRef}
        tabIndex={-1}
        className={cn(
          'relative z-10 w-full max-w-md bg-surface border border-border rounded-2xl p-6 outline-none flex flex-col',
          'transition-all duration-[250ms] ease-out animate-in fade-in zoom-in-95'
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border pb-4 mb-4">
          <h3 className="text-lg font-heading font-semibold text-text">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="text-muted hover:text-text p-1.5 rounded-[8px] hover:bg-surface2 transition-colors duration-150"
            aria-label="Close Modal"
          >
            <X size={18} />
          </button>
        </div>
        
        {/* Content */}
        <div className="flex-1 text-sm text-text font-body max-h-[60vh] overflow-y-auto mb-6 pr-1">
          {children}
        </div>
        
        {/* Footer */}
        {footer && (
          <div className="flex justify-end gap-3 border-t border-border pt-4">
            {footer}
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
