import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Strike from "../components/Strike";

describe("Strike Component", () => {
  test("renders Strike component with correct class", () => {
    render(<Strike strikeClass="strike-row-1" />);
    const strikeElement = screen.getByTestId("strike-component");
    expect(strikeElement).toHaveClass("strike-row-1");
  });
});
