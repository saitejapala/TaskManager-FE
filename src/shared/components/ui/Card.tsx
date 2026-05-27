import React, { HTMLAttributes } from 'react';
import { cn } from '@utils/cn';

interface CardProps extends HTMLAttributes<HTMLDivElement> {}

const Card: React.FC<CardProps> = ({ className, children, ...props }) => {
  return (
    <div
      className={cn(
        // Card: surface bg, border, rounded-2xl (16px), p-6
        'bg-surface border border-border rounded-2xl p-6 transition-colors duration-[250ms] ease-out',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
export type { CardProps };
