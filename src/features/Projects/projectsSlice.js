import api from '../../services/api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  single: 'All tasks',
  list: [],
  status: 'idle',
  error: null,
};

export const fetchProjects = createAsyncThunk(
  'projects/fetchProjects',
  async (payload) => {
    const { data } = await api.get('/projects');
    return data;
  }
);

export const addNewProject = createAsyncThunk(
  'projects/addNewProject',
  async (payload) => {
    const { data } = await api.post('/projects', payload);
    return data;
  }
);

export const deleteProject = createAsyncThunk(
  'project/deleteProject',
  async (payload) => {
    await api.delete(`/projects/${payload.id}`);
  }
);

export const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    resetProjects: {
      reducer(state) {
        return (state = initialState);
      },
    },
    setProjectSingle: {
      reducer(state, action) {
        state.single = action.payload;
      },
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchProjects.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = state.list.concat(action.payload);
      })
      .addCase(addNewProject.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.list = state.list.filter((project) => {
          return project._id !== action.meta.arg.id;
        });
      });
  },
});

export const { resetProjects, setProjectSingle } = projectsSlice.actions;

export default projectsSlice.reducer;

export const selectProjects = (state) => state.projects.list;
