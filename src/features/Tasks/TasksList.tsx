import { useState, useEffect } from 'react';
import {
  addNewTask,
  fetchTasks,
  deleteTask,
  selectTasksByProject,
  resetTaskMessage,
  editTask,
} from './tasksSlice';
import {
  ListBox,
  DateHeader,
  DateToday,
  TasksList,
} from '../../components/styles/Home.styled';
import ButtonAddTask from '../../components/ButtonAddTask';
import Bicycle from '../../components/icons/Bicycle';
import Peace from '../../components/icons/Peace';
import Paint from '../../components/icons/Paint';
import EmptyState from '../../components/EmptyState';
import TaskCreate from './TaskCreate';
import TaskItem from './TaskItem';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

const TaskList = () => {
  const [addTaskVisible, setAddTaskVisible] = useState(false);

  const project = useAppSelector((state) => state.projects.single);
  const tasks = useAppSelector(selectTasksByProject);
  const taskStatus = useAppSelector((state) => state.tasks.status);
  const error = useAppSelector((state) => state.tasks.error);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (taskStatus === 'idle') {
      dispatch(fetchTasks());
    }
  }, [dispatch, taskStatus]);

  const deleteTaskHandler = (e: {
    target: { parentElement: { dataset: { id: string } } };
  }) => {
    const task_id = e.target.parentElement.dataset.id;
    dispatch(deleteTask({ task_id }));
    setTimeout(() => {
      dispatch(resetTaskMessage());
    }, 3000);
  };

  const toggleAddTaskVisible = () => {
    setAddTaskVisible(!addTaskVisible);
  };

  return (
    <ListBox>
      <DateHeader>
        {project}{' '}
        {project === 'Today' && (
          <DateToday>{new Date().toDateString()}</DateToday>
        )}
      </DateHeader>
      <TasksList>
        {taskStatus === 'failed' && error + ' Please refresh the page'}
        {tasks.length
          ? tasks.map((task) => {
              return (
                <TaskItem
                  key={task._id}
                  task={task}
                  task_id={task._id}
                  dispatchAction={editTask}
                  deleteTaskHandler={deleteTaskHandler}
                />
              );
            })
          : null}
        <li>
          {addTaskVisible ? (
            <TaskCreate
              handleCancel={toggleAddTaskVisible}
              action={addNewTask}
            />
          ) : (
            <ButtonAddTask onClick={toggleAddTaskVisible} title='Add task' />
          )}
        </li>
      </TasksList>
      {!tasks.length ? (
        <>
          <EmptyState>
            {project === 'All tasks' && <Peace />}
            {project === 'Today' && <Bicycle />}
            {project !== 'All tasks' && project !== 'Today' && <Paint />}
          </EmptyState>
        </>
      ) : null}
    </ListBox>
  );
};

export default TaskList;
