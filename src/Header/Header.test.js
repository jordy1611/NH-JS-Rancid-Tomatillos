import React from 'react';
import Header from '../Header/Header.js'
import { screen, fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Header', () => {

  it('should only show the login button on the home page when no one is logged in', () => {
    render(<Header 
      view={'home'}
      currentUser={{}}
    />)

    const loginButton = screen.getByRole('button');

    expect(loginButton).toBeInTheDocument();
  })

  it('should show the log out button when on the home screen and a user is logged in', () => {
    render(<Header
      view={'home'}
      currentUser={{name: 'Leeroy Jenkins'}}
    />)

    const logOutButton = screen.getByRole('button');

    expect(logOutButton).toBeInTheDocument();
  })

  it('should show the home button when on the login page', () => {
    render(<Header
      view={'login'}
      currentUser={{}}
    />)

    const homeButton = screen.getByRole('button');

    expect(homeButton).toBeInTheDocument();
  })

  it('should show the home and login buttons when on the movie info page and no one is logged in', () => {
    render(<Header
      view={'movie'}
      currentUser={{}}
    />)

    const homeButton = screen.getByTestId('home');
    const loginButton = screen.getByTestId('login');

    expect(homeButton).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  })
})
