import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '@features/auth/store/authSlice';
import workItemsReducer from '@features/workItems/store/workItemsSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  workItems: workItemsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
