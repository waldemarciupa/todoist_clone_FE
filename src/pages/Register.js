import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../features/User/userSlice';
import { StyledLogin, LoginForm } from '../components/styles/Login.styled';
import Input from '../components/Input';
import Label from '../components/Label';
import Button from '../components/Button';
import Error from '../components/Error';
import HelpBlock from '../components/HelpBlock';
import Disclaimer from '../components/Disclaimer';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const error = useSelector((state) => state.user.error);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(register({ name, email, password }))
      .unwrap()
      .then(() => {
        navigate('/');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <StyledLogin onSubmit={handleSubmit}>
        <LoginForm aria-label='form'>
          <img
            width='92px'
            height='24px'
            alt='logo'
            src='/images/todoist-logo.svg'
          />
          <h2>Sign up</h2>
          <Error>{error && error}</Error>
          <Label htmlFor='name'>Name</Label>
          <Input
            onChange={(event) => setName(event.target.value)}
            type='text'
            id='name'
            name='name'
            value={name}
          />
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
            value={password}
            mb='20px'
          />
          <Button primary>Sign up</Button>
          <HelpBlock register />
        </LoginForm>
      </StyledLogin>
      <Disclaimer />
    </>
  );
};

export default Register;
