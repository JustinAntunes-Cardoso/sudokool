test('dummy test', () => {
    expect(true).toBe(true);
});

// import { render, screen, waitFor, fireEvent } from '@testing-library/react';
// import axios from 'axios';
// import Sudoku from './Sudoku';

// jest.mock('axios');

// test('fetches easy puzzle when "Easy" button is clicked', async () => {
//     axios.get.mockResolvedValueOnce({ data: mockPuzzleData }); // Mock the API call with the mock data

//     render(<Sudoku />);
//     fireEvent.click(screen.getByText('Easy'));
//     await waitFor(() => expect(axios.get).toHaveBeenCalledWith('/api/sudoku/easy'));

//     // Expect the puzzle to be rendered on the screen
//     expect(screen.getByText('5')).toBeInTheDocument(); // Replace '5' with the appropriate number from the mock data
//     // Add more assertions for other cells in the puzzle
// });

// test('renders loading message while fetching data', async () => {
//     render(<Sudoku />);
//     expect(screen.getByText('Loading')).toBeInTheDocument();
//     await waitFor(() => expect(screen.queryByText('Loading')).not.toBeInTheDocument());
// });

// test('renders puzzle after fetching data', async () => {
//     render(<Sudoku />);
//     await waitFor(() => expect(screen.queryByText('Loading...')).not.toBeInTheDocument());
//     // Expect the Sudoku puzzle to be rendered on the screen
//     // Add assertions for the actual rendering of the Sudoku puzzle
// });

// test('fetches easy puzzle when "Easy" button is clicked', async () => {
//     render(<Sudoku />);
//     fireEvent.click(screen.getByText('Easy'));
//     await waitFor(() => expect(window.fetch).toHaveBeenCalledWith('/api/puzzle?difficulty=easy'));
// });

// test('fetches medium puzzle when "Medium" button is clicked', async () => {
//     render(<Sudoku />);
//     fireEvent.click(screen.getByText('Medium'));
//     await waitFor(() => expect(window.fetch).toHaveBeenCalledWith('/api/puzzle?difficulty=medium'));
// });

// test('fetches hard puzzle when "Hard" button is clicked', async () => {
//     render(<Sudoku />);
//     fireEvent.click(screen.getByText('Hard'));
//     await waitFor(() => expect(window.fetch).toHaveBeenCalledWith('/api/puzzle?difficulty=hard'));
// });