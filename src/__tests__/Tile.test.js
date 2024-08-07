import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Tile from "../components/Tile";

describe("Tile Component", () => {
  test("renders Tile component", () => {
    render(
      <Tile value="X" className="tile" onClick={() => {}} playerTern="X" />
    );
    expect(screen.getByText("X")).toBeInTheDocument();
  });

  test("calls onClick when clicked", () => {
    const onClick = jest.fn();
    render(
      <Tile value="X" className="tile" onClick={onClick} playerTern="X" />
    );
    const tile = screen.getByText("X");
    fireEvent.click(tile);
    expect(onClick).toHaveBeenCalled();
  });
});
