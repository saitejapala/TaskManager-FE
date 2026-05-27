import axiosInstance from '@core/api/axiosInstance';
import { API_ENDPOINTS } from '@core/api/apiEndpoints';
import { ResponseModel } from '../../../types/api.types';
import { WorkItem, CreateWorkItemDto } from '../types/workItem.types';

export const workItemService = {
  getAllTasks: async (): Promise<ResponseModel<WorkItem[]>> => {
    const response = await axiosInstance.get<ResponseModel<WorkItem[]>>(
      API_ENDPOINTS.WORK_ITEMS_GET_ALL
    );
    return response.data;
  },

  getTaskDetails: async (id: number): Promise<ResponseModel<WorkItem>> => {
    const response = await axiosInstance.get<ResponseModel<WorkItem>>(
      `${API_ENDPOINTS.WORK_ITEMS_DETAILS}?id=${id}`
    );
    return response.data;
  },

  createTask: async (payload: CreateWorkItemDto): Promise<ResponseModel<WorkItem>> => {
    const response = await axiosInstance.post<ResponseModel<WorkItem>>(
      API_ENDPOINTS.WORK_ITEMS_CREATE,
      payload
    );
    return response.data;
  },

  updateTask: async (id: number, payload: CreateWorkItemDto): Promise<ResponseModel> => {
    const response = await axiosInstance.put<ResponseModel>(
      `${API_ENDPOINTS.WORK_ITEMS_UPDATE}?id=${id}`,
      payload
    );
    return response.data;
  },

  deleteTask: async (id: number): Promise<ResponseModel> => {
    const response = await axiosInstance.delete<ResponseModel>(
      `${API_ENDPOINTS.WORK_ITEMS_DELETE}?id=${id}`
    );
    return response.data;
  },
};
