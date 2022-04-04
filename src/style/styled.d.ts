import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    backgroundColor: string;
    mainFontColor: string;
    secondFontColor:string;
    mainColor: string;
    borderColor:string;
  }
}