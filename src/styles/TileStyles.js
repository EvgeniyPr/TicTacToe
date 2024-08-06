import styled from "styled-components";
export const TileContainer = styled.div`
  color: currentColor;
  font-size: 2em;
  display: flex;
  justify-content: center;
  align-items: center;
  border-right: ${({ className }) =>
    className.includes("right-border") ? "0.2em solid #0074a6" : "none"};
  border-bottom: ${({ className }) =>
    className.includes("bottom-border") ? "0.2em solid #0074a6" : "none"};
  cursor: pointer;

  &:hover::after {
    content: ${({ value, "data-playertern": playerTern }) =>
      value === null ? `"${playerTern}"` : '""'};
    opacity: 0.4;
  }

  @media (max-width: 600px) {
    font-size: 1.5em;
  }
`;
