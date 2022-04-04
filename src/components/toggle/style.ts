import styled from 'styled-components';

type LeverTogglePropsType = {
  isActive: boolean;
};

export const LeverToggle = styled.div<LeverTogglePropsType>`
  ${({
    isActive,
    theme: { mainBackgroundColor, secondBackgroundColor, secondFontColor },
  }) => `
  background-color: ${isActive ? mainBackgroundColor : secondBackgroundColor};
  color: ${secondFontColor};
  `};
  display: flex;
  justify-content: center;
  align-items: center;
  height: 36px;
  padding: 8px 12px;
  font-weight: 500;
  font-size: 14px;
  line-height: 15px;
  border-radius: 5px;
  cursor: pointer;
`;

export const WrapperToggle = styled.div`
  ${({ theme: { secondBackgroundColor } }) => `
  border: 1px solid ${secondBackgroundColor};
  background-color: ${secondBackgroundColor};
  `};
  //width: 243px;
  display: flex;
  align-items: center;
  height: 38px;
  border-radius: 6px;
`;
