import MutationObserver from '@sheerun/mutationobserver-shim';
window.MutationObserver = MutationObserver;
import React from 'react';
import App from './App';
import { MemoryRouter } from 'react-router-dom';
import sampleData from '../sampleData.js';
import { screen, fireEvent, render, waitFor } from '@testing-library/react';
import dataFetcher from '../dataFetcher.js';
import '@testing-library/jest-dom';
jest.mock('../dataFetcher.js');

describe('App', () => {
  it('should display all movies when the page loads', async () => {
    dataFetcher.getAllMovies.mockResolvedValueOnce(sampleData.movies);

    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    const movie1 = await waitFor(() => screen.getByAltText('Greenland'));
    const movie2 = await waitFor(() => screen.getByAltText('Archive'));
    const movie3 = await waitFor(() => screen.getByAltText('Akira'));
    const movie4 = await waitFor(() => screen.getByAltText('Friend of the World'));
    const movie5 = await waitFor(() => screen.getByAltText('The Secret Garden'));

    expect(movie1).toBeInTheDocument();
    expect(movie2).toBeInTheDocument();
    expect(movie3).toBeInTheDocument();
    expect(movie4).toBeInTheDocument();
    expect(movie5).toBeInTheDocument();
  })

  it('should display a movie\'s information when its poster is clicked', async () => {
    dataFetcher.getAllMovies.mockResolvedValueOnce(sampleData.movies);
    dataFetcher.getMovieById.mockResolvedValueOnce(sampleData.movie);
    dataFetcher.getAllComments.mockResolvedValueOnce([]);

    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    )

    const akiraPoster = await waitFor(() => screen.getByAltText('Akira'));

    fireEvent.click(akiraPoster);

    const title = await waitFor(() => screen.getByText('Akira'));

    expect(title).toBeInTheDocument();
  });

})
