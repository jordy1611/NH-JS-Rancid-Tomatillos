import React from 'react';
import MovieInfo from '../MovieInfo/MovieInfo.js';
import testMovie from './testMovie.js';
import { screen, render } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('MovieInfo', () => {

  it('should display all relevant movie information', () => {
    render(<MovieInfo movie={testMovie}/>)

    const backdrop = screen.getByAltText('Akira backdrop');
    const heading = screen.getByRole('heading');
    const releaseDate = screen.getByTestId('release date');
    const overview = screen.getByTestId('overview');
    const genres = screen.getByTestId('genres');
    const budget = screen.getByTestId('budget');
    const runtime = screen.getByTestId('runtime');
    const tagline = screen.getByTestId('tagline');
    const averageRating = screen.getByTestId('average rating');
  
    expect(backdrop).toBeInTheDocument();
    expect(heading).toBeInTheDocument();
    expect(releaseDate).toBeInTheDocument();
    expect(overview).toBeInTheDocument();
    expect(genres).toBeInTheDocument();
    expect(budget).toBeInTheDocument();
    expect(runtime).toBeInTheDocument();
    expect(tagline).toBeInTheDocument();
    expect(averageRating).toBeInTheDocument();
  })
})