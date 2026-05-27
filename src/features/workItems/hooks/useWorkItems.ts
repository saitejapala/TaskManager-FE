import { useAppDispatch, useAppSelector } from '@core/store/hooks';
import {
  fetchAllTasks,
  createTask,
  updateTask,
  deleteTask,
  selectItem,
  clearError,
} from '../store/workItemsSlice';
import { CreateWorkItemDto, WorkItem } from '../types/workItem.types';
import { toast } from '@shared/hooks/useToast';

export const useWorkItems = () => {
  const dispatch = useAppDispatch();
  const { items, selectedItem, status, error } = useAppSelector((state) => state.workItems);

  const fetchTasks = async () => {
    try {
      await dispatch(fetchAllTasks()).unwrap();
    } catch (err) {
      toast.error(err as string || 'Failed to load tasks.');
    }
  };

  const createTaskItem = async (payload: CreateWorkItemDto) => {
    try {
      await dispatch(createTask(payload)).unwrap();
      toast.success('Task created successfully!');
      return true;
    } catch (err) {
      toast.error(err as string || 'Failed to create task.');
      return false;
    }
  };

  const updateTaskItem = async (id: number, payload: CreateWorkItemDto) => {
    try {
      await dispatch(updateTask({ id, payload })).unwrap();
      toast.success('Task updated successfully!');
      return true;
    } catch (err) {
      toast.error(err as string || 'Failed to update task.');
      return false;
    }
  };

  const deleteTaskItem = async (id: number) => {
    try {
      await dispatch(deleteTask(id)).unwrap();
      toast.success('Task deleted successfully!');
      return true;
    } catch (err) {
      toast.error(err as string || 'Failed to delete task.');
      return false;
    }
  };

  const selectTask = (item: WorkItem | null) => {
    dispatch(selectItem(item));
  };

  const clearTaskError = () => {
    dispatch(clearError());
  };

  return {
    items,
    selectedItem,
    status,
    error,
    isLoading: status === 'loading',
    fetchTasks,
    createTaskItem,
    updateTaskItem,
    deleteTaskItem,
    selectTask,
    clearTaskError,
  };
};
export type UseWorkItemsReturn = ReturnType<typeof useWorkItems>;
