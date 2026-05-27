import React from 'react';
import WorkItemCard from './WorkItemCard';
import { WorkItem } from '../types/workItem.types';

interface WorkItemListProps {
  items: WorkItem[];
  onEdit: (item: WorkItem) => void;
  onDelete: (id: number) => void;
  onToggleComplete?: (item: WorkItem) => void;
}

const WorkItemList: React.FC<WorkItemListProps> = ({
  items,
  onEdit,
  onDelete,
  onToggleComplete,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item) => (
        <WorkItemCard
          key={item.id}
          item={item}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggleComplete={onToggleComplete}
        />
      ))}
    </div>
  );
};

export default WorkItemList;
export type { WorkItemListProps };
