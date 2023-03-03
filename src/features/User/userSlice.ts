import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import api from '../../services/api';
import axios from 'axios';

const user: string | null = localStorage.getItem('user');

interface UserState {
  isLoggedIn: boolean;
  data: string | null;
  error: null | unknown;
}

const initialState: UserState = user
  ? { isLoggedIn: true, data: JSON.parse(user), error: null }
  : { isLoggedIn: false, data: user, error: null };

export const login = createAsyncThunk(
  'auth/login',
  async (payload: { email: string; password: string }, thunkAPI) => {
    try {
      const { data } = await api.post(`/auth/login`, {
        email: payload.email,
        password: payload.password,
      });
      if (data.token) {
        localStorage.setItem('user', JSON.stringify(data));
      }
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue(error.response?.data.message);
      }
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (
    payload: { name: string; email: string; password: string },
    thunkAPI
  ) => {
    try {
      const { data } = await api.post(`/auth/register`, {
        name: payload.name,
        email: payload.email,
        password: payload.password,
      });
      if (data.token) {
        localStorage.setItem('user', JSON.stringify(data));
      }
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue(error.response?.data.message);
      }
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async () => {
  localStorage.removeItem('user');
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(register.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoggedIn = true;
      state.error = null;
    });
    builder.addCase(register.rejected, (state, action) => {
      state.error = action.payload;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoggedIn = true;
      state.error = null;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.error = action.payload;
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.isLoggedIn = false;
      state.data = null;
    });
  },
});

export default userSlice.reducer;

export const userSelector = (state: RootState) => state.user;
