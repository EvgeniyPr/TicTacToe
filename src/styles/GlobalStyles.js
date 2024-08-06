import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  body {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #23272f;
    color: white;
    margin: 0;
    font-family: Arial, Helvetica, sans-serif;
    
  }

  h1 {
    text-align: center;
  }
`;

export default GlobalStyles;
