import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import UploadPropertyImages from './UploadPropertyImages';

describe('<UploadPropertyImages />', () => {
  test('it should mount', () => {
    render(<UploadPropertyImages />);
    
    const uploadPropertyImages = screen.getByTestId('UploadPropertyImages');

    expect(uploadPropertyImages).toBeInTheDocument();
  });
});