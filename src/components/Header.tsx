import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../features/User/userSlice';
import {
  resetTasks,
  selectTaskBySearch,
  selectTaskSingle,
} from '../features/Tasks/tasksSlice';
import { resetProjects } from '../features/Projects/projectsSlice';
import Button from './Button';
import {
  StyledHeader,
  Control,
  StyledButton,
  SearchBar,
  Search,
  SearchBox,
  SearchClose,
  TaskLink,
  EmptySearch,
  TaskLinkBottom,
  Project,
  Description,
} from './styles/Header.styled';
import {
  AiOutlineHome,
  AiOutlineMenu,
  AiOutlinePlus,
  AiOutlineBell,
  AiOutlineSearch,
  AiOutlineClose,
} from 'react-icons/ai';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { TaskInterface } from '../features/Tasks/types';

interface HeaderProps {
  showModal: () => void;
  isAsideVisible: boolean;
  toggleAside: React.MouseEventHandler<HTMLButtonElement>;
  filterHandler: (query: string | null) => void;
}

const Header = ({
  showModal,
  isAsideVisible,
  toggleAside,
  filterHandler,
}: HeaderProps) => {
  const [searchInput, setSearchInput] = useState('');
  const [searchBoxVisible, setSearchsearchBoxVisible] = useState(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const searchTasks = useAppSelector((state) => state.tasks.tasksBySearch);

  const logoutHandler = () => {
    dispatch(logout());
    dispatch(resetTasks());
    dispatch(resetProjects());
    navigate('/users/login');
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(selectTaskBySearch(searchInput));
  };

  return (
    <StyledHeader>
      <Control>
        <StyledButton
          title={isAsideVisible ? 'Close menu' : 'Open menu'}
          onClick={toggleAside}
        >
          <AiOutlineMenu />
        </StyledButton>
        <StyledButton
          title='Home'
          onClick={() => {
            navigate('/task');
            filterHandler(null);
          }}
        >
          <AiOutlineHome />
        </StyledButton>
        <SearchBar onSubmit={handleSubmit}>
          <StyledButton search type='submit' title='Search'>
            <AiOutlineSearch />
          </StyledButton>
          <Search
            value={searchInput}
            onChange={(e) => {
              setSearchInput(e.currentTarget.value);
              dispatch(selectTaskBySearch(e.currentTarget.value));
            }}
            onFocus={() => {
              setSearchsearchBoxVisible(true);
            }}
            onBlur={(event) => {
              const el = event.relatedTarget as HTMLElement;
              el.click();
              setSearchsearchBoxVisible(false);
              setSearchInput('');
            }}
            placeholder='Search'
          />
          <SearchClose title='Close'>
            <AiOutlineClose />
          </SearchClose>
          <SearchBox visible={searchBoxVisible}>
            {searchTasks.length > 0 ? (
              searchTasks.map((task: TaskInterface) => (
                <TaskLink
                  to={`/task/${task._id}`}
                  onClick={() => {
                    dispatch(selectTaskSingle(task._id));
                  }}
                  key={task._id}
                >
                  {task.title}
                  <TaskLinkBottom>
                    <Description>{task.description}</Description>
                    <Project>{task.project.name}</Project>
                  </TaskLinkBottom>
                </TaskLink>
              ))
            ) : (
              <EmptySearch>
                No matches for {searchInput ? searchInput : 'empty search'}
              </EmptySearch>
            )}
          </SearchBox>
        </SearchBar>
      </Control>
      <Control>
        <StyledButton onClick={showModal} title='Add task'>
          <AiOutlinePlus />
        </StyledButton>
        <StyledButton>
          <AiOutlineBell />
        </StyledButton>
        <Button title='Log out' primary clickHandler={logoutHandler}>
          Log out
        </Button>
      </Control>
    </StyledHeader>
  );
};

export default Header;
