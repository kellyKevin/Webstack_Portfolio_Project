import { render, screen } from '@testing-library/react';
import App from './App';

test('renders welcome message', () => {
  render(<App />);
  const welcomeElement = screen.getByText(/Sow the Seeds of a Greener Future/i);
  expect(welcomeElement).toBeInTheDocument();
});
