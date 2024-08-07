import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Board from "../components/Board";

const tiles = [null, null, null, "X", "O", null, null, null, null];
const onTitleClick = jest.fn();

describe("Board Component", () => {
  test("renders Board component", () => {
    render(
      <Board
        tiles={tiles}
        onTitleClick={onTitleClick}
        playerTern="X"
        strikeClass=""
      />
    );
    expect(screen.getAllByRole("button")).toHaveLength(9);
  });
  test("calls onTitleClick when a tile is clicked", () => {
    render(
      <Board
        tiles={tiles}
        onTitleClick={onTitleClick}
        playerTern="X"
        strikeClass=""
      />
    );
    const tile = screen.getAllByRole("button")[3];
    fireEvent.click(tile);
    expect(onTitleClick).toHaveBeenCalledWith(3);
  });
  test("renders each Tile with correct value and class", () => {
    render(
      <Board
        tiles={tiles}
        onTitleClick={onTitleClick}
        playerTern="X"
        strikeClass=""
      />
    );
    const tileElements = screen.getAllByRole("button");
    tiles.forEach((value, index) => {
      const tile = tileElements[index];
      expect(tile).toHaveTextContent(value || "");
      const expectedClassName = `tile ${index % 3 < 2 ? "right-border" : ""} ${
        index < 6 ? "bottom-border" : ""
      }`;
      expect(tile).toHaveClass(expectedClassName);
    });
  });
});
