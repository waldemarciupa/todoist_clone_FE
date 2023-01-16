import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from '../features/Tasks/tasksSlice';
import projectsReducer from '../features/Projects/projectsSlice';
import userReducer from '../features/User/userSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    tasks: tasksReducer,
    projects: projectsReducer,
  },
});
