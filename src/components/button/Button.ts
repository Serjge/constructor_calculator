import styled from 'styled-components';

type ButtonPropsType = {
  typeButton?: 'long' | 'default' | 'medium' | 'small';
};

export const Button = styled.div<ButtonPropsType>`
  ${({
    typeButton,
    theme: { mainBackgroundColor, mainColor, mainFontColor, borderColor },
  }) => `
  background: ${typeButton === 'long' ? mainColor : mainBackgroundColor};
  height: ${typeButton === 'long' ? '64px' : '48px'};
  color: ${typeButton === 'long' ? mainBackgroundColor : mainFontColor};
  border: 2px solid
    ${typeButton === 'long' ? mainColor : borderColor};
   `}
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
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  cursor: pointer;
  margin: 4px;

  &:hover {
    border: 2px solid
      ${({ typeButton, theme: { mainColor, borderColor } }) =>
        typeButton === 'long' ? borderColor : mainColor};
  }

  &:active {
    ${({ typeButton, theme: { mainColor, mainBackgroundColor, borderColor } }) => `
      background:  ${typeButton === 'long' ? borderColor : mainColor};
      color: ${typeButton === 'long' ? mainColor : mainBackgroundColor};
        `}
  }
`;
