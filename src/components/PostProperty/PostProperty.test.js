import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PostProperty from './PostProperty';

describe('<PostProperty />', () => {
  test('it should mount', () => {
    render(<PostProperty />);
    
    const postProperty = screen.getByTestId('PostProperty');

    expect(postProperty).toBeInTheDocument();
  });
});