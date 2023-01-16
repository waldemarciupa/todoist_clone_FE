import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
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

const TaskList = () => {
  const [addTaskVisible, setAddTaskVisible] = useState(false);

  const project = useSelector((state) => state.projects.single);
  const tasks = useSelector(selectTasksByProject);
  const taskStatus = useSelector((state) => state.tasks.status);
  const error = useSelector((state) => state.tasks.error);

  const dispatch = useDispatch();

  useEffect(() => {
    if (taskStatus === 'idle') {
      dispatch(fetchTasks());
    }
  }, [dispatch, taskStatus]);

  const deleteTaskHandler = (e) => {
    const task_id = e.currentTarget.parentNode.dataset.id;
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
