import { z } from 'zod';

export const workItemSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .max(100, 'Title must be 100 characters or less'),
  description: z.string().optional(),
  userId: z.number().optional(),
  isCompleted: z.boolean().optional(),
});

export type WorkItemFormInput = z.infer<typeof workItemSchema>;
