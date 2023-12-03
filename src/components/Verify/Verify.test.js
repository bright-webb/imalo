import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Verify from './Verify';

describe('<Verify />', () => {
  test('it should mount', () => {
    render(<Verify />);
    
    const verify = screen.getByTestId('Verify');

    expect(verify).toBeInTheDocument();
  });
});