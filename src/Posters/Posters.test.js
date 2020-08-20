import React from 'react';
import Poster from '../Poster/Poster.js'
import Posters from '../Posters/Posters.js'
import Header from '../Header/Header.js'
import { screen, fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import sampleMovies from '../sampleMovies.js'

describe('Posters Component', () => {


  it('should have correct content when rendered', () => {
    render(<Posters posters={ sampleMovies } displayMovieInfoPage={jest.fn()} />)

    const poster1 = screen.getByAltText('Greenland')
    const poster2 = screen.getByAltText('Archive')
    const poster3 = screen.getByAltText('Akira')
    const poster4 = screen.getByAltText('Friend of the World')
    const poster5 = screen.getByAltText('The Secret Garden')

    expect(poster1).toBeInTheDocument();
    expect(poster2).toBeInTheDocument();
    expect(poster3).toBeInTheDocument();
    expect(poster4).toBeInTheDocument();
    expect(poster5).toBeInTheDocument();
  });

  it('should be returned as a single article', () => {
    render(<Posters posters={ sampleMovies } displayMovieInfoPage={jest.fn()} />)

    const posters = screen.getByRole('article')

    expect(posters).toBeInTheDocument()
  })
})
