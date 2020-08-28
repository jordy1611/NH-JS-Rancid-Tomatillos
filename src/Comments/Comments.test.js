import React from 'react';
import Comments from './Comments';
import { screen, render } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Comments', () => {
  it('should render without crashing', () => {
    render(<Comments />);

    const commentsHeader = screen.getByText('Comments');

    expect(commentsHeader).toBeInTheDocument();
  })
})