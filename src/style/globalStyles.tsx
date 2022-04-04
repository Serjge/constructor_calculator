import { createGlobalStyle, DefaultTheme } from 'styled-components';

export type GlobalThemeProps = {
  theme: DefaultTheme;
};

export const GlobalStyle = createGlobalStyle<GlobalThemeProps>`

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
  }

  body {
    font-weight: 500;
    font-size: 14px;
    line-height: 15px;
    font-family: "Inter", sans-serif;
    -webkit-font-smoothing: antialiased;
    margin: 0 auto;
    //background-color: ${({ theme: { mainBackgroundColor } }) => mainBackgroundColor};
    background-color: grey;
    color: ${({ theme: { mainFontColor } }) => mainFontColor};
  }
`;
