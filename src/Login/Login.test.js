import React from 'react';
import Login from '../Login/Login.js';
import dataFetcher from '../dataFetcher.js';
import sampleData from '../sampleData.js';
import { screen, render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
jest.mock('../dataFetcher.js');

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

  // it('should log the user in when the user\'s credentials are correct', () => {
  //   dataFetcher.getLoginResponse.mockResolvedValueOnce(sampleData.loginResponse);
  //   const mockDisplayHomePage = jest.fn();
  //   const mockUpdateCurrentUser = jest.fn();

  //   render(<Login displayHomePage={mockDisplayHomePage} updateCurrentUser={mockUpdateCurrentUser} />);

  //   const loginButton = screen.getByRole('button');

  //   fireEvent.click(loginButton);

  //   expect(mockUpdateCurrentUser).toHaveBeenCalledTimes(1);
  //   expect(mockDisplayHomePage).toHaveBeenCalledTimes(1);
  // })
})
