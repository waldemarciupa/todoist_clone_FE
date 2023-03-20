import { ProjectInterface } from '../Projects/types';

export interface TaskInterface {
  _id: string;
  title: string;
  description: string;
  project: ProjectInterface;
  priority: string;
  user: string;
  completed: boolean;
  subtasks: TaskInterface[];
  comments: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface TasksState {
  error: string | undefined;
  message: string[];
  project: string;
  status: string;
  statusSingle: string;
  task: TaskInterface | null;
  tasks: TaskInterface[];
  tasksByProject: TaskInterface[];
  tasksBySearch: TaskInterface[];
}

export interface TaskPayload {
  id: string;
  title: string;
  description: string;
  project: string;
  priority: string;
}

export interface EditTaskPayload {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

export interface CompleteSubtaskPayload {
  completed: boolean;
  id: string;
  subtask_id: string;
}

export interface CommentPayload {
  comment: string;
  id: string;
  comment_id: string;
}

export interface TaskId {
  id: string;
}

export interface TaskUnderscoreId {
  task_id: string;
}
