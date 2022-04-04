import styled from 'styled-components';

type ButtonPropsType = {
  typeButton?: 'long' | 'default';
};

export const Button = styled.div<ButtonPropsType>`
  background: ${({ typeButton, theme: { backgroundColor, mainColor } }) =>
    typeButton === 'long' ? mainColor : backgroundColor};
  width: ${({ typeButton }) => (typeButton === 'long' ? '232px' : '72px')};
  height: ${({ typeButton }) => (typeButton === 'long' ? '64px' : '48px')};
  color: ${({ typeButton, theme: { backgroundColor, mainFontColor } }) =>
    typeButton === 'long' ? backgroundColor : mainFontColor};
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid ${({ theme: { borderColor } }) => borderColor};
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    border: 2px solid ${({ theme: { mainColor } }) => mainColor};
  }

  &:active {
    background: ${({ theme: { mainColor } }) => mainColor};
    color: ${({ theme: { backgroundColor } }) => backgroundColor};
  }
`;
