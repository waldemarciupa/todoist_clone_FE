import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
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

const Header = ({ showModal, isAsideVisible, toggleAside, filterHandler }) => {
  const [searchInput, setSearchInput] = useState('');
  const [searchBoxVisible, setSearchsearchBoxVisible] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const searchTasks = useSelector((state) => state.tasks.tasksBySearch);

  const logoutHandler = () => {
    dispatch(logout());
    dispatch(resetTasks());
    dispatch(resetProjects());
    navigate('/users/login');
  };

  const handleSubmit = (event) => {
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
            filterHandler();
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
            onBlur={(e) => {
              e.relatedTarget?.click();
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
              searchTasks.map((task) => (
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
                    <Project>{task.project}</Project>
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
