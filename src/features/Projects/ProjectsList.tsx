import {
  useState,
  useEffect,
  useRef,
  useCallback,
  MutableRefObject,
} from 'react';
import { fetchProjects, selectProjects } from './projectsSlice';
import {
  ListItem,
  ProjectContent,
  Project,
  ProjectColor,
  ProjectDots,
  ListMenu,
  MenuItem,
  MenuItemDelete,
  TaskCouter,
} from '../../components/styles/Home.styled';
import { AiOutlineEllipsis, AiOutlineDelete } from 'react-icons/ai';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { ProjectInterface } from './types';

const Message = styled.li`
  list-style: none;
  font-size: 13px;
  color: #808080;
  padding: 4px 0 4px 16px;
`;

interface ProjectsListProps {
  filterHandler: (query: string) => void;
  toggleProjectDeleteModal: () => void;
  setStateToDelete: (id: string, name: string) => void;
}

const ProjectsList = ({
  filterHandler,
  toggleProjectDeleteModal,
  setStateToDelete,
}: ProjectsListProps) => {
  const dispatch = useAppDispatch();
  const projects = useAppSelector(selectProjects);
  const projectsStatus = useAppSelector((state) => state.projects.status);
  const tasks = useAppSelector((state) => state.tasks.tasks);

  const ref: MutableRefObject<HTMLDivElement | null> = useRef(null);
  const [open, setOpen] = useState('');

  const tasksNumber = useCallback(
    (project: ProjectInterface) => {
      const number = tasks.filter((task) => {
        return task.project === project;
      }).length;

      return number ? number : null;
    },
    [tasks]
  );

  const handleClickOpen = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation();
    if (event.currentTarget.dataset.id) {
      setOpen(event.currentTarget.dataset.id);
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setOpen('');
    }
  };

  useEffect(() => {
    tasksNumber({ name: 'Work' });
    if (projectsStatus === 'idle') {
      dispatch(fetchProjects());
    }

    if (open) {
      document.addEventListener('click', handleClickOutside, true);
    }
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [open, dispatch, projects, projectsStatus, tasksNumber]);

  return (
    <ul>
      {projects.length ? (
        projects.map((project) => {
          return (
            <ListItem
              onClick={() => {
                filterHandler(project.name);
              }}
              key={project._id}
            >
              <ProjectColor color={project.color} />
              <ProjectContent>
                <Project>{project.name}</Project>
                <TaskCouter className='task-counter'>
                  {tasksNumber(project.name)}
                </TaskCouter>
                <ProjectDots data-id={project._id} onClick={handleClickOpen}>
                  <AiOutlineEllipsis
                    style={{ width: '100%', height: '100%' }}
                  />
                </ProjectDots>
                {open === project._id && (
                  <ListMenu ref={ref}>
                    <MenuItem
                      data-id={project._id}
                      onClick={(e: { stopPropagation: () => void }) => {
                        e.stopPropagation();
                        setOpen('');
                        toggleProjectDeleteModal();
                        setStateToDelete(project._id, project.name);
                      }}
                    >
                      <MenuItemDelete>
                        <AiOutlineDelete
                          style={{ width: '16px', height: '16px' }}
                        />
                      </MenuItemDelete>
                      <span>Delete project</span>
                    </MenuItem>
                  </ListMenu>
                )}
              </ProjectContent>
            </ListItem>
          );
        })
      ) : (
        <Message>Your list of projects will show up here.</Message>
      )}
    </ul>
  );
};

export default ProjectsList;
