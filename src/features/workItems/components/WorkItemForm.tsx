import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useWorkItems } from '../hooks/useWorkItems';
import { workItemSchema, WorkItemFormInput } from '../validations/workItem.schema';
import { Input, Button } from '@shared/components/ui';
import { Plus, Check } from 'lucide-react';

interface WorkItemFormProps {
  onSuccess: () => void;
  defaultValues?: {
    id?: number;
    title: string;
    description?: string;
  };
}

const WorkItemForm: React.FC<WorkItemFormProps> = ({ onSuccess, defaultValues }) => {
  const { createTaskItem, updateTaskItem, isLoading } = useWorkItems();
  const isEditing = !!defaultValues?.id;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<WorkItemFormInput>({
    resolver: zodResolver(workItemSchema),
    defaultValues: {
      title: defaultValues?.title || '',
      description: defaultValues?.description || '',
    },
  });

  const onSubmit = async (data: WorkItemFormInput) => {
    let success = false;
    if (isEditing && defaultValues?.id) {
      success = await updateTaskItem(defaultValues.id, {
        title: data.title,
        description: data.description,
      });
    } else {
      success = await createTaskItem({
        title: data.title,
        description: data.description,
      });
    }

    if (success) {
      onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-left">
      <Input
        label="Task Title *"
        type="text"
        placeholder="Enter task name..."
        error={errors.title?.message}
        disabled={isLoading}
        {...register('title')}
      />

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold text-text tracking-wide font-body">
          Description
        </label>
        <textarea
          placeholder="Describe what needs to be done..."
          rows={4}
          disabled={isLoading}
          className="w-full text-sm bg-surface border border-border rounded-[10px] text-text p-4 transition-colors duration-[250ms] focus:border-primary focus:outline-none focus:ring-0 placeholder:text-muted/60 resize-none font-body"
          {...register('description')}
        />
        {errors.description && (
          <span className="text-xs font-medium text-error select-none leading-none mt-0.5">
            {errors.description.message}
          </span>
        )}
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-border mt-6">
        <Button
          type="submit"
          variant="primary"
          isLoading={isLoading}
          leftIcon={isEditing ? <Check size={16} /> : <Plus size={16} />}
        >
          {isEditing ? 'Save Changes' : 'Create Task'}
        </Button>
      </div>
    </form>
  );
};

export default WorkItemForm;
