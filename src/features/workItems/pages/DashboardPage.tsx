import React, { useEffect, useState } from 'react';
import AppShell from '@shared/components/layout/AppShell';
import { useWorkItems } from '../hooks/useWorkItems';
import WorkItemList from '../components/WorkItemList';
import WorkItemForm from '../components/WorkItemForm';
import WorkItemEmptyState from '../components/WorkItemEmptyState';
import { useDebounce } from '@shared/hooks/useDebounce';
import { Card, Modal, Button } from '@shared/components/ui';
import { Plus, ListTodo, ClipboardCheck, Timer } from 'lucide-react';
import { WorkItem } from '../types/workItem.types';

const DashboardPage: React.FC = () => {
  const {
    items,
    isLoading,
    fetchTasks,
    deleteTaskItem,
    updateTaskItem,
  } = useWorkItems();

  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  // Modal control states
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<WorkItem | null>(null);

  useEffect(() => {
    fetchTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Local search filter
  const filteredItems = items.filter((item) => {
    const query = debouncedSearchQuery.toLowerCase();
    return (
      item.title.toLowerCase().includes(query) ||
      (item.description && item.description.toLowerCase().includes(query))
    );
  });

  // Task status computations
  const totalTasks = items.length;
  const completedTasks = items.filter((item) => item.isCompleted).length;
  const inProgressTasks = totalTasks - completedTasks;

  const handleEditClick = (item: WorkItem) => {
    setEditingItem(item);
    setIsFormModalOpen(true);
  };

  const handleCreateClick = () => {
    setEditingItem(null);
    setIsFormModalOpen(true);
  };

  const handleFormSuccess = () => {
    setIsFormModalOpen(false);
    setEditingItem(null);
    fetchTasks(); // Reload items from api
  };

  const handleToggleComplete = async (item: WorkItem) => {
    // Send updated isCompleted state to the backend
    await updateTaskItem(item.id, {
      title: item.title,
      description: item.description,
      isCompleted: !item.isCompleted,
    } as never); // Cast as never/any to support isCompleted update payload
    fetchTasks();
  };

  // Skeleton loading component
  const renderSkeletons = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3].map((n) => (
        <Card key={n} className="h-[160px] animate-pulse flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex justify-between">
              <div className="h-4 bg-border rounded w-2/3" />
              <div className="h-4 bg-border rounded w-1/5" />
            </div>
            <div className="h-3 bg-border rounded w-full" />
            <div className="h-3 bg-border rounded w-5/6" />
          </div>
          <div className="flex justify-end gap-2 mt-4 pt-3 border-t border-border/40">
            <div className="h-6 w-6 bg-border rounded" />
            <div className="h-6 w-6 bg-border rounded" />
          </div>
        </Card>
      ))}
    </div>
  );

  return (
    <AppShell
      title="Dashboard"
      searchQuery={searchQuery}
      onSearchChange={setSearchQuery}
    >
      <div className="space-y-8 select-none">
        {/* STAT CARDS ROW — 3 cards */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* Card 1: Total Tasks */}
          <Card className="flex items-center gap-4 border border-border bg-surface transition-all select-none">
            <div className="p-3.5 bg-primary/10 rounded-[10px] text-primary flex items-center justify-center">
              <ListTodo size={24} />
            </div>
            <div className="text-left">
              <p className="text-xs font-semibold text-muted">Total Tasks</p>
              <h4 className="text-2xl font-bold font-heading text-text mt-0.5">
                {isLoading && totalTasks === 0 ? '...' : totalTasks}
              </h4>
            </div>
          </Card>

          {/* Card 2: Completed */}
          <Card className="flex items-center gap-4 border border-border bg-surface transition-all select-none">
            <div className="p-3.5 bg-success/10 rounded-[10px] text-success flex items-center justify-center">
              <ClipboardCheck size={24} />
            </div>
            <div className="text-left">
              <p className="text-xs font-semibold text-muted">Completed</p>
              <h4 className="text-2xl font-bold font-heading text-text mt-0.5">
                {isLoading && totalTasks === 0 ? '...' : completedTasks}
              </h4>
            </div>
          </Card>

          {/* Card 3: In Progress */}
          <Card className="flex items-center gap-4 border border-border bg-surface transition-all select-none">
            <div className="p-3.5 bg-warning/10 rounded-[10px] text-warning flex items-center justify-center">
              <Timer size={24} />
            </div>
            <div className="text-left">
              <p className="text-xs font-semibold text-muted">In Progress</p>
              <h4 className="text-2xl font-bold font-heading text-text mt-0.5">
                {isLoading && totalTasks === 0 ? '...' : inProgressTasks}
              </h4>
            </div>
          </Card>
        </section>

        {/* WORK ITEMS SECTION */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-heading font-bold text-text tracking-wide">
              Work Items
            </h3>
            <Button
              onClick={handleCreateClick}
              variant="primary"
              size="sm"
              leftIcon={<Plus size={16} />}
              className="h-10 text-xs px-4"
            >
              New Task
            </Button>
          </div>

          {isLoading && items.length === 0 ? (
            renderSkeletons()
          ) : items.length === 0 ? (
            <WorkItemEmptyState onCreateTaskClick={handleCreateClick} />
          ) : (
            <WorkItemList
              items={filteredItems}
              onEdit={handleEditClick}
              onDelete={deleteTaskItem}
              onToggleComplete={handleToggleComplete}
            />
          )}
        </section>
      </div>

      {/* Task Creation & Edit Modal */}
      <Modal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        title={editingItem ? 'Edit Task' : 'New Task'}
      >
        <WorkItemForm
          onSuccess={handleFormSuccess}
          defaultValues={editingItem ? {
            id: editingItem.id,
            title: editingItem.title,
            description: editingItem.description,
          } : undefined}
        />
      </Modal>
    </AppShell>
  );
};

export default DashboardPage;
