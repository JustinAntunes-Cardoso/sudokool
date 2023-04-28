import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sudoku from "./components/Sudoku/Sudoku";
import './App.scss';

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Routes>
					<Route
						path='/'
						element={<Sudoku />}
					/>
					<Route
						path='/:diff'
						element={<Sudoku />}
					/>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
