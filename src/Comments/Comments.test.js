import React from 'react';
import Comments from './Comments';
import Comment from '../Comment/Comment';
import dataFetcher from '../dataFetcher';
import { screen, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
jest.mock('../dataFetcher.js');

describe('Comments', () => {
  it('should render without crashing', () => {
    dataFetcher.getAllComments.mockResolvedValueOnce({
      comments: [
      {
        comment: 'WOW SO GOOD',
        author: 'Nick',
        movieId: 123,
        id: 1
      }
    ]}
  )

    render(
      <MemoryRouter>
        <Comments />
      </MemoryRouter>
    );

    const commentsHeader = screen.getByText('Comments');

    expect(commentsHeader).toBeInTheDocument();
  })
})