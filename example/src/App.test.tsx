import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders hello text', () => {
  const { getByText } = render(<App />);
  const element = getByText(/Hello!/i);
  expect(element).toBeInTheDocument();
});
