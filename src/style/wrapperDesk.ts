import styled from 'styled-components';

type WrapperDeskPropsType = {
  isVisible?: boolean;
};

export const WrapperDesk = styled.div<WrapperDeskPropsType>`
  margin: 30px;
  width: 243px;
  height: 480px;
  opacity: ${({ isVisible }) => (isVisible ? '1' : '0')};
`;
