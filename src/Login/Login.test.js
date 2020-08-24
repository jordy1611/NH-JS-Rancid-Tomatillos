import React from 'react';
import Login from '../Login/Login.js'
import { screen, render } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Login', () => {

  it('should have the correct content when rendered', () => {
    render(<Login displayHomePage={jest.fn()} updateCurrentUser={jest.fn()}/>)

    const userNameLabel = screen.getByText('Email')
    const userNameInput = screen.getByPlaceholderText('email')
    const passwordLabel = screen.getByText('Password')
    const passwordInput = screen.getByPlaceholderText('password')
    const loginButton = screen.getByRole('button')

    expect(userNameLabel).toBeInTheDocument()
    expect(userNameInput).toBeInTheDocument()
    expect(passwordLabel).toBeInTheDocument()
    expect(passwordInput).toBeInTheDocument()
    expect(loginButton).toBeInTheDocument()
  })

  it('should fire 3 functions when the login button is clicked', () => {
    // login being passed into login from app is actually never used, need to remove prop
    // login uses its own login mathod which has some fetching going on

    // const mockLogin = jest.fn(), mockDisplayHomePage = jest.fn(), mockUpdateCurrentUser = jest.fn();
    // render(<Login login={mockLogin} displayHomePage={mockDisplayHomePage} updateCurrentUser={mockUpdateCurrentUser}/>)
    // //
    // const loginButton = screen.getByTestId('login-button')
    // //
    // fireEvent.click(loginButton)
    //
    // expect(fmockLogin).toBeCalledTimes(1)
  })
})
