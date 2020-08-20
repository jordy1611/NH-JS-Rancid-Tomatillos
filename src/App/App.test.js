import React from 'react';
import App from './App';
import Posters from '../Posters/Posters.js'
import Header from '../Header/Header.js'
import Login from '../Login/Login.js'
import MovieInfo from '../MovieInfo/MovieInfo.js'
import { screen, fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom';


test('renders learn react link', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
