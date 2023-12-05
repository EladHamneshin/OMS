import React from 'react';
import { render, screen } from '@testing-library/react';
import NavBar from '../pages/navBar';
import { MemoryRouter } from 'react-router-dom';

test('renders NavBar component', () => {
  render(
    <MemoryRouter>
      <NavBar />
    </MemoryRouter>
  );

  // You can add more specific tests based on your component's behavior
  expect(screen.getByText('Sign In')).toBeInTheDocument();
  expect(screen.getByText('Sign Up')).toBeInTheDocument();
  expect(screen.getByText('Orders')).toBeInTheDocument();
  expect(screen.getByText('Logout')).toBeInTheDocument();
});
