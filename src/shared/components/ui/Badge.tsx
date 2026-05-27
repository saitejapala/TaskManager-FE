import React, { HTMLAttributes } from 'react';
import { cn } from '@utils/cn';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'error' | 'warning' | 'accent';
}

const Badge: React.FC<BadgeProps> = ({ className, variant = 'default', children, ...props }) => {
  return (
    <span
      className={cn(
        // Pill shape, flat border/bg, padding, text specs
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold select-none border',
        {
          // default
          'bg-surface2 border-border text-text': variant === 'default',
          // success: green
          'bg-success/10 border-success/20 text-success': variant === 'success',
          // error: red
          'bg-error/10 border-error/20 text-error': variant === 'error',
          // warning: yellow/orange
          'bg-warning/10 border-warning/20 text-warning': variant === 'warning',
          // accent: burnt orange
          'bg-accent/10 border-accent/20 text-accent': variant === 'accent',
        },
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};

export default Badge;
export type { BadgeProps };
