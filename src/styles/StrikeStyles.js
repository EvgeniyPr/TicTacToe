import styled from "styled-components";
export const StrikeContainer = styled.div`
  position: absolute;
  background-color: darkorange;

  &.strike-row-1 {
    width: 100%;
    height: 4px;
    top: 15%;
  }

  &.strike-row-2 {
    width: 100%;
    height: 4px;
    top: 48%;
  }

  &.strike-row-3 {
    width: 100%;
    height: 4px;
    top: 83%;
  }

  &.strike-column-1 {
    height: 100%;
    width: 4px;
    left: 15%;
  }

  &.strike-column-2 {
    height: 100%;
    width: 4px;
    left: 48%;
  }

  &.strike-column-3 {
    height: 100%;
    width: 4px;
    left: 83%;
  }

  &.strike-diagonal-1 {
    width: 90%;
    height: 4px;
    top: 50%;
    left: 5%;
    transform: skewY(45deg);
  }

  &.strike-diagonal-2 {
    width: 90%;
    height: 4px;
    top: 50%;
    left: 5%;
    transform: skewY(-45deg);
  }
`;
