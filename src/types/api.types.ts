export interface ResponseModel<T = unknown> {
  isSuccess: boolean;
  data: T | null;
  message: string | null;
}

export interface ApiErrorResponse {
  isSuccess: false;
  data: null;
  message: string;
}
