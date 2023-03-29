import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  fetchTaskSingle,
  editTask,
  taskSingle,
  addNewSubtask,
  deleteSubtask,
  completeSubtask,
  addNewComment,
  deleteComment,
} from './tasksSlice';
import { selectProjects } from '../Projects/projectsSlice';
import TaskCreate from './TaskCreate';
import Button from '../../components/Button';
import ButtonAddTask from '../../components/ButtonAddTask';
import { AiOutlineCheck, AiOutlineDelete } from 'react-icons/ai';

import {
  StyledTaskSingle,
  ProjectColorWrapper,
  ProjectColor,
  Project,
  Task,
  FlexLine,
  TaskTitle,
  TaskDescription,
  TaskDetails,
  ButtonsList,
  Button as TabButton,
  AddedOn,
  FormButtonWrapper,
  TabsComponent,
  CommentsContainer,
  StyledParagraph,
  SubtasksList,
  CommentsList,
  Comment,
  CommentUser,
  CommentDate,
  CommentContent,
  WriteComment,
  Input,
  AttachmentBtn,
  CommentDelete,
} from '../../components/styles/TaskSingle.styled';

import {
  ButtonWrapper,
  TaskButton,
  TaskButtonOuter,
  TaskButtonInner,
} from '../../components/styles/Home.styled';
import Note from '../../components/icons/Note';
import TaskItem from './TaskItem';
import Attachment from '../../components/icons/Attachment';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { TaskComment } from './types';

const TaskSingle = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const task = useAppSelector(taskSingle);
  const projects = useAppSelector(selectProjects);
  const taskStatus = useAppSelector((state) => state.tasks.statusSingle);
  const error = useAppSelector((state) => state.tasks.error);
  const user = useAppSelector((state) => state?.user);

  const [id] = useState(params.id);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [completed, setCompleted] = useState(false);
  const [addTaskVisible, setAddTaskVisible] = useState(false);

  const [projectColor, setProjectColor] = useState('rgb(5, 133, 39)');
  const [isEditingMode, setIsEditingMode] = useState(false);
  const [activeTab, setActiveTab] = useState('tab1');

  const [comment, setComment] = useState('');

  const subtasksNumber = task && task.subtasks.length;
  const commentsNumber = task && task.comments.length;

  useEffect(() => {
    if (taskStatus === 'idle') {
      dispatch(fetchTaskSingle({ id }));
    }

    if (taskStatus === 'succeeded') {
      const currentColor = projects.filter((project) => {
        return project.name === task?.project;
      });

      if (currentColor.length && currentColor[0].color) {
        setProjectColor(currentColor[0].color);
      }
      if (task) {
        setTitle(task.title);
        setDescription(task.description);
        setCompleted(task.completed);
      }
    }
  }, [dispatch, params.id, projects, task, taskStatus]);

  const startEdition = () => {
    if (completed) return;

    setIsEditingMode(true);
  };

  const finishEdition = () => {
    if (task) {
      setIsEditingMode(false);
      setTitle(task.title);
      setDescription(task.description);
    }
  };

  const saveTask = (event: { preventDefault: () => void }) => {
    if (id) {
      event.preventDefault();
      dispatch(editTask({ title, description, id, completed }));
      setIsEditingMode(false);
    }
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setActiveTab((event.target as HTMLButtonElement).value);
  };

  const toggleAddTaskVisible = () => {
    setAddTaskVisible(!addTaskVisible);
  };

  const handleDeleteSubtask = (
    event: React.MouseEvent<Element, MouseEvent>
  ) => {
    dispatch(
      deleteSubtask({
        id,
        subtask_id:
          event.currentTarget instanceof HTMLButtonElement
            ? event.currentTarget.dataset.subtask_id
            : '',
      })
    );
  };

  const submitComment = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    dispatch(addNewComment({ id, comment }));
    setComment('');
  };

  const handleDeleteComment = (
    event: React.MouseEvent<Element, MouseEvent>
  ) => {
    dispatch(
      deleteComment({
        id,
        comment_id:
          event.currentTarget instanceof HTMLButtonElement
            ? event.currentTarget.dataset.id
            : '',
        comment: '',
      })
    );
  };

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  return (
    <StyledTaskSingle>
      {(taskStatus === 'idle' || taskStatus === 'loading') && 'Loading...'}
      {taskStatus === 'failed' && error}
      {taskStatus === 'succeeded' && (
        <>
          <FlexLine>
            <ProjectColorWrapper>
              <ProjectColor color={projectColor} />
            </ProjectColorWrapper>
            <Project>{task?.project}</Project>
          </FlexLine>
          <form onSubmit={saveTask}>
            <Task isEditingMode={isEditingMode}>
              <FlexLine>
                <ButtonWrapper isEditingMode={isEditingMode}>
                  <TaskButton
                    type='button'
                    onClick={() => {
                      setCompleted(!completed);
                      dispatch(
                        editTask({
                          title,
                          description,
                          id,
                          completed: !completed,
                        })
                      );
                    }}
                  >
                    <TaskButtonOuter
                      completed={completed}
                      color={task ? task.priority : 'Priority 1'}
                    >
                      <TaskButtonInner
                        completed={completed}
                        color={task ? task.priority : 'Priority 1'}
                      >
                        <AiOutlineCheck
                          style={{
                            width: '9px',
                            height: '9px',
                          }}
                        />
                      </TaskButtonInner>
                    </TaskButtonOuter>
                  </TaskButton>
                </ButtonWrapper>
                <TaskTitle
                  completed={completed}
                  contentEditable={isEditingMode}
                  suppressContentEditableWarning={true}
                  isEditingMode={isEditingMode}
                  onClick={() => {
                    startEdition();
                  }}
                  onBlur={(e) => {
                    setTitle(e.target.innerText + ' ');
                  }}
                >
                  {title}
                </TaskTitle>
              </FlexLine>
              <TaskDescription
                completed={completed}
                contentEditable={isEditingMode}
                isEditingMode={isEditingMode}
                suppressContentEditableWarning={true}
                onClick={() => {
                  startEdition();
                }}
                onBlur={(e) => {
                  setDescription(e.target.innerText + ' ');
                }}
              >
                {description}
              </TaskDescription>
            </Task>
            <FormButtonWrapper isEditingMode={isEditingMode}>
              <Button primary type='submit'>
                Save
              </Button>
              <Button type='button' clickHandler={finishEdition}>
                Cancel
              </Button>
            </FormButtonWrapper>
          </form>
          <TaskDetails>
            <ButtonsList>
              <TabButton
                value='tab1'
                onClick={handleClick}
                tabSelected={activeTab === 'tab1' && true}
              >
                Sub-tasks
                <small> {subtasksNumber && subtasksNumber > 0}</small>
              </TabButton>
              <TabButton
                value='tab2'
                onClick={handleClick}
                tabSelected={activeTab === 'tab2' && true}
              >
                Comments
                <small> {commentsNumber && commentsNumber > 0}</small>
              </TabButton>
              <TabButton
                value='tab3'
                onClick={handleClick}
                tabSelected={activeTab === 'tab3' && true}
              >
                Activity
              </TabButton>
            </ButtonsList>
          </TaskDetails>
          <TabsComponent>
            {activeTab === 'tab1' && (
              <SubtasksList>
                {task?.subtasks.length ? (
                  <ul>
                    {task.subtasks.map((subtask) => {
                      return (
                        <TaskItem
                          key={subtask._id}
                          task={subtask}
                          task_id={id}
                          subtask_id={subtask._id}
                          deleteTaskHandler={handleDeleteSubtask}
                          dispatchAction={completeSubtask}
                        />
                      );
                    })}
                  </ul>
                ) : (
                  ''
                )}
                {addTaskVisible ? (
                  <TaskCreate
                    subtask
                    handleCancel={toggleAddTaskVisible}
                    action={addNewSubtask}
                    id={id}
                  />
                ) : (
                  <ButtonAddTask
                    onClick={toggleAddTaskVisible}
                    title='Add sub-task'
                  />
                )}
              </SubtasksList>
            )}
            {activeTab === 'tab2' && (
              <CommentsContainer>
                {task?.comments.length ? (
                  <>
                    <CommentsList>
                      {task.comments.map((comment: TaskComment) => {
                        const createdDate = comment.createdAt;
                        const date = new Date(createdDate).getDate();
                        const month = new Date(createdDate).getMonth();
                        const hours = new Date(createdDate).getHours();
                        const minutes = new Date(createdDate).getMinutes();
                        console.log(user);

                        return (
                          <Comment key={comment._id}>
                            <div>
                              <CommentUser>{user.data?.name}</CommentUser>
                              <CommentDate>
                                {date} {months[month]} {hours}:{minutes}
                              </CommentDate>
                            </div>
                            <CommentContent>{comment.content}</CommentContent>
                            <CommentDelete
                              data-id={comment._id}
                              title='Delete comment'
                              onClick={handleDeleteComment}
                            >
                              <AiOutlineDelete
                                style={{ width: '16px', height: '16px' }}
                              />
                            </CommentDelete>
                          </Comment>
                        );
                      })}
                    </CommentsList>
                  </>
                ) : (
                  <>
                    <Note />
                    <StyledParagraph>
                      Add relevant notes, links, files, photos, or anything else
                      here.
                    </StyledParagraph>
                  </>
                )}
                <WriteComment>
                  <form onSubmit={submitComment}>
                    <Input
                      required
                      placeholder='Write a comment'
                      value={comment}
                      onChange={(event) => setComment(event.target.value)}
                    />
                    <FlexLine style={{ justifyContent: 'space-between' }}>
                      <AttachmentBtn htmlFor='file-upload' title='Attach file'>
                        <Attachment />
                      </AttachmentBtn>
                      <input
                        style={{ display: 'none' }}
                        id='file-upload'
                        type='file'
                      />
                      <Button primary type='submit' width={'100px'}>
                        Comment
                      </Button>
                    </FlexLine>
                  </form>
                </WriteComment>
              </CommentsContainer>
            )}
            {task && activeTab === 'tab3' && (
              <AddedOn>
                Added on {new Date(task.createdAt).getDate()}{' '}
                {months[new Date(task.createdAt).getMonth()]}{' '}
                {new Date(task.createdAt).getFullYear()}
                {', '}
                {new Date(task.createdAt).getHours()}:
                {new Date(task.createdAt).getMinutes()}
              </AddedOn>
            )}
          </TabsComponent>
        </>
      )}
    </StyledTaskSingle>
  );
};

export default TaskSingle;
