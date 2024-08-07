import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import GameOver from "../components/GameOver";

describe("GameOver Component", () => {
  test("does not render when game is running", () => {
    render(<GameOver gameState="run" winner="" />);
    expect(screen.queryByText("wins!")).not.toBeInTheDocument();
  });

  test("renders win message", () => {
    render(<GameOver gameState="won" winner="X" />);
    expect(screen.getByText("X wins!")).toBeInTheDocument();
  });

  test("renders draw message", () => {
    render(<GameOver gameState="draw" winner="" />);
    expect(screen.getByText("Draw")).toBeInTheDocument();
  });
});
