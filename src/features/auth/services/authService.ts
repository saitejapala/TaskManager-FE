import axiosInstance from '@core/api/axiosInstance';
import { API_ENDPOINTS } from '@core/api/apiEndpoints';
import { ResponseModel } from '../../../types/api.types';
import { RegisterRequestDto, LoginRequestDto, LoginResponseData } from '../types/auth.types';

export const authService = {
  requestOtp: async (email: string): Promise<ResponseModel> => {
    const response = await axiosInstance.post<ResponseModel>(
      API_ENDPOINTS.AUTH_REQUEST_OTP,
      { email }
    );
    return response.data;
  },

  register: async (payload: RegisterRequestDto): Promise<ResponseModel> => {
    // Register payload: email, password, fullName, otp together.
    const response = await axiosInstance.post<ResponseModel>(
      API_ENDPOINTS.AUTH_REGISTER,
      payload
    );
    return response.data;
  },

  login: async (payload: LoginRequestDto): Promise<ResponseModel<LoginResponseData>> => {
    const response = await axiosInstance.post<ResponseModel<LoginResponseData>>(
      API_ENDPOINTS.AUTH_LOGIN,
      payload
    );
    return response.data;
  },
};
