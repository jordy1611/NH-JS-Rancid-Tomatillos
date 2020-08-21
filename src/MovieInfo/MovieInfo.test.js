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
    const releaseDate = screen.getByText(`Release Date: ${testMovie.release_date}`)
    const overview = screen.getByText(`Overview: ${testMovie.overview}`)
    const genres = screen.getByRole('list');
    const genre1 = screen.getAllByRole('listitem')[0]
    const genre2 = screen.getAllByRole('listitem')[1]
    const budget = screen.getByText(`Budget: ${testMovie.budget}`)
    const runtime = screen.getByText(`Runtime: ${testMovie.runtime} days`)
    const tagline = screen.getByText(`Tagline: ${testMovie.tagline}`)
    const averageRating = screen.getByText(`Average Rating: ${testMovie.average_rating}`)

    expect(backdrop).toBeInTheDocument();
    expect(heading).toBeInTheDocument();
    expect(releaseDate).toBeInTheDocument();
    expect(overview).toBeInTheDocument();
    expect(genres).toBeInTheDocument();
    expect(genre1).toBeInTheDocument();
    expect(genre2).toBeInTheDocument();
    expect(budget).toBeInTheDocument();
    expect(runtime).toBeInTheDocument();
    expect(tagline).toBeInTheDocument();
    expect(averageRating).toBeInTheDocument();
  })
})
