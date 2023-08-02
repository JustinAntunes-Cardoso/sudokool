import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Button from './Button';

test('clicking the button navigates to the proper page', () => {
    // Mock the route to be navigated to
    const mockRoute = '/medium';
    const mockDiff = 'medium';
    const mockIsButtonPressed = jest.fn();
    const mockIsLoading = jest.fn();
    const mockSetDiff = jest.fn();
    const mockRefs: React.RefObject<HTMLInputElement>[] =
        Array.from({ length: 81 }, () => React.createRef());
    const mockPath = <Button difficulty={mockDiff} isButtonPressed={mockIsButtonPressed} isLoading={mockIsLoading} setDifficulty={mockSetDiff} cellRefs={mockRefs} />

    const { getByRole } = render(
        <BrowserRouter>
            <Routes>
                <Route
                    path='/'
                    element={mockPath}
                />
                <Route
                    path='/:diff'
                    element={mockPath}
                />
            </Routes>
        </BrowserRouter>
    );

    // Act: Click the button
    const buttonElement = getByRole('link');
    fireEvent.click(buttonElement);

    // Assert: Check if the navigation is correct
    expect(window.location.pathname).toBe(mockRoute);
});