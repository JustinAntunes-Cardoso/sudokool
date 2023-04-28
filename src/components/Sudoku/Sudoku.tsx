
import "./Sudoku.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import Button from "../Button/Button";
import { useParams } from "react-router-dom";
const BOARD_URL = "http://localhost:8081";
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
let idPos: number = 0;

const Sudoku = () => {
    const [board, setBoard] = useState(BLANK_BOARD);
    const [answer, setAnswer] = useState(BLANK_BOARD);
    const [inputValues, setInputValue] = useState(BLANK_INPUTS);
    const { diff } = useParams();

    useEffect(() => {
        const getDefaultBoard = async () => {
            const { data } = await axios.get(`${BOARD_URL}/game`);
            setBoard(data[0]);
            setAnswer(data[1]);
            setInputValue(BLANK_INPUTS);
        };
        const getBoard = async () => {
            const { data } = await axios.get(`${BOARD_URL}/game/${diff}`);
            setBoard(BLANK_BOARD);
            setBoard(data[0]);
            setAnswer(data[1]);
            setInputValue(BLANK_INPUTS);
        };

        diff ? getBoard() : getDefaultBoard();
    }, [diff]);

    const handleInputChange = (index: string, value: string) => {
        if (Number.isNaN(Number(value))) return;

        const inputArray = [...inputValues];
        inputArray[Number(index)] = value
        setInputValue(inputArray);
    };

    function submitHandler(e: any) {
        e.preventDefault();
        function getInput() {
            const inputs = [];
            let id = 0;
            console.log(inputValues);
            for (let i = 0; i < 9; i++) {
                for (let j = 0; j < 9; j++) {
                    id++;
                    board[i][j] === 0 ? inputs.push(Number(inputValues[id])) : inputs.push(board[i][j]);
                }
            }

            return inputs;
        }
        const input = getInput();
        let answerkey = [];
        console.log(answer);
        for (let row of answer) {
            for (let col of row) {
                answerkey.push(col);
            }
        }
        console.log(answerkey);
        for (let i = 0; i < answerkey.length; i++) {
            if (answerkey[i] !== input[i]) {
                alert("Wrong Answer");
                return;
            }
        }
        alert("Correct");
    }

    return (
        <div className="sudoku__container">
            <p>{`${diff ? diff : "easy"} Puzzle`}</p>
            <form onSubmit={submitHandler}>
                <table className="sudoku-table">
                    <tbody>
                        {board.map((row, index) => {
                            rowPos = index % 3;
                            return (
                                <tr key={index}>
                                    {row.map((col, index) => {
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
                                                key={index}
                                                className={`sudoku-table__p${colPos[index % 3]}`}>
                                                <div className="sudoku__input">{col}</div>
                                            </td>
                                        ) : (
                                            <td
                                                key={index}
                                                className={`sudoku-table__p${colPos[index % 3]}`}>
                                                <input
                                                    size={2}
                                                    autoComplete="off"
                                                    maxLength={1}
                                                    id={`${idPos % 81}`}
                                                    name={`${idPos % 81}`}
                                                    value={inputValues[idPos % 81]}
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
                <button>Check</button>
            </form>
            <div className="sudoku__buttons">
                <Button difficulty="easy" />
                <Button difficulty="medium" />
                <Button difficulty="hard" />
            </div>
        </div>
    );
};
export default Sudoku
