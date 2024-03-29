import { MouseEvent, useEffect, useState } from 'react';
import { selectProjects } from '../Projects/projectsSlice';
import { resetTaskMessage } from './tasksSlice';
import styled from 'styled-components';
import Button from '../../components/Button';
import { Input } from '../../components/styles/TaskSingle.styled';
import { AiOutlineFundProjectionScreen, AiOutlineFlag } from 'react-icons/ai';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

interface TaskContentProps {
  modal?: boolean;
}

const TaskContent = styled.div<TaskContentProps>`
  padding: ${(props) => (props.modal ? '16px 16px 0' : '10px')};
  border: ${(props) => (props.modal ? 'none' : '1px solid #ddd')};
  margin-top: ${(props) => (props.modal ? 'none' : '4px')};
  border-radius: 5px;
  display: flex;
  flex-direction: column;
`;

const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;

  ul {
    position: absolute;
    background: #fff;
    border: 1px solid rgba(0, 0, 0, 0.1);
    box-shadow: 0 2px 4px 0 rgb(0 0 0 / 8%);
    list-style: none;
    top: 0;
    width: 275px;
    border-radius: 5px;
  }
`;

interface ActionButtonProps {
  subtask?: boolean;
}

const ActionButton = styled.button<ActionButtonProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 4px;
  color: #555;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 4px 8px;
  background: transparent;
  disabled: ${(props) => (props.subtask ? 'true' : 'false')};
  cursor: ${(props) => (props.subtask ? 'default' : 'pointer')};

  &:hover {
    background: #eee;
  }
`;

interface ProjectListProps {
  visible: boolean;
}

const ProjectList = styled.ul<ProjectListProps>`
  left: 0;
  display: ${(props) => (props.visible ? 'block' : 'none')};
`;

interface PriorityListProps {
  visible: boolean;
}

const PriorityList = styled.ul<PriorityListProps>`
  right: 0;
  display: ${(props) => (props.visible ? 'block' : 'none')};
`;

const ListItem = styled.li`
  display: flex;
  grid-gap: 8px;
  align-items: center;
  padding: 6px 12px;
  cursor: pointer;

  &:hover {
    background: #ddd;
  }
`;

const FlagIcon = styled(AiOutlineFlag)`
  width: 20px;
  height: auto;
  color: ${(props) => props.color};
`;

interface ButtonsWrapperProps {
  modal?: boolean;
}

const ButtonsWrapper = styled.div<ButtonsWrapperProps>`
  display: grid;
  grid-template-columns: 100px 100px 1fr;
  grid-gap: 10px;
  padding: 16px;
  border-top: ${(props) => (props.modal ? '1px solid #ddd' : 'none')};
`;

interface TaskCreateProps {
  isModal?: boolean;
  hideModal?: any;
  handleCancel: any;
  action: any;
  id: string | undefined;
  subtask: boolean;
}

const TaskCreate = ({
  isModal,
  hideModal,
  handleCancel,
  action,
  id,
  subtask,
}: TaskCreateProps) => {
  const [isProjectVisible, setIsProjectVisible] = useState(false);
  const [isPriorityVisible, setIsPriorityVisible] = useState(false);

  const dispatch = useAppDispatch();
  const projects = useAppSelector(selectProjects);
  const projectSingle = useAppSelector((state) => state.projects.single);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [project, setProject] = useState('');
  const [priority, setPriority] = useState('Priority 4');

  useEffect(() => {
    setProject(projectSingle === 'All tasks' ? 'Today' : projectSingle);
  }, [projectSingle]);

  const handleProject = (event: MouseEvent<HTMLLIElement>) => {
    setProject((event.target as HTMLElement).innerText);
    setIsProjectVisible(false);
  };

  const handlePriority = (event: MouseEvent<HTMLLIElement>) => {
    setPriority((event.target as HTMLElement).innerText);
    setIsPriorityVisible(false);
  };

  const taskCreate = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    dispatch(
      action({
        id: id ? id : '',
        title,
        description,
        project,
        priority,
      })
    );
    setTitle('');
    setDescription('');
    setProject(projectSingle === 'All tasks' ? 'Today' : projectSingle);
    setPriority('Priority 4');
    hideModal && hideModal();
    setTimeout(() => {
      dispatch(resetTaskMessage());
    }, 3000);
  };

  return (
    <form onSubmit={taskCreate}>
      <TaskContent modal={isModal}>
        <Input
          required
          primary
          placeholder='e.g., Family lunch on Sunday at 11am'
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <Input
          required
          placeholder='Description'
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
        <Actions>
          {subtask ? (
            <div></div>
          ) : (
            <ActionButton
              onClick={() => {
                setIsPriorityVisible(false);
                setIsProjectVisible(!isProjectVisible);
              }}
              title='Select a project'
              type='button'
            >
              <AiOutlineFundProjectionScreen />
              {project}
            </ActionButton>
          )}

          {projects.length ? (
            <ProjectList visible={isProjectVisible}>
              {projects.map((project) => {
                return (
                  <ListItem key={project._id} onClick={handleProject}>
                    {project.name}
                  </ListItem>
                );
              })}
            </ProjectList>
          ) : null}
          <ActionButton
            onClick={() => {
              setIsProjectVisible(false);
              setIsPriorityVisible(!isPriorityVisible);
            }}
            title='Set the priority p1, p2, p3, p4'
            type='button'
          >
            <AiOutlineFlag />
            {priority}
          </ActionButton>
          <PriorityList visible={isPriorityVisible}>
            <ListItem onClick={handlePriority}>
              <FlagIcon color={'red'} />
              Priority 1
            </ListItem>
            <ListItem onClick={handlePriority}>
              <FlagIcon color={'orange'} />
              Priority 2
            </ListItem>
            <ListItem onClick={handlePriority}>
              <FlagIcon color={'blue'} />
              Priority 3
            </ListItem>
            <ListItem onClick={handlePriority}>
              <FlagIcon />
              Priority 4
            </ListItem>
          </PriorityList>
        </Actions>
      </TaskContent>
      <ButtonsWrapper>
        <Button type='submit' primary>
          Add task
        </Button>
        <Button clickHandler={handleCancel} type='button'>
          Cancel
        </Button>
      </ButtonsWrapper>
    </form>
  );
};

export default TaskCreate;
