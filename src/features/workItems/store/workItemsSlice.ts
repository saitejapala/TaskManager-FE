import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { WorkItem, CreateWorkItemDto } from '../types/workItem.types';
import { workItemService } from '../services/workItemService';
import { parseApiError } from '@core/api/apiErrorHandler';

interface WorkItemsState {
  items: WorkItem[];
  selectedItem: WorkItem | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: WorkItemsState = {
  items: [],
  selectedItem: null,
  status: 'idle',
  error: null,
};

// Async Thunks
export const fetchAllTasks = createAsyncThunk(
  'workItems/fetchAllTasks',
  async (_, { rejectWithValue }) => {
    try {
      const response = await workItemService.getAllTasks();
      if (response.isSuccess && response.data) {
        return response.data;
      }
      return rejectWithValue(response.message || 'Failed to fetch tasks.');
    } catch (error) {
      return rejectWithValue(parseApiError(error));
    }
  }
);

export const createTask = createAsyncThunk(
  'workItems/createTask',
  async (payload: CreateWorkItemDto, { rejectWithValue }) => {
    try {
      const response = await workItemService.createTask(payload);
      if (response.isSuccess && response.data) {
        return response.data;
      }
      return rejectWithValue(response.message || 'Failed to create task.');
    } catch (error) {
      return rejectWithValue(parseApiError(error));
    }
  }
);

export const updateTask = createAsyncThunk(
  'workItems/updateTask',
  async ({ id, payload }: { id: number; payload: CreateWorkItemDto }, { rejectWithValue }) => {
    try {
      const response = await workItemService.updateTask(id, payload);
      if (response.isSuccess) {
        // Return updated item payload
        return { id, ...payload } as WorkItem;
      }
      return rejectWithValue(response.message || 'Failed to update task.');
    } catch (error) {
      return rejectWithValue(parseApiError(error));
    }
  }
);

export const deleteTask = createAsyncThunk(
  'workItems/deleteTask',
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await workItemService.deleteTask(id);
      if (response.isSuccess) {
        return id;
      }
      return rejectWithValue(response.message || 'Failed to delete task.');
    } catch (error) {
      return rejectWithValue(parseApiError(error));
    }
  }
);

const workItemsSlice = createSlice({
  name: 'workItems',
  initialState,
  reducers: {
    selectItem: (state, action: PayloadAction<WorkItem | null>) => {
      state.selectedItem = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch All Tasks
      .addCase(fetchAllTasks.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchAllTasks.fulfilled, (state, action: PayloadAction<WorkItem[]>) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchAllTasks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      
      // Create Task
      .addCase(createTask.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createTask.fulfilled, (state, action: PayloadAction<WorkItem>) => {
        state.status = 'succeeded';
        state.items.unshift(action.payload);
      })
      .addCase(createTask.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      
      // Update Task
      .addCase(updateTask.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateTask.fulfilled, (state, action: PayloadAction<WorkItem>) => {
        state.status = 'succeeded';
        const index = state.items.findIndex((item) => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = { ...state.items[index], ...action.payload };
        }
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      
      // Delete Task
      .addCase(deleteTask.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteTask.fulfilled, (state, action: PayloadAction<number>) => {
        state.status = 'succeeded';
        state.items = state.items.filter((item) => item.id !== action.payload);
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const { selectItem, clearError } = workItemsSlice.actions;
export default workItemsSlice.reducer;
