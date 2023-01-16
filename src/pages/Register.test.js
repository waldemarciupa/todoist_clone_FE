import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { render, screen } from '../test-utils';
import Register from './Register';

const setup = () =>
  render(
    <BrowserRouter>
      <Register />
    </BrowserRouter>
  );

describe('Register test', () => {
  test('should be able to find form element', () => {
    setup();
    screen.getByRole('form');
  });

  test('inputs should be initially empty', () => {
    setup();
    expect(screen.getByLabelText('Name').value).toBe('');
    expect(screen.getByLabelText('Email').value).toBe('');
    expect(screen.getByLabelText('Password').value).toBe('');
  });

  test('should be able to type a name, an email and password', () => {
    setup();

    userEvent.type(screen.getByLabelText('Name'), 'John');
    expect(screen.getByLabelText('Name')).toHaveValue('John');

    userEvent.type(screen.getByLabelText('Email'), 'email@gmail.com');
    expect(screen.getByLabelText('Email')).toHaveValue('email@gmail.com');

    userEvent.type(screen.getByLabelText('Password'), 'realy!strongp4ssw0rd');
    expect(screen.getByLabelText('Password')).toHaveValue(
      'realy!strongp4ssw0rd'
    );
  });
});
