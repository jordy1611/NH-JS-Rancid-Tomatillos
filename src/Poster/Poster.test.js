import React from 'react';
import Poster from '../Poster/Poster.js'
import { screen, fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Poster Component', () => {
  let poster;
  beforeAll(() => {
    poster = {
      "id": 524047,
      "poster_path": "https://image.tmdb.org/t/p/original//sA154deR0X51EcR2lm2FfDczryg.jpg",
      "backdrop_path": "https://image.tmdb.org/t/p/original//juzEhsX92if2lJ2CSqKAI4RQswt.jpg",
      "title": "Greenland",
      "average_rating": 9,
      "release_date": "2020-07-29"
    }
  });

  it('should have the correct content when rendered', () => {
    render(< Poster poster= { poster } key={poster.id} displayMovieInfoPage={jest.fn()}/>)

    const rating = screen.getByText('9')
    const image = screen.getByAltText('Greenland')

    expect(rating).toBeInTheDocument()
    expect(image).toBeInTheDocument()
  });

  it('should fire a function when the image or rating is clicked', () => {
    const mockDisplayMovieInfoPage = jest.fn()
    render(< Poster poster= { poster } key={poster.id} displayMovieInfoPage={mockDisplayMovieInfoPage}/>)

    const image = screen.getByAltText('Greenland')
    const rating = screen.getByText('9')

    fireEvent.click(image);
    fireEvent.click(rating);

    expect(mockDisplayMovieInfoPage).toBeCalledTimes(2);
  });

  it('should be returned as a single figure', () => {
    render(< Poster poster= { poster } key={poster.id} displayMovieInfoPage={jest.fn()}/>)

    const moviePoster = screen.getByRole('figure')

    expect(moviePoster).toBeInTheDocument()
  });
})
