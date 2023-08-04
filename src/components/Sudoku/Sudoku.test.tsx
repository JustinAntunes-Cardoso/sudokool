import { render, screen, waitFor, fireEvent, act } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import Sudoku from './Sudoku';


// Mock the axios module
jest.mock('axios', () => ({
    get: jest.fn(),
}));

// Mock the window.alert function
global.alert = jest.fn();

// Mock the API response data
const mockResponse = {
    data: {
        board: [
            [5, 3, 0, 0, 7, 0, 0, 0, 0],
            [6, 0, 0, 1, 9, 5, 0, 0, 0],
            [0, 9, 8, 0, 0, 0, 0, 6, 0],
            [8, 0, 0, 0, 6, 0, 0, 0, 3],
            [4, 0, 0, 8, 0, 3, 0, 0, 1],
            [7, 0, 0, 0, 2, 0, 0, 0, 6],
            [0, 6, 0, 0, 0, 0, 2, 8, 0],
            [0, 0, 0, 4, 1, 9, 0, 0, 5],
            [0, 0, 0, 0, 8, 0, 0, 7, 9]
        ],
        solved: [
            [5, 3, 4, 6, 7, 8, 9, 1, 2],
            [6, 7, 2, 1, 9, 5, 3, 4, 8],
            [1, 9, 8, 3, 4, 2, 5, 6, 7],
            [8, 5, 9, 7, 6, 1, 4, 2, 3],
            [4, 2, 6, 8, 5, 3, 7, 9, 1],
            [7, 1, 3, 9, 2, 4, 8, 5, 6],
            [9, 6, 1, 5, 3, 7, 2, 8, 4],
            [2, 8, 7, 4, 1, 9, 6, 3, 5],
            [3, 4, 5, 2, 8, 6, 1, 7, 9]
        ]
    },
};

describe('fetchSudokuPuzzle', () => {
    it('should return the Sudoku puzzle from the API', async () => {

        (axios.get as jest.Mock).mockResolvedValueOnce(mockResponse);

        // Render the component
        render(
            <MemoryRouter>
                <Sudoku />
            </MemoryRouter>
        );

        // Wait for the component to update with the fetched data
        await waitFor(() => {
            // Check if the rendered data matches the API response data
            const cellsWith5 = screen.getAllByText('5');
            const cellsWith0 = screen.getAllByText('1');
            const cellsWith9 = screen.getAllByText('9');
            const inputElements = screen.getAllByRole('textbox');

            expect(cellsWith5.length).toBe(3);
            expect(cellsWith0.length).toBe(3);
            expect(cellsWith9.length).toBe(4);
            expect(inputElements.length).toBe(51);
        });
    });

    it('should handle API request error', async () => {
        // Mock API request to throw an error
        (axios.get as jest.Mock).mockRejectedValueOnce(new Error('API Error'));

        // Render the component
        render(
            <MemoryRouter>
                <Sudoku />
            </MemoryRouter>
        );

        // Wait for the component to handle the error
        await waitFor(() => {
            // Check if the error message is rendered
            const errorMessage = screen.getByText('Error fetching Sudoku puzzle');
            expect(errorMessage).toBeInTheDocument();
        });
    });

    it('navigates to easy puzzle when "Easy" button is clicked', async () => {
        // Render the component
        render(
            <BrowserRouter>
                <Sudoku />
            </BrowserRouter>
        );

        fireEvent.click(screen.getByText('Easy'));

        expect(window.location.pathname).toContain('/easy');
    });

    it('navigates to medium puzzle when "Medium" button is clicked', async () => {
        // Render the component
        render(
            <BrowserRouter>
                <Sudoku />
            </BrowserRouter>
        );

        fireEvent.click(screen.getByText('Medium'));

        expect(window.location.pathname).toContain('/medium');
    });

    it('navigates to hard puzzle when "Hard" button is clicked', async () => {
        // Render the component
        render(
            <BrowserRouter>
                <Sudoku />
            </BrowserRouter>
        );

        fireEvent.click(screen.getByText('Hard'));

        expect(window.location.pathname).toContain('/hard');
    });
});

describe('submitSudokuPuzzle', () => {
    it('submits the form and checks the puzzle with error', async () => {
        (axios.get as jest.Mock).mockResolvedValueOnce(mockResponse);

        // Render the component
        const { getByText } = render(
            <MemoryRouter>
                <Sudoku />
            </MemoryRouter>
        );

        // Simulate user input 
        const errorValues = [
            [5, 3, 7, 6, 7, 8, 9, 1, 2],
            [6, 7, 2, 1, 9, 5, 3, 4, 8],
            [1, 9, 8, 3, 4, 2, 5, 6, 7],
            [8, 5, 9, 7, 6, 1, 4, 2, 3],
            [4, 2, 6, 8, 5, 3, 7, 9, 1],
            [7, 1, 3, 9, 2, 4, 8, 5, 6],
            [9, 6, 1, 5, 3, 7, 2, 8, 4],
            [2, 8, 7, 4, 1, 9, 6, 3, 5],
            [3, 4, 5, 2, 8, 6, 1, 7, 9]
        ]

        const inputFields = screen.getAllByRole('textbox');
        inputFields.forEach((input, index) => {
            fireEvent.change(input, { target: { value: errorValues.flat()[index].toString() } });
        });

        // Find the "Check" button
        const checkButton = getByText('Check');

        // Click the "Check" button
        fireEvent.click(checkButton);

        // Assert that the "alert" function was called with the correct message
        expect(global.alert).toHaveBeenCalledWith('Puzzle is not solved, \nPlease try again!');

    });
});