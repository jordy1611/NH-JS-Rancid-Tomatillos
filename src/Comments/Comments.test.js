import React from 'react';
import Comments from './Comments';
import { screen, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
jest.mock('../dataFetcher.js');

describe('Comments', () => {
  it('should render all comments and the header', () => {
    const comments = [
      {
        comment: 'WOW SO GOOD',
        author: 'Nick',
        movieId: 123,
        id: 1
      },
      {
        comment: 'YES VERY GOOD',
        author: 'Jordy',
        movieId: 123,
        id: 2
      }
    ]

    render(
      <MemoryRouter>
        <Comments comments={comments}/>
      </MemoryRouter>
    );

    const commentsHeader = screen.getByText('Comments');
    const comment1 = screen.getByText('WOW SO GOOD');
    const comment2 = screen.getByText('YES VERY GOOD');

    expect(commentsHeader).toBeInTheDocument();
    expect(comment1).toBeInTheDocument();
    expect(comment2).toBeInTheDocument();
  })

  it('should display a login CTA when you\'re not logged in', () => {
    const comments = [
      {
        comment: 'WOW SO GOOD',
        author: 'Nick',
        movieId: 123,
        id: 1
      },
      {
        comment: 'YES VERY GOOD',
        author: 'Jordy',
        movieId: 123,
        id: 2
      }
    ]

    render(
      <MemoryRouter>
        <Comments comments={comments} />
      </MemoryRouter>
    );

    const loginCTA = screen.getByText('Log in to join the conversation!');

    expect(loginCTA).toBeInTheDocument();
  })

  it('should display a form to submit a comment CTA when you are logged in', () => {
    const comments = [
      {
        comment: 'WOW SO GOOD',
        author: 'Nick',
        movieId: 123,
        id: 1
      },
      {
        comment: 'YES VERY GOOD',
        author: 'Jordy',
        movieId: 123,
        id: 2
      }
    ]

    render(
      <MemoryRouter>
        <Comments comments={comments} isCurrentUser={true}/>
      </MemoryRouter>
    );

    const commentForm = screen.getByText('What do you think of the movie?');

    expect(commentForm).toBeInTheDocument();
  })
})
