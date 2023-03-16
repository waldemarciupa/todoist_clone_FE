import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from 'react-router-dom';
import MainTemplate from './templates/MainTemplate';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import TasksList from './features/Tasks/TasksList';
import TaskSingle from './features/Tasks/TaskSingle';
import GlobalStyle from './components/styles/Global';
import { ReactElement } from 'react';
import { useAppSelector } from './app/hooks';

interface RequireAuthProps {
  children: ReactElement;
}

function RequireAuth({ children }: RequireAuthProps) {
  const location = useLocation();
  const auth = useAppSelector((state) => state.user.isLoggedIn);

  if (!auth) {
    return <Navigate to='/users/login' state={{ from: location }} replace />;
  }

  return children;
}

function App() {
  return (
    <>
      <GlobalStyle />
      <Router>
        <Routes>
          <Route path='/' element={<Navigate to='/task' />} />
          <Route
            path='/task'
            element={
              <RequireAuth>
                <MainTemplate />
              </RequireAuth>
            }
          >
            <Route path='' element={<TasksList />} />
            <Route path=':id' element={<TaskSingle />} />
          </Route>
          <Route path='/users/login' element={<Login />} />
          <Route path='/users/register' element={<Register />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
