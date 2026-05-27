import axios from 'axios';

export const parseApiError = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const responseData = error.response?.data;
    
    // Check if response matches ResponseModel layout
    if (responseData && typeof responseData === 'object') {
      if ('message' in responseData && responseData.message) {
        return responseData.message as string;
      }
    }
    
    if (error.response) {
      const status = error.response.status;
      if (status === 401) {
        return 'Session expired. Please sign in again.';
      }
      if (status === 403) {
        return 'Access denied. You do not have permission to do this.';
      }
      if (status === 404) {
        return 'Requested resource not found.';
      }
      if (status >= 500) {
        return 'Server error. Our engineers have been notified.';
      }
      return `Error (${status}): ${error.message}`;
    }
    
    if (error.request) {
      return 'Unable to reach the server. Please check your internet connection.';
    }
  }
  
  if (error instanceof Error) {
    return error.message;
  }
  
  return 'An unexpected error occurred.';
};
