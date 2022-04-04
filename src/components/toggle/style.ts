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
  border-radius: ${isActive ? '5px' : ''};
  `};
  display: flex;
  justify-content: center;
  align-items: center;
  height: 36px;
  padding: 8px 12px;
  font-weight: 500;
  font-size: 14px;
  line-height: 15px;
  cursor: pointer;
`;

export const WrapperToggle = styled.div`
  ${({ theme: { secondBackgroundColor, mainBackgroundColor } }) => `
  border: 1px solid ${mainBackgroundColor};
  background-color: ${secondBackgroundColor};
  `};
  display: flex;
  align-items: center;
  height: 38px;
  border-radius: 6px;
`;
