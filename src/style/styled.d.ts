import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    mainBackgroundColor: string;
    secondBackgroundColor:string;
    mainFontColor: string;
    secondFontColor:string;
    mainColor: string;
    borderColor:string;
  }
}