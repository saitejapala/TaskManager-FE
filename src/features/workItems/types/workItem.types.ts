export interface WorkItem {
  id: number;
  title: string;
  description?: string;
  userId?: number;
  isCompleted?: boolean; // We support isCompleted flag or status checking
  createdAt?: string;
}

export interface CreateWorkItemDto {
  title: string;
  description?: string;
  userId?: number;
}
