import { render, screen, fireEvent } from "@testing-library/react";
import { useMachine } from "@xstate/react";
import "@testing-library/jest-dom";
import TicTacToe from "../components/TicTacToe";
jest.mock("@xstate/react", () => ({
  useMachine: jest.fn(),
}));

jest.mock("../sounds/click.wav");

describe("TicTacToe Component", () => {
  let mockService;

  beforeEach(() => {
    global.Audio = jest.fn().mockImplementation(() => ({
      play: jest.fn(),
      pause: jest.fn(),
    }));
    mockService = {
      send: jest.fn(),
      state: {
        context: {
          tiles: Array(9).fill(null),
          player: "X",
          gameStatus: "run",
          strikeClass: "",
          winner: "",
        },
        matches: jest.fn((state) => state === "playing"),
      },
    };
    useMachine.mockReturnValue([mockService.state, mockService.send]);
  });

  test("renders TicTacToe component", () => {
    render(<TicTacToe />);
    expect(screen.getByText("TicTacToe")).toBeInTheDocument();
  });

  test("handles tile click", () => {
    render(<TicTacToe />);
    const tile = screen.getAllByRole("button")[0];
    fireEvent.click(tile);
    expect(mockService.send).toHaveBeenCalledWith({
      type: "CLICK_TILE",
      index: 0,
    });
  });

  test("renders game over message", () => {
    mockService.state.matches = jest.fn((state) => state === "won");
    mockService.state.context.gameStatus = "won";
    mockService.state.context.winner = "X";
    render(<TicTacToe />);
    expect(screen.getByText("X wins!")).toBeInTheDocument();
  });

  test("handles reset button click", () => {
    mockService.state.context.gameStatus = "won";
    render(<TicTacToe />);
    const resetButton = screen.getByText("Reset");
    fireEvent.click(resetButton);
    expect(mockService.send).toHaveBeenCalledWith({ type: "RESET" });
  });
});
