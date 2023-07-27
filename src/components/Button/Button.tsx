import React from "react";
import { Link } from "react-router-dom";


type ButtonProps = {
    difficulty: "easy" | "medium" | "hard",
    isLoading: React.Dispatch<React.SetStateAction<boolean>>
}

const Button = ({ difficulty, isLoading }: ButtonProps) => {
    if (difficulty === "easy") {
        return (
            <Link to={"/easy"}>
                <button onClick={() => isLoading(true)}>Easy</button>
            </Link>
        );
    } else if (difficulty === "medium") {
        return (
            <Link to={"/medium"}>
                <button onClick={() => isLoading(true)}>Medium</button>
            </Link>
        );
    } else if (difficulty === "hard") {
        return (
            <Link to={"/hard"}>
                <button onClick={() => isLoading(true)}>Hard</button>
            </Link>
        );
    } else {
        return <></>
    }
};
export default Button;