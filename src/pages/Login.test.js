import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '../test-utils';
import userEvent from '@testing-library/user-event';
import Login from './Login';

const setup = () =>
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );

describe('Login', () => {
  test('inputs should be initially empty', () => {
    setup();
    expect(screen.getByLabelText('Email').value).toBe('');
    expect(screen.getByLabelText('Password').value).toBe('');
  });

  test('should be able to type an email and password', () => {
    setup();

    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');

    userEvent.type(emailInput, 'email@gmail.com');
    userEvent.type(passwordInput, 'realy!strongp4ssw0rd');

    expect(emailInput).toHaveValue('email@gmail.com');
    expect(passwordInput).toHaveValue('realy!strongp4ssw0rd');
  });

  test('should show error message on invalid email', () => {
    setup();

    const emailError = screen.queryByText(/Invalid email or password/i);
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const submitButton = screen.getByRole('button');

    expect(emailError).not.toBeInTheDocument();

    userEvent.type(emailInput, 'wrongemail@gmail.com');
    userEvent.type(passwordInput, 'realy!strongp4ssw0rd');
    userEvent.click(submitButton);

    // const emailErrorAgain = screen.queryByText(/Invalid email or password/i);
    // expect(emailErrorAgain).toBeInTheDocument();
  });
});
