import React from 'react';
import Header from '../Header/Header.js';
import { MemoryRouter } from 'react-router-dom';
import { screen, fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Header', () => {

  it('should display the user\'s email when someone is logged in', () => {
    render(
      <MemoryRouter>
        <Header
          view={'home'}
          currentUser={{name: 'Beauex', email: 'hello123@yahoo.com'}}
        />
      </MemoryRouter>
    )
    
    const userEmail = screen.getByText('hello123@yahoo.com');

    expect(userEmail).toBeInTheDocument();
  })

  it('should only show the login button on the home page when no one is logged in', () => {
    render(
      <MemoryRouter>
        <Header
          view={'home'}
          currentUser={{}}
        />
      </MemoryRouter>
    )

    const loginButton = screen.getByRole('button', {name: 'Login'});

    expect(loginButton).toBeInTheDocument();
  })

  it('should fire displayLoginPage when the login button is clicked', () => {
    const mockSetLoginView = jest.fn();

    render(
      <MemoryRouter>
        <Header
          view={'home'}
          currentUser={{}}
          setLoginView={mockSetLoginView}
        />
      </MemoryRouter>
    )

    const loginButton = screen.getByRole('button', {name: 'Login'});

    fireEvent.click(loginButton);

    expect(mockSetLoginView).toHaveBeenCalledTimes(1);
  })

  it('should show the log out button when on the home screen and a user is logged in', () => {
    render(
      <MemoryRouter>
        <Header
          view={'home'}
          currentUser={{ name: 'Leeroy Jenkins' }}
        />
      </MemoryRouter>
    )

    const logOutButton = screen.getByRole('button', {name: 'Log Out'});

    expect(logOutButton).toBeInTheDocument();
  })

  it('should fire logOut when the logout button is clicked', () => {
    const mockLogOut = jest.fn();

    render(
      <MemoryRouter>
        <Header
          view={'home'}
          currentUser={{ name: 'Leeroy Jenkins' }}
          logOut={mockLogOut}
        />
      </MemoryRouter>
    )

    const logOutButton = screen.getByText('Log Out');

    fireEvent.click(logOutButton);

    expect(mockLogOut).toHaveBeenCalledTimes(1);
  })

  it('should show the home button when on the login page', () => {
    render(
      <MemoryRouter>
        <Header
          view={'login'}
          currentUser={{}}
        />
      </MemoryRouter>
    )

    const homeButton = screen.getByRole('button');

    expect(homeButton).toBeInTheDocument();
  })

  it('should fire displayHomePage when the home button is clicked', () => {
    const mockSetHomeView = jest.fn();

    render(
      <MemoryRouter>
        <Header
          view={'login'}
          currentUser={{}}
          setHomeView={mockSetHomeView}
        />
      </MemoryRouter>
    )

    const homeButton = screen.getByRole('button');

    fireEvent.click(homeButton);

    expect(mockSetHomeView).toHaveBeenCalledTimes(1);
  })

  it('should show the home and login buttons when on the movie info page and no one is logged in', () => {
    render(
      <MemoryRouter>
        <Header
          view={'movie'}
          currentUser={{}}
        />
      </MemoryRouter>
    )
    
    const homeButton = screen.getByRole('button', { name: 'Home'})
    const loginButton = screen.getByRole('button', { name: 'Login'})

    expect(homeButton).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  })
})
