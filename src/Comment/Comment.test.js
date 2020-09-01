import React from 'react';
import Comment from './Comment';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
jest.mock('../dataFetcher.js');

describe('Comment', () => {
  it('should render without crashing', () => {
    const comment = {
      comment: 'SO GOOD',
      author: 'AHHHH',
      movieId: '524047',
      id: '1'
    };

    render(
      <MemoryRouter>
        <Comment comment={comment}/>
      </MemoryRouter>
    )

    const commentContent = screen.getByText('SO GOOD');
    const commentAuthor = screen.getByText('AHHHH');

    expect(commentContent).toBeInTheDocument;
    expect(commentAuthor).toBeInTheDocument;
  })
})