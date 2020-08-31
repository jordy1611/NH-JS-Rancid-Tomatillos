import React from 'react';
import Comment from './Comment';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
jest.mock('../dataFetcher.js');

describe('Comment', () => {
  it('should render without crashing', () => {
    dataFetcher.getAllComments.mockResolvedValueOnce({
      comments: [
        {
          comment: 'SO GOOD',
          author: 'AHHHH',
          movieId: '524047',
          id: '1'
        }
      ]
    });

    render(
      <MemoryRouter>
        <Comment />
      </MemoryRouter>
    )

    const review = await waitFor(screen.getByText('SO GOOD'));

    expect(review).toBeInTheDocument;
  })
})