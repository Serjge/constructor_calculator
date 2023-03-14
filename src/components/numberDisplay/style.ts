import styled from 'styled-components';

type WrapperPropsType = {
  value: string;
};

const WIDTH_NUMBER_DISPLAY = 230;
const COEFFICIENT = 1.35;
const MIN_LENGTH_NUMBER = 10;

export const Wrapper = styled.div<WrapperPropsType>`
  margin: 4px;
  width: 232px;
  height: 60px;
  border: 4px solid ${({ theme: { mainBorderColor } }) => mainBorderColor};
  padding: 8px;
  font-weight: 800;
  font-size: ${({ value }) => {
    if (value.length > MIN_LENGTH_NUMBER) {
      return `${(WIDTH_NUMBER_DISPLAY / value.length) * COEFFICIENT}px`;
    }

    return '32px';
  }};
  line-height: 44px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background: ${({ theme: { mainBorderColor } }) => mainBorderColor};
  border-radius: 6px;
  overflow: hidden;
`;
