export const API_ENDPOINTS = {
  AUTH_REGISTER: '/api/Auth/Register',
  AUTH_REQUEST_OTP: '/api/Auth/RequestSignUpOTP',
  AUTH_LOGIN: '/api/Auth/Login',
  WORK_ITEMS_GET_ALL: '/api/WorkItems/GetAllTasks',
  WORK_ITEMS_DETAILS: '/api/WorkItems/Details',
  WORK_ITEMS_CREATE: '/api/WorkItems/Create',
  WORK_ITEMS_UPDATE: '/api/WorkItems/UpdateTask',
  WORK_ITEMS_DELETE: '/api/WorkItems/DeleteTask',
} as const;
