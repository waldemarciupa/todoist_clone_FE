export interface TaskType {
  _id: string;
  title: string;
  description: string;
  project: string;
  priority: string;
  user: string;
  completed: boolean;
  subtasks: TaskType[];
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
  task: TaskType | null;
  tasks: TaskType[];
  tasksByProject: TaskType[];
  tasksBySearch: TaskType[];
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
