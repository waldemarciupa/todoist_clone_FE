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

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
