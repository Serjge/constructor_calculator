import styled from 'styled-components';

export const Wrapper = styled.div`
  margin: 4px;
  width: 232px;
  height: 60px;
  border: 4px solid ${({ theme: { mainBorderColor } }) => mainBorderColor};
  padding: 8px;
  font-weight: 800;
  font-size: 36px;
  line-height: 44px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background: ${({ theme: { mainBackgroundColor } }) => mainBackgroundColor};
  border-radius: 6px;
`;