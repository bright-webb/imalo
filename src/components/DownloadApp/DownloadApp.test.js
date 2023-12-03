import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import DownloadApp from './DownloadApp';

describe('<DownloadApp />', () => {
  test('it should mount', () => {
    render(<DownloadApp />);
    
    const downloadApp = screen.getByTestId('DownloadApp');

    expect(downloadApp).toBeInTheDocument();
  });
});