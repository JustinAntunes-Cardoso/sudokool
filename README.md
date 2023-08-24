# Sudokool

Sudokool is a web application that allows you to play Sudoku puzzles of varying difficulties fetched from a backend API. The app is built using React, TypeScript, and the Create React App framework.

## Features

- Fetches Sudoku puzzles of easy, medium, and hard difficulties from a backend API.
- Provides an interactive Sudoku board for playing.
- Allows users to check the correctness of their puzzle solution.

## Getting Started

These instructions will help you deploy the Sudokool app and start playing Sudoku puzzles.

#### Prerequisites

- Node.js and npm installed on your machine.

#### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/sudokool.git
   cd sudokool
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm start
   The app should now be running at http://localhost:3000.
   ```

## Backend Integration

The Sudokool app requires a backend API to fetch puzzles. Make sure you go to **'https://github.com/JustinAntunes-Cardoso/sudokool_api'** for backend installation.

## Playing Sudoku

Select a difficulty level (easy, medium, or hard) from the app's menu.
The app will fetch a puzzle from the backend API and display it on the board.
Click on a cell to select it and use the keyboard to input numbers.
Use the "Check" button to validate your solution. Incorrect cells will be highlighted.

## Deployment

To deploy the Sudokool app, you can use platforms like Vercel or Netlify. Configure the deployment settings according to your chosen platform's documentation.

## Acknowledgments

Sudokool was inspired by a love for Sudoku puzzles and the desire to create an interactive and fun web application.
