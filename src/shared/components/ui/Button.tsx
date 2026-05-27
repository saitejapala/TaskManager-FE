import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@utils/cn';
import Loader from './Loader';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: ReactNode;
  fullWidth?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, leftIcon, fullWidth, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          // Base flat button styles
          'inline-flex items-center justify-center font-semibold tracking-wide transition-all duration-150 border border-transparent select-none outline-none focus:outline-none focus:ring-0 active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none disabled:active:scale-100',
          
          // Variants
          {
            // Primary: bg-primary, hover: #0353E9
            'bg-primary text-white hover:bg-[#0353E9] border-transparent': variant === 'primary',
            // Ghost: bg-transparent, border border-border, hover: bg-surface2
            'bg-transparent border-border text-text hover:bg-surface2': variant === 'ghost',
            // Danger: bg-error, hover red-700
            'bg-error text-white hover:bg-[#B31412] border-transparent': variant === 'danger',
          },
          
          // Sizes (Heights)
          {
            'h-9 px-3 text-xs rounded-[8px]': size === 'sm',
            'h-12 px-5 text-sm rounded-[10px]': size === 'md',
            'h-14 px-7 text-base rounded-[12px]': size === 'lg',
          },
          
          // Width
          fullWidth ? 'w-full' : '',
          className
        )}
        {...props}
      >
        {isLoading ? (
          <Loader size="sm" className="mr-2 border-current" />
        ) : leftIcon ? (
          <span className="mr-2 inline-flex">{leftIcon}</span>
        ) : null}
        <span>{children}</span>
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
export type { ButtonProps };
