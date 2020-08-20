import React from 'react';
import Header from '../Header/Header.js'
import { screen, fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Header', () => {

  it('should be a header', () => {
    render(<Header 
      view={'home'}
      currentUser={{}}
    />)

    const header = screen.getByRole('group');

    expect(header).to.toBeInTheDocument();
  })

  it('should only show the login button on the home page when no one is logged in', () => {
    render(<Header 
      view={'home'}
      currentUser={{}}
    />)

    const loginButton = screen.getByRole('button');

    expect(loginButton).toBeInTheDocument();
  })

  it('should fire displayLoginPage when the login button is clicked', () => {
    const mockDisplayLoginPage = jest.fn();

    render(<Header
      view={'home'}
      currentUser={{}}
      displayLoginPage={mockDisplayLoginPage}
    />)

    const loginButton = screen.getByRole('button');

    fireEvent.click(loginButton);

    expect(mockDisplayLoginPage).toHaveBeenCalledTimes(1);
  })

  it('should show the log out button when on the home screen and a user is logged in', () => {
    render(<Header
      view={'home'}
      currentUser={{name: 'Leeroy Jenkins'}}
    />)

    const logOutButton = screen.getByRole('button');

    expect(logOutButton).toBeInTheDocument();
  })

  it('should fire logOut when the logout button is clicked', () => {
    const mockLogOut = jest.fn();

    render(<Header
      view={'home'}
      currentUser={{ name: 'Leeroy Jenkins' }}
      logOut={mockLogOut}
    />)

    const logOutButton = screen.getByRole('button');

    fireEvent.click(logOutButton);

    expect(mockLogOut).toHaveBeenCalledTimes(1);
  })

  it('should show the home button when on the login page', () => {
    render(<Header
      view={'login'}
      currentUser={{}}
    />)

    const homeButton = screen.getByRole('button');

    expect(homeButton).toBeInTheDocument();
  })

  it('should fire displayHomePage when the home button is clicked', () => {
    const mockDisplayHomePage = jest.fn();

    render(<Header
      view={'login'}
      currentUser={{}}
      displayHomePage={mockDisplayHomePage}
    />)

    const homeButton = screen.getByRole('button');

    fireEvent.click(homeButton);

    expect(mockDisplayHomePage).toHaveBeenCalledTimes(1);
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
