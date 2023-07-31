import React from "react";
import { Link } from "react-router-dom";
import './Button.scss'


type ButtonProps = {
    difficulty: "easy" | "medium" | "hard",
    isButtonPressed: React.Dispatch<React.SetStateAction<boolean>>,
    isLoading: React.Dispatch<React.SetStateAction<boolean>>
}

const Button = ({ difficulty, isButtonPressed, isLoading }: ButtonProps) => {
    if (difficulty === "easy") {
        return (
            <Link to={"/easy"}>
                <button className="button" onClick={() => isLoading(true)}>Easy</button>
            </Link>
        );
    } else if (difficulty === "medium") {
        return (
            <Link to={"/medium"}>
                <button className="button" onClick={() => isLoading(true)}>Medium</button>
            </Link>
        );
    } else if (difficulty === "hard") {
        return (
            <Link to={"/hard"}>
                <button className="button" onClick={() => isLoading(true)}>Hard</button>
            </Link>
        );
    } else {
        return <></>
    }
};
export default Button;