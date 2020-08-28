import React from 'react';
import Poster from '../Poster/Poster.js'
import { screen, fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Link, BrowserRouter as Router } from "react-router-dom";

describe.only('Poster Component', () => {
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
    render(
      <Router>
        <Poster poster={poster} key={poster.id} displayMovieInfoPage={jest.fn()} />
      </Router>
    )
      

    const rating = screen.getByText('9.0')
    const image = screen.getByAltText('Greenland')

    expect(rating).toBeInTheDocument()
    expect(image).toBeInTheDocument()

  });

  it('should fire a function when the image or rating is clicked', () => {
    const mockSetMovieView = jest.fn()
    render(
      <Router>
        <Poster poster= { poster } key={poster.id} setMovieView={mockSetMovieView}/>
      </Router>
    )

    const image = screen.getByAltText('Greenland')
    const rating = screen.getByText('9.0')

    fireEvent.click(image);
    fireEvent.click(rating);

    expect(mockSetMovieView).toBeCalledTimes(2);

  });

  it('should be returned as a single figure', () => {
    render(
      <Router>
        <Poster poster= { poster } key={poster.id} displayMovieInfoPage={jest.fn()}/>
      </Router>
    )

    const moviePoster = screen.getByRole('figure')

    expect(moviePoster).toBeInTheDocument()

  });
})
