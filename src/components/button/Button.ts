import styled, { css } from 'styled-components';

type ButtonPropsType = {
  typeButton?: 'long' | 'default' | 'medium' | 'small';
  cursor?: string;
  isVisible?: boolean;
  isAddLayout?: boolean;
};

export const Button = styled.div<ButtonPropsType>`
  ${({
    typeButton,
    theme: { mainBackgroundColor, mainColor, mainFontColor, mainBorderColor },
  }) => `
  background: ${typeButton === 'long' ? mainColor : mainBackgroundColor};
  height: ${typeButton === 'long' ? '64px' : '48px'};
  color: ${typeButton === 'long' ? mainBackgroundColor : mainFontColor};
  border: 2px solid
    ${typeButton === 'long' ? mainColor : mainBorderColor};
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

  ${({
    isAddLayout,
    isVisible,
    typeButton,
    cursor,
    theme: { mainColor, mainBorderColor, mainBackgroundColor },
  }) => {
    if (!isVisible && isAddLayout) {
      return css`
        cursor: pointer;

        &:hover {
          border: 2px solid ${typeButton === 'long' ? mainBorderColor : mainColor};
        }

        &:active {
          background: ${typeButton === 'long' ? mainBorderColor : mainColor};
          color: ${typeButton === 'long' ? mainColor : mainBackgroundColor};
        }
      `;
    }
    return cursor;
  }};
  margin: 4px;
`;
