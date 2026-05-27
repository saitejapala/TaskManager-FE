import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@core/store/hooks';
import { setToken, logout as logoutAction } from '../store/authSlice';
import { authService } from '../services/authService';
import { parseApiError } from '@core/api/apiErrorHandler';
import { LoginRequestDto, RegisterRequestDto } from '../types/auth.types';
import { toast } from '@shared/hooks/useToast';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const { user, token, isAuthenticated } = useAppSelector((state) => state.auth);
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const requestOtp = async (email: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await authService.requestOtp(email);
      if (!response.isSuccess) {
        throw new Error(response.message || 'Failed to request OTP');
      }
      toast.success(response.message || 'OTP verification code sent to your email.');
      return true;
    } catch (err) {
      const errMsg = parseApiError(err);
      setError(errMsg);
      toast.error(errMsg);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (payload: RegisterRequestDto): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await authService.register(payload);
      if (!response.isSuccess) {
        throw new Error(response.message || 'Registration failed.');
      }
      toast.success('Registration complete! You can now log in.');
      return true;
    } catch (err) {
      const errMsg = parseApiError(err);
      setError(errMsg);
      toast.error(errMsg);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (payload: LoginRequestDto): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await authService.login(payload);
      if (!response.isSuccess || !response.data?.token) {
        throw new Error(response.message || 'Invalid credentials.');
      }
      dispatch(setToken(response.data.token));
      toast.success('Successfully logged in.');
      return true;
    } catch (err) {
      const errMsg = parseApiError(err);
      setError(errMsg);
      toast.error(errMsg);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    dispatch(logoutAction());
    toast.success('Logged out successfully.');
  };

  return {
    user,
    token,
    isAuthenticated,
    isLoading,
    error,
    requestOtp,
    register,
    login,
    logout,
  };
};
export type UseAuthReturn = ReturnType<typeof useAuth>;
