import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthUser } from '../types/auth.types';
import { tokenStorage } from '@utils/tokenStorage';

interface AuthState {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user: AuthUser; token: string }>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      tokenStorage.setToken(action.payload.token);
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      state.isAuthenticated = true;
      tokenStorage.setToken(action.payload);
      
      // Attempt to decode user info from JWT payload
      try {
        const payloadBase64 = action.payload.split('.')[1];
        if (payloadBase64) {
          // Fix for Unicode/Base64 decoding in browser environment
          const decodedPayload = JSON.parse(
            decodeURIComponent(
              atob(payloadBase64)
                .split('')
                .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                .join('')
            )
          );
          
          // Dotnet JWT token claims mapping
          const email =
            decodedPayload.email ||
            decodedPayload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'] ||
            '';
          const fullName =
            decodedPayload.name ||
            decodedPayload.fullName ||
            decodedPayload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'] ||
            email.split('@')[0] ||
            'User';
            
          state.user = { email, fullName };
        }
      } catch (e) {
        console.error('Failed to decode JWT token', e);
        // Fallback user details
        state.user = { email: 'user@kinetic.com', fullName: 'Kinetic User' };
      }
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      tokenStorage.clearToken();
    },
  },
});

export const { setCredentials, setToken, logout } = authSlice.actions;
export default authSlice.reducer;
