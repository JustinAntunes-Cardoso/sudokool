import { Link } from "react-router-dom";

type ButtonProps = {
    difficulty: "easy" | "medium" | "hard"
}

const Button = ({ difficulty }: ButtonProps) => {
    if (difficulty === "easy") {
        return (
            <Link to={"/easy"}>
                <button onClick={() => 1/*onClick("easy")*/}>Easy</button>
            </Link>
        );
    } else if (difficulty === "medium") {
        return (
            <Link to={"/medium"}>
                <button onClick={() => 1/*onClick("medium")*/}>Medium</button>
            </Link>
        );
    } else if (difficulty === "hard") {
        return (
            <Link to={"/hard"}>
                <button onClick={() => 1/*onClick("hard")*/}>Hard</button>
            </Link>
        );
    } else {
        return <></>
    }
};
export default Button;