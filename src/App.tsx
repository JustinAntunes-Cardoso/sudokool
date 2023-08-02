import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Sudoku from "./components/Sudoku/Sudoku";
import './App.scss';

function App() {
	return (
		<div className="App">
			<Header />
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
