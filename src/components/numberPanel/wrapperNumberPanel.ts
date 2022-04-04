import styled from 'styled-components';

export const WrapperNumberPanel = styled.div`
  width: 232px;
  height: 60px;
  border: 4px solid ${({ theme: { borderColor } }) => borderColor};
  padding: 8px;
  font-weight: 800;
  font-size: 36px;
  line-height: 44px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background: ${({ theme: { backgroundColor } }) => backgroundColor};
  border-radius: 6px;
`;
