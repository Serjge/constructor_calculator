import styled, { css, FlattenSimpleInterpolation } from 'styled-components';

type WrapperBoardPropsType = {
  isAddLayout?: boolean;
  isDraggable?: boolean;
  isOverDesk?: boolean;
  isOverBoard?: boolean;
};

const elementShadow = css`
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.06), 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const afterElement = (
  isOverDesk?: boolean,
  isOverBoard?: boolean,
): FlattenSimpleInterpolation => css`
  &:after {
    content: '';
    position: absolute;
    width: 240px;
    height: 1px;
    top: ${isOverBoard ? '-4px' : ''};
    bottom: ${isOverDesk ? '-4px' : ''};
    background-color: red;
  }
`;

const nullCss = css``;

export const WrapperBoard = styled.div<WrapperBoardPropsType>`
  width: 240px;
  margin: 8px 0;
  display: flex;
  flex-wrap: wrap;
  background-color: ${({ theme: { mainBackgroundColor } }) => mainBackgroundColor};
  border-radius: 4px;
  position: relative;

  cursor: ${({ isDraggable }) => (isDraggable ? 'move' : 'not-allowed')};

  ${({ isAddLayout }) => {
    if (!isAddLayout) {
      return elementShadow;
    }
    return nullCss;
  }}

  ${({ isOverDesk, isOverBoard }) => {
    if (isOverBoard || isOverDesk) {
      return afterElement(isOverDesk, isOverBoard);
    }
    return undefined;
  }} //&:after {
  //  content: '';
  //  position: absolute;
  //  width: 240px;
  //  height: 1px;
  //  top: -4px;
  //  background-color: red;
  //}

  //&:before {
  //  content: '';
  //  position: absolute;
  //  width: 240px;
  //  height: 1px;
  //  bottom: -4px;
  //  background-color: red;
  //}
`;
