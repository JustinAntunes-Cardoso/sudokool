
import "./Sudoku.scss";
import axios from "axios";
import { useState, useEffect, createRef } from "react";
import Button from "../Button/Button";
import LoadingModal from '../LoadingModal/LoadingModal';

//API connection
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const API_ENDPOINT = process.env.REACT_APP_SUDOKU_PATH;

const BLANK_BOARD = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
];

const BLANK_INPUTS: (number | string)[] = [
    '', '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '', '',
];

let rowPos: number = 0;
let colPos: number[] = [];
let idPos: number = -1;

const Sudoku = () => {
    const [board, setBoard] = useState(BLANK_BOARD);
    const [answer, setAnswer] = useState(BLANK_BOARD);
    const [inputValues, setInputValue] = useState(BLANK_INPUTS);
    const [loading, setLoading] = useState(false);
    const [isPressed, setButtonIsPressed] = useState(false);
    const [diff, setDifficulty] = useState('easy');
    // Create an array to hold the refs
    const cellRefs: React.RefObject<HTMLInputElement>[] = Array.from({ length: 81 }, () => createRef());
    const [error, setError] = useState(false);

    useEffect(() => {
        //Makes API call to get new board
        const getBoard = async () => {
            try {
                const { data } = diff ? await axios.get(`${API_BASE_URL}${API_ENDPOINT}${diff}`) :
                    await axios.get(`${API_BASE_URL}${API_ENDPOINT}easy`);
                setBoard(data.board);
                setAnswer(data.solved);
                setInputValue(BLANK_INPUTS);
                setError(false);
            } catch (error) {
                setError(true);
            } finally {
                setTimeout(() => {
                    setLoading(false);
                }, 3000);
            }
        }

        getBoard();
    }, [diff, isPressed]);

    //Enters input values into state variable to be used as a checker with the answer key.
    const handleInputChange = (index: string, value: string) => {
        if (Number.isNaN(Number(value))) return;

        const inputArray = [...inputValues];
        inputArray[Number(index)] = value
        setInputValue(inputArray);
    };

    const submitHandler = (e: any) => {
        e.preventDefault();
        const getInput = () => {
            const inputs = [];
            let id = 0;
            for (let i = 0; i < 9; i++) {
                for (let j = 0; j < 9; j++) {
                    board[i][j] === 0 ? inputs.push(Number(inputValues[id])) : inputs.push(board[i][j]);
                    id++;
                }
            }

            return inputs;
        }
        const input = getInput();
        let answerkey = [];
        for (let row of answer) {
            for (let col of row) {
                answerkey.push(col);
            }
        }

        let win = true
        for (let i = 0; i < answerkey.length; i++) {
            if (answerkey[i] !== input[i]) {
                cellRefs[i].current?.classList.add('error');
                win = false
            } else {
                cellRefs[i].current?.classList.add('correct');
            }
        }

        alert(win ? 'Congrats you won!' : 'Puzzle is not solved, \nPlease try again!')
    }

    return (
        <div className="sudoku__container">
            <p style={{ color: 'red' }}>{error ? 'Error fetching Sudoku puzzle' : <></>}</p>
            <p className="sudoku__title">{`${diff ? diff : "Default"} Puzzle`}</p>
            {loading ? <LoadingModal /> : ''}
            <form className='sudoku__form' onSubmit={submitHandler}>
                <table className="sudoku-table">
                    <tbody>
                        {board.map((row, rowIndex) => {
                            rowPos = rowIndex % 3;
                            return (
                                <tr key={rowIndex}>
                                    {row.map((col, colIndex) => {

                                        if (rowPos === 0) {
                                            colPos = [0, 1, 2];
                                        } else if (rowPos === 1) {
                                            colPos = [3, 4, 5];
                                        } else if (rowPos === 2) {
                                            colPos = [6, 7, 8];
                                        }
                                        idPos++;
                                        return col !== 0 ? (
                                            <td
                                                key={colIndex}
                                                className={`sudoku-table__p${colPos[colIndex % 3]}`}>
                                                <div className="sudoku__input">{col}</div>
                                            </td>
                                        ) : (
                                            <td
                                                key={colIndex}
                                                className={`sudoku-table__p${colPos[colIndex % 3]}`}>
                                                <input
                                                    size={2}
                                                    autoComplete="off"
                                                    maxLength={1}
                                                    id={`${idPos % 81}`}
                                                    name={`${idPos % 81}`}
                                                    value={inputValues[idPos % 81]}
                                                    ref={cellRefs[rowIndex * 9 + colIndex]}
                                                    onChange={(event) => handleInputChange(event.target.id, event.target.value)}
                                                />
                                            </td>
                                        );
                                    })}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <button type="submit" name="check" className="sudoku__check">Check</button>
            </form>
            <div className="sudoku__buttons">
                <Button difficulty="easy" isButtonPressed={setButtonIsPressed} isLoading={setLoading} setDifficulty={setDifficulty} cellRefs={cellRefs} />
                <Button difficulty="medium" isButtonPressed={setButtonIsPressed} isLoading={setLoading} setDifficulty={setDifficulty} cellRefs={cellRefs} />
                <Button difficulty="hard" isButtonPressed={setButtonIsPressed} isLoading={setLoading} setDifficulty={setDifficulty} cellRefs={cellRefs} />
            </div>
        </div>
    );
};
export default Sudoku
