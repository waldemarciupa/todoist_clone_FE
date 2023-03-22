import { IProject } from '../Projects/types';

export interface ITask {
  _id: string;
  title: string;
  description: string;
  project: IProject;
  priority: TaskPriority;
  user: string;
  completed: boolean;
  subtasks: ITask[];
  comments: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export type TaskPriority =
  | 'Priority 1'
  | 'Priority 2'
  | 'Priority 3'
  | 'Priority 4';

export interface TasksState {
  error: string | undefined;
  message: string[];
  project: string;
  status: string;
  statusSingle: string;
  task: ITask | null;
  tasks: ITask[];
  tasksByProject: ITask[];
  tasksBySearch: ITask[];
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
