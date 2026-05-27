export interface AuthUser {
  fullName: string;
  email: string;
}

export interface RegisterRequestDto {
  fullName: string;
  email: string;
  password?: string;
  confirmPassword?: string;
  otp: string;
}

export interface LoginRequestDto {
  email: string;
  password?: string;
}

export interface LoginResponseData {
  token: string;
}
