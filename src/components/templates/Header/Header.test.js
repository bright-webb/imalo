import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TemplatesHeader from './TemplatesHeader';

describe('<TemplatesHeader />', () => {
  test('it should mount', () => {
    render(<TemplatesHeader />);
    
    const templatesHeader = screen.getByTestId('TemplatesHeader');

    expect(templatesHeader).toBeInTheDocument();
  });
});