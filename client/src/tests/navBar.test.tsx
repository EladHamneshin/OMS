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


  expect(screen.getByText('Sign In')).toBeInTheDocument();
  expect(screen.getByText('Sign Up')).toBeInTheDocument();
});
