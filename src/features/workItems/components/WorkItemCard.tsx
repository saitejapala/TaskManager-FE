import React from 'react';
import { Edit3, Trash2, CheckCircle2, Circle } from 'lucide-react';
import { WorkItem } from '../types/workItem.types';
import { Card, Badge } from '@shared/components/ui';
import { cn } from '@utils/cn';

interface WorkItemCardProps {
  item: WorkItem;
  onEdit: (item: WorkItem) => void;
  onDelete: (id: number) => void;
  onToggleComplete?: (item: WorkItem) => void;
}

const WorkItemCard: React.FC<WorkItemCardProps> = ({
  item,
  onEdit,
  onDelete,
  onToggleComplete,
}) => {
  const { title, description, isCompleted } = item;

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      onDelete(item.id);
    }
  };

  return (
    <Card className="hover:border-primary flex flex-col justify-between h-full select-none text-left min-h-[160px]">
      <div className="space-y-3">
        {/* Title row */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-2.5">
            {onToggleComplete && (
              <button
                onClick={() => onToggleComplete(item)}
                className="mt-0.5 text-muted hover:text-primary transition-colors flex-shrink-0"
                title={isCompleted ? 'Mark Incomplete' : 'Mark Completed'}
              >
                {isCompleted ? (
                  <CheckCircle2 size={18} className="text-success" />
                ) : (
                  <Circle size={18} />
                )}
              </button>
            )}
            <h4
              className={cn(
                'text-sm font-bold text-text leading-snug tracking-wide line-clamp-2',
                isCompleted && 'line-through text-muted/60'
              )}
            >
              {title}
            </h4>
          </div>
          
          <Badge variant={isCompleted ? 'success' : 'warning'} className="flex-shrink-0 text-[10px]">
            {isCompleted ? 'Done' : 'Progress'}
          </Badge>
        </div>

        {/* Description: clamped to 2 lines */}
        <p
          className={cn(
            'text-xs font-semibold text-muted leading-relaxed line-clamp-2',
            isCompleted && 'line-through opacity-60'
          )}
        >
          {description || 'No description provided.'}
        </p>
      </div>

      {/* Action triggers */}
      <div className="flex justify-end gap-1.5 mt-5 pt-3 border-t border-border/60">
        <button
          onClick={() => onEdit(item)}
          className="p-1.5 text-muted hover:text-primary hover:bg-surface2 rounded-[6px] transition-all duration-150"
          title="Edit Task"
        >
          <Edit3 size={15} />
        </button>
        <button
          onClick={handleDelete}
          className="p-1.5 text-muted hover:text-error hover:bg-surface2 rounded-[6px] transition-all duration-150"
          title="Delete Task"
        >
          <Trash2 size={15} />
        </button>
      </div>
    </Card>
  );
};

export default WorkItemCard;
export type { WorkItemCardProps };
