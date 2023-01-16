import { render, screen } from './test-utils';
import App from './App';

test('renders sign up button', () => {
  render(<App />, []);
  const signUpBtn = screen.getByText('Sign up');
  expect(signUpBtn).toBeInTheDocument();
});
