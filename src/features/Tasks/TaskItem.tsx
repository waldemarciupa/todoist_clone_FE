import { MouseEvent } from 'react';
import { selectTaskSingle } from './tasksSlice';
import { AiOutlineDelete, AiOutlineCheck } from 'react-icons/ai';
import {
  Task,
  ButtonWrapper,
  TaskButton,
  TaskButtonOuter,
  TaskButtonInner,
  TaskContent,
  TaskLink,
  Subtask,
  TaskActions,
  TaskTitle,
  TaskDescription,
  BranchWrapper,
  TaskProject,
  TaskBottomWrapper,
  Container,
} from '../../components/styles/Home.styled';
import Branch from '../../components/icons/Branch';
import Comment from '../../components/icons/Comment';
import { useAppDispatch } from '../../app/hooks';

import { ITask } from './types';

interface TaskItemProps {
  task: ITask;
  deleteTaskHandler: (task_id: string) => void;
  task_id: string | undefined;
  subtask_id?: string;
  dispatchAction: any;
}

const TaskItem = ({
  task,
  deleteTaskHandler,
  task_id,
  subtask_id,
  dispatchAction,
}: TaskItemProps) => {
  const dispatch = useAppDispatch();

  return (
    <Task data-id={task._id} subtask_id={subtask_id}>
      <ButtonWrapper>
        <TaskButton>
          <TaskButtonOuter
            title='Complete task'
            completed={task.completed}
            onClick={() => {
              dispatch(
                dispatchAction({
                  completed: !task.completed,
                  id: task_id,
                  subtask_id,
                })
              );
            }}
            color={task.priority}
          >
            <TaskButtonInner completed={task.completed} color={task.priority}>
              <AiOutlineCheck style={{ width: '9px', height: '9px' }} />
            </TaskButtonInner>
          </TaskButtonOuter>
        </TaskButton>
      </ButtonWrapper>
      <TaskContent>
        {subtask_id ? (
          <Subtask>
            <TaskTitle completed={task.completed}>{task.title}</TaskTitle>
            <TaskDescription>{task.description}</TaskDescription>
          </Subtask>
        ) : (
          <TaskLink
            onClick={() => {
              dispatch(selectTaskSingle(task._id));
            }}
            to={`/task/${task._id}`}
          >
            <TaskTitle completed={task.completed}>{task.title}</TaskTitle>
            <TaskDescription>{task.description}</TaskDescription>
            <TaskBottomWrapper>
              <Container>
                {task.subtasks && task.subtasks.length ? (
                  <BranchWrapper>
                    <Branch />
                    {task.subtasks.filter((task) => task.completed).length}/
                    {task.subtasks.length}
                  </BranchWrapper>
                ) : (
                  ''
                )}
                {task.comments && task.comments.length ? (
                  <BranchWrapper>
                    <Comment />
                    {task.comments.length}
                  </BranchWrapper>
                ) : (
                  ''
                )}
              </Container>
              <TaskProject>{task.project}</TaskProject>
            </TaskBottomWrapper>
          </TaskLink>
        )}
      </TaskContent>
      <TaskActions
        data-subtask_id={subtask_id}
        title='Delete'
        onClick={() => deleteTaskHandler(task._id)}
      >
        <AiOutlineDelete style={{ color: '#202020' }} />
      </TaskActions>
    </Task>
  );
};

export default TaskItem;
