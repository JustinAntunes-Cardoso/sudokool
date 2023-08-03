import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Button from './Button';

it('clicking the button navigates to the proper page', () => {
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

it('clicking the button calls useState functions', () => {
    // Mock the route to be navigated to
    const mockDiff = 'medium';
    const mockIsButtonPressed = jest.fn(() => false);
    const mockIsLoading = jest.fn(() => false);
    const mockSetDiff = jest.fn();
    const mockRefs: React.RefObject<HTMLInputElement>[] = Array.from({ length: 81 }, () => React.createRef());
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

    fireEvent.click(getByRole('button')); // Simulate click with the 'medium' label

    // Assert: Check if the functions were called correctly
    expect(mockIsButtonPressed).toHaveBeenCalledTimes(1);
    expect(mockIsLoading).toHaveBeenCalledTimes(1);
    expect(mockIsLoading).toHaveBeenCalledWith(true); // Pass the expected value here
    expect(mockSetDiff).toHaveBeenCalledTimes(1);
    expect(mockSetDiff).toHaveBeenCalledWith('medium');

    // Assert: Check if the refs do not have specific classes
    mockRefs.forEach((ref) => {
        if (ref?.current) {
            expect(ref.current).not.toHaveClass('correct');
            expect(ref.current).not.toHaveClass('error');
        }
    });
});