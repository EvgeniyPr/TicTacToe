import styled from "styled-components";
export const BoardContainer = styled.div`
  display: grid;
  grid-template-columns: 100px 100px 100px;
  grid-template-rows: 100px 100px 100px;
  cursor: pointer;
  position: relative;

  @media (max-width: 600px) {
    grid-template-columns: repeat(3, 80px);
    grid-template-rows: repeat(3, 80px);
  }
`;
