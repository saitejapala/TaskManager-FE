import React from 'react';
import { cn } from '@utils/cn';

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Loader: React.FC<LoaderProps> = ({ size = 'md', className }) => {
  return (
    <div
      className={cn(
        'animate-spin rounded-full border-[2px] border-t-transparent border-r-transparent',
        {
          'h-4 w-4': size === 'sm',
          'h-8 w-8 border-[3px]': size === 'md',
          'h-12 w-12 border-[4px]': size === 'lg',
        },
        // Color is inherited via border-current or defaults to text-primary
        'border-primary border-t-transparent border-r-transparent',
        className
      )}
      role="status"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Loader;
