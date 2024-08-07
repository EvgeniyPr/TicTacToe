import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Reset from "../components/Reset";

describe("Reset Component", () => {
  test("renders Reset button when game is over", () => {
    render(<Reset gameState="won" onReset={() => {}} />);
    expect(screen.getByText("Reset")).toBeInTheDocument();
  });
  test("doesn't render Reset button when game is running", () => {
    render(<Reset gameState="run" onReset={() => {}} />);
    expect(screen.queryByText("Reset")).not.toBeInTheDocument();
  });
  test("calls onReset when button is clicked", () => {
    const onReset = jest.fn();
    render(<Reset gameState="won" onReset={onReset} />);
    const resetButton = screen.getByText("Reset");
    fireEvent.click(resetButton);
    expect(onReset).toHaveBeenCalled();
  });
});
