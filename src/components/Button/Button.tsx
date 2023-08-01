import React from "react";
import { Link } from "react-router-dom";
import './Button.scss'


type ButtonProps = {
    difficulty: "easy" | "medium" | "hard",
    isButtonPressed: React.Dispatch<React.SetStateAction<boolean>>,
    isLoading: React.Dispatch<React.SetStateAction<boolean>>,
    setDifficulty: React.Dispatch<React.SetStateAction<string>>,
    cellRefs: React.RefObject<HTMLInputElement>[]
}

const Button = ({ difficulty, isButtonPressed, isLoading, setDifficulty, cellRefs }: ButtonProps) => {

    //Makes call to API when button is pressed
    const loadApiCall = () => {
        isButtonPressed((prevValue) => !prevValue);
        isLoading(true);
        setDifficulty(difficulty);
        cellRefs.forEach(cell => {
            cell.current?.classList.remove('correct');
            cell.current?.classList.remove('error');
        })
    }

    if (difficulty === "easy") {
        return (
            <Link to={"/easy"}>
                <button className="button" onClick={loadApiCall}>Easy</button>
            </Link>
        );
    } else if (difficulty === "medium") {
        return (
            <Link to={"/medium"}>
                <button className="button" onClick={loadApiCall}>Medium</button>
            </Link>
        );
    } else if (difficulty === "hard") {
        return (
            <Link to={"/hard"}>
                <button className="button" onClick={loadApiCall}>Hard</button>
            </Link>
        );
    } else {
        return <></>
    }
};
export default Button;