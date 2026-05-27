import React, { InputHTMLAttributes, ReactNode } from 'react';
import { cn } from '@utils/cn';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, leftIcon, rightIcon, type = 'text', id, ...props }, ref) => {
    return (
      <div className="w-full flex flex-col gap-1.5 text-left">
        {label && (
          <label
            htmlFor={id}
            className="text-xs font-semibold text-text select-none tracking-wide font-body"
          >
            {label}
          </label>
        )}
        
        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute left-4 text-muted pointer-events-none flex items-center justify-center">
              {leftIcon}
            </div>
          )}
          
          <input
            ref={ref}
            type={type}
            id={id}
            className={cn(
              // Input base specs: rounded-[10px], h-12, border, px-4, text-sm
              'w-full h-12 text-sm bg-surface border rounded-[10px] text-text transition-colors duration-[250ms] placeholder:text-muted/60',
              // Focus styles: border-primary outline-none ring-0
              'focus:border-primary focus:outline-none focus:ring-0',
              // Padding based on icons
              leftIcon ? 'pl-11' : 'px-4',
              rightIcon ? 'pr-11' : 'px-4',
              // Error state
              error ? 'border-error text-error focus:border-error' : 'border-border',
              className
            )}
            {...props}
          />
          
          {rightIcon && (
            <div className="absolute right-4 text-muted flex items-center justify-center">
              {rightIcon}
            </div>
          )}
        </div>
        
        {error && (
          <span className="text-xs font-medium text-error select-none leading-none mt-0.5">
            {error}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
export type { InputProps };
