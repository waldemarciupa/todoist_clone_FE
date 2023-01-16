import api from '../../services/api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  error: null,
  message: [],
  project: 'All tasks',
  status: 'idle',
  statusSingle: 'idle',
  task: null,
  tasks: [],
  tasksByProject: [],
  tasksBySearch: [],
};

export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async (payload) => {
    const { data } = await api.get('/tasks');
    return data;
  }
);

export const fetchTaskSingle = createAsyncThunk(
  'tasks/fetchTaskSingle',
  async (payload) => {
    const { data } = await api.get(`/task/${payload.id}`);
    return data;
  }
);

export const addNewTask = createAsyncThunk(
  'tasks/addNewTask',
  async (payload) => {
    const response = await api.post('/tasks', payload);
    return response.data;
  }
);

export const editTask = createAsyncThunk('tasks/editTask', async (payload) => {
  const response = await api.put(`/task/${payload.id}`, {
    title: payload.title,
    description: payload.description,
    id: payload.id,
    completed: payload.completed,
  });
  return response.data;
});

export const deleteTask = createAsyncThunk(
  'task/deleteTask',
  async (payload) => {
    const response = await api.delete(`/task/${payload.task_id}`);
    return response.data;
  }
);

export const addNewSubtask = createAsyncThunk(
  'tasks/addNewSubtask',
  async (payload) => {
    const response = await api.post(`/task/${payload.id}/subtask`, {
      title: payload.title,
      description: payload.description,
      project: payload.project,
      priority: payload.priority,
    });
    return response.data;
  }
);

export const completeSubtask = createAsyncThunk(
  'tasks/completeSubtask',
  async (payload) => {
    const response = await api.put(`/task/${payload.id}/subtask`, {
      subtask_id: payload.subtask_id,
      subtask_completed: payload.completed,
    });
    return response.data;
  }
);

export const deleteSubtask = createAsyncThunk(
  'tasks/deleteSubtask',
  async (payload) => {
    const response = await api.post(`/task/${payload.id}/subtask-delete`, {
      subtask_id: payload.subtask_id,
    });
    return response.data;
  }
);

export const addNewComment = createAsyncThunk(
  'tasks/addNewComment',
  async (payload) => {
    const response = await api.post(`/task/${payload.id}/comment`, {
      content: payload.comment,
    });
    return response.data;
  }
);

export const deleteComment = createAsyncThunk(
  'tasks/deleteComment',
  async (payload) => {
    const response = await api.post(`/task/${payload.id}/comment-delete`, {
      comment_id: payload.comment_id,
    });
    return response.data;
  }
);

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    selectTaskSingle: {
      reducer(state, action) {
        state.statusSingle = 'succeeded';
        state.task = state.tasks.filter((task) => {
          return task._id === action.payload;
        })[0];
      },
    },
    selectTasks: {
      reducer(state, action) {
        state.tasksByProject = state.tasks.filter((task) => {
          return action.payload ? task.project === action.payload : true;
        });
      },
    },
    selectTaskBySearch: {
      reducer(state, action) {
        state.tasksBySearch = state.tasks.filter((task) => {
          return task.title.includes(action.payload);
        });
      },
    },
    resetTasks: {
      reducer(state, action) {
        return (state = initialState);
      },
    },
    resetTaskMessage: {
      reducer(state, action) {
        state.message = [];
      },
    },
    setTaskProject: {
      reducer(state, action) {
        state.project = action.payload;
      },
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchTasks.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tasks = state.tasks.concat(action.payload);
        state.tasksByProject = state.tasksByProject.concat(action.payload);
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchTaskSingle.pending, (state, action) => {
        state.statusSingle = 'loading';
      })
      .addCase(fetchTaskSingle.fulfilled, (state, action) => {
        state.statusSingle = 'succeeded';
        state.task = action.payload;
      })
      .addCase(fetchTaskSingle.rejected, (state, action) => {
        state.statusSingle = 'failed';
        state.error = 'There is no task with specific ID';
      })
      .addCase(addNewTask.fulfilled, (state, action) => {
        state.message.push(action.payload.message);
        state.tasks.push(action.payload.task);
        // add for all tasks
        if (state.project === 'All tasks') {
          state.tasksByProject.push(action.payload.task);
        }
        // add for single project
        if (state.project === action.payload.task.project) {
          state.tasksByProject.push(action.payload.task);
        }
      })
      .addCase(editTask.fulfilled, (state, action) => {
        state.task = action.payload;
        state.tasks = state.tasks.map((task) => {
          return task._id === action.meta.arg.id
            ? {
                ...task,
                title: action.payload.title,
                description: action.payload.description,
                completed: action.payload.completed,
              }
            : task;
        });
        state.tasksByProject = state.tasksByProject.map((task) => {
          return task._id === action.meta.arg.id
            ? {
                ...task,
                title: action.payload.title,
                description: action.payload.description,
                completed: action.payload.completed,
              }
            : task;
        });
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.message.push(action.payload.message);

        state.tasks = state.tasks.filter((task) => {
          return task._id !== action.meta.arg.task_id;
        });

        state.tasksByProject = state.tasksByProject.filter((task) => {
          return task._id !== action.meta.arg.task_id;
        });
      })
      .addCase(addNewSubtask.fulfilled, (state, action) => {
        state.task = action.payload;
        state.tasks = state.tasks.map((task) => {
          return task._id === action.meta.arg.id
            ? {
                ...task,
                subtasks: action.payload.subtasks,
              }
            : task;
        });
      })
      .addCase(deleteSubtask.fulfilled, (state, action) => {
        state.task = action.payload;
        state.tasks = state.tasks.map((task) => {
          return task._id === action.meta.arg.id
            ? {
                ...task,
                subtasks: action.payload.subtasks,
              }
            : task;
        });
      })
      .addCase(completeSubtask.fulfilled, (state, action) => {
        state.task = action.payload;
        state.tasks = state.tasks.map((task) => {
          return task._id === action.meta.arg.id
            ? {
                ...task,
                subtasks: action.payload.subtasks,
              }
            : task;
        });
      })
      .addCase(addNewComment.fulfilled, (state, action) => {
        state.task = action.payload;
        state.tasks = state.tasks.map((task) => {
          return task._id === action.meta.arg.id
            ? {
                ...task,
                subtasks: action.payload.subtasks,
              }
            : task;
        });
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.task = action.payload;
        state.tasks = state.tasks.map((task) => {
          return task._id === action.meta.arg.id
            ? {
                ...task,
                subtasks: action.payload.subtasks,
              }
            : task;
        });
      });
  },
});

export const {
  selectTaskSingle,
  selectTasks,
  selectTaskBySearch,
  resetTasks,
  resetTaskMessage,
  setTaskProject,
} = tasksSlice.actions;

export default tasksSlice.reducer;

export const selectTasksByProject = (state) => state.tasks.tasksByProject;
export const taskSingle = (state) => state.tasks.task;
