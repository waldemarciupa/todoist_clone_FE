import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../services/api';

const user = JSON.parse(localStorage.getItem('user'));

const initialState = user
  ? { isLoggedIn: true, data: user, error: null }
  : { isLoggedIn: false, data: null, error: null };

export const login = createAsyncThunk(
  'auth/login',
  async (payload, thunkAPI) => {
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
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (payload, thunkAPI) => {
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
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async () => {
  localStorage.removeItem('user');
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers(builder) {
    builder.addCase(register.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoggedIn = true;
      state.error = '';
    });
    builder.addCase(register.rejected, (state, action) => {
      state.error = action.payload;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoggedIn = true;
      state.error = '';
    });
    builder.addCase(login.rejected, (state, action) => {
      state.error = action.payload;
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      state.isLoggedIn = false;
      state.data = null;
    });
  },
});

export default userSlice.reducer;

export const userSelector = (state) => state.user;
