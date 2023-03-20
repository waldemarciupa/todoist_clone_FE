import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../features/User/userSlice';
import { StyledLogin, LoginForm } from '../components/styles/Login.styled';
import Input from '../components/Input';
import Label from '../components/Label';
import Button from '../components/Button';
import Error from '../components/Error';
import HelpBlock from '../components/HelpBlock';
import Disclaimer from '../components/Disclaimer';
import { useAppDispatch, useAppSelector } from '../app/hooks';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const error = useAppSelector((state) => state.user.error) as string;

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    dispatch(login({ email, password }))
      .unwrap()
      .then(() => {
        navigate('/');
      })
      .catch((error: unknown) => {
        console.error(error);
      });
  };

  return (
    <>
      <StyledLogin onSubmit={handleSubmit}>
        <LoginForm>
          <img
            width='92px'
            height='24px'
            alt='logo'
            src='/images/todoist-logo.svg'
          />
          <h2>Log in</h2>
          <Error>{error && error}</Error>
          <Label htmlFor='email'>Email</Label>
          <Input
            onChange={(event) => setEmail(event.target.value)}
            type='email'
            id='email'
            name='email'
            value={email}
          />
          <Label htmlFor='password'>Password</Label>
          <Input
            onChange={(event) => setPassword(event.target.value)}
            type='password'
            id='password'
            name='password'
            mb='20px'
            value={password}
          />
          <Button primary>Log in</Button>
          <HelpBlock />
        </LoginForm>
      </StyledLogin>
      <Disclaimer />
    </>
  );
};

export default Login;
