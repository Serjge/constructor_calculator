import styled from 'styled-components';

type ButtonPropsType = {
  typeButton?: 'long' | 'default' | 'medium' | 'small';
};

export const Button = styled.div<ButtonPropsType>`
  background: ${({ typeButton, theme: { backgroundColor, mainColor } }) =>
    typeButton === 'long' ? mainColor : backgroundColor};
  width: ${({ typeButton }) => {
    switch (typeButton) {
      case 'long':
        return '232px';
      case 'medium':
        return '152px';
      case 'small':
        return '52px';
      default:
        return ' 72px';
    }
  }};
  height: ${({ typeButton }) => (typeButton === 'long' ? '64px' : '48px')};
  color: ${({ typeButton, theme: { backgroundColor, mainFontColor } }) =>
    typeButton === 'long' ? backgroundColor : mainFontColor};
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid ${({ theme: { borderColor } }) => borderColor};
  border-radius: 6px;
  cursor: pointer;
  margin: 4px;

  &:hover {
    border: 2px solid ${({ theme: { mainColor } }) => mainColor};
  }

  &:active {
    background: ${({ theme: { mainColor } }) => mainColor};
    color: ${({ theme: { backgroundColor } }) => backgroundColor};
  }
`;
