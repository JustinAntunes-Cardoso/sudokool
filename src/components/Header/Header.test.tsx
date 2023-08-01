import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // Provides custom matchers like toBeInTheDocument
import Header from './Header'; // Import your Header component

// Test case
test('renders the image in the header', () => {
    // Arrange
    const { getByAltText } = render(<Header />);

    // Act: We don't need any action for this test case.

    // Assert
    const imageElement = getByAltText('Sudokool logo'); // Replace 'Sudokool logo' with the alt text of your image
    expect(imageElement).toBeInTheDocument();

});