import React from 'react';
import { Layers } from 'lucide-react';
import EmptyState from '@shared/components/ui/EmptyState';

interface WorkItemEmptyStateProps {
  onCreateTaskClick: () => void;
}

const WorkItemEmptyState: React.FC<WorkItemEmptyStateProps> = ({ onCreateTaskClick }) => {
  return (
    <EmptyState
      icon={<Layers size={40} className="text-muted/60" />}
      title="No tasks found"
      description="Your workspace is currently clear. Click below to add a new task and begin organizing your work items."
      actionLabel="Create First Task"
      onAction={onCreateTaskClick}
      className="border-dashed border-border"
    />
  );
};

export default WorkItemEmptyState;
