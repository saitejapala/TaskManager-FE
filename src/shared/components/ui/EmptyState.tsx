import React from 'react';
import Button from './Button';
import { FolderOpen } from 'lucide-react';
import { cn } from '@utils/cn';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  actionLabel,
  onAction,
  className,
}) => {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center text-center p-8 border border-dashed border-border rounded-2xl bg-surface/50 min-h-[300px]',
        className
      )}
    >
      <div className="text-muted mb-4 flex items-center justify-center p-4 bg-surface2 rounded-full border border-border">
        {icon || <FolderOpen size={40} className="text-muted/60" />}
      </div>
      <h3 className="text-lg font-heading font-semibold text-text mb-1.5">
        {title}
      </h3>
      <p className="text-sm text-muted max-w-sm mb-6 leading-relaxed">
        {description}
      </p>
      {actionLabel && onAction && (
        <Button variant="primary" onClick={onAction} className="h-10 px-4 text-xs font-semibold max-w-[180px]">
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
export type { EmptyStateProps };
