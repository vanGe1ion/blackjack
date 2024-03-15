import { normalize } from "polished";
import { createGlobalStyle } from "styled-components";

export const Normalize = createGlobalStyle`
  ${normalize()}
  html {
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    -webkit-font-smoothing: antialiased;
    font-family: "Arial", sans-serif;
    font-weight: 400;
    line-height: normal;
    background: white;
    font-size: 10px;
    box-sizing: border-box;
  }

  body {
    margin: 0;
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }

  html, body, #root {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
`;
