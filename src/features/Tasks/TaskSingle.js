import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
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

const TaskSingle = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const task = useSelector(taskSingle);
  const projects = useSelector(selectProjects);
  const taskStatus = useSelector((state) => state.tasks.statusSingle);
  const error = useSelector((state) => state.tasks.error);
  const user = useSelector((state) => state.user.data.name);

  const [id] = useState(params.id);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [completed, setCompleted] = useState('');
  const [addTaskVisible, setAddTaskVisible] = useState(false);

  const [projectColor, setProjectColor] = useState('rgb(5, 133, 39)');
  const [isEditingMode, setIsEditingMode] = useState(false);
  const [activeTab, setActiveTab] = useState('tab1');

  const [comment, setComment] = useState('');

  const subtasksNumber = task && task.subtasks.length;
  const commentsNumber = task && task.comments.length;

  useEffect(() => {
    if (taskStatus === 'idle') {
      dispatch(fetchTaskSingle({ id: params.id }));
    }

    if (taskStatus === 'succeeded') {
      const currentColor = projects.filter((project) => {
        return project.name === task.project;
      });

      if (currentColor.length) {
        setProjectColor(currentColor[0].color);
      }
      setTitle(task.title);
      setDescription(task.description);
      setCompleted(task.completed);
    }
  }, [dispatch, params.id, projects, task, taskStatus]);

  const startEdition = () => {
    if (completed) return;

    setIsEditingMode(true);
  };

  const finishEdition = (e) => {
    setIsEditingMode(false);
    setTitle(task.title);
    setDescription(task.description);
  };

  const saveTask = (e) => {
    e.preventDefault();
    dispatch(editTask({ title, description, id, completed }));
    setIsEditingMode(false);
  };

  const handleClick = (e) => {
    setActiveTab(e.target.value);
  };

  const toggleAddTaskVisible = () => {
    setAddTaskVisible(!addTaskVisible);
  };

  const handleDeleteSubtask = (event) => {
    dispatch(
      deleteSubtask({
        id,
        subtask_id: event.currentTarget.dataset.subtask_id,
      })
    );
  };

  const submitComment = (event) => {
    event.preventDefault();
    dispatch(addNewComment({ id, comment }));
    setComment('');
  };

  const handleDeleteComment = (event) => {
    dispatch(
      deleteComment({
        id,
        comment_id: event.currentTarget.dataset.id,
      })
    );
  };

  const months = {
    0: 'January',
    1: 'February',
    2: 'March',
    3: 'April',
    4: 'May',
    5: 'June',
    6: 'July',
    7: 'August',
    8: 'September',
    9: 'October',
    10: 'November',
    11: 'December',
  };

  if (taskStatus === 'idle' || taskStatus === 'loading') {
    return <StyledTaskSingle>Loading...</StyledTaskSingle>;
  }

  if (taskStatus === 'failed') {
    return <StyledTaskSingle>{error}</StyledTaskSingle>;
  }

  if (taskStatus === 'succeeded') {
    return (
      <StyledTaskSingle>
        <FlexLine>
          <ProjectColorWrapper>
            <ProjectColor color={projectColor} />
          </ProjectColorWrapper>
          <Project>{task.project}</Project>
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
                  <TaskButtonOuter completed={completed} color={task.priority}>
                    <TaskButtonInner
                      completed={completed}
                      color={task.priority}
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
                onClick={(e) => {
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
              <small> {subtasksNumber > 0 && subtasksNumber}</small>
            </TabButton>
            <TabButton
              value='tab2'
              onClick={handleClick}
              tabSelected={activeTab === 'tab2' && true}
            >
              Comments
              <small> {commentsNumber > 0 && commentsNumber}</small>
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
              {task.subtasks.length ? (
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
              {task.comments.length ? (
                <>
                  <CommentsList>
                    {task.comments.map((comment) => {
                      return (
                        <Comment key={comment._id}>
                          <div>
                            <CommentUser>{user}</CommentUser>
                            <CommentDate>
                              {new Date(comment.createdAt).getDate()}{' '}
                              {months[new Date(comment.createdAt).getMonth()]}{' '}
                              {new Date(comment.createdAt).getHours()}:
                              {new Date(comment.createdAt).getMinutes()}
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
          {activeTab === 'tab3' && (
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
      </StyledTaskSingle>
    );
  }
};

export default TaskSingle;
