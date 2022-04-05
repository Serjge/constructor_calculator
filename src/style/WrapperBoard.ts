import styled from 'styled-components';

export const WrapperBoard = styled.div`
  width: 240px;
  margin: 12px;
  display: flex;
  flex-wrap: wrap;
  background-color: ${({ theme: { mainBackgroundColor } }) => mainBackgroundColor};
  border-radius: 4px;
  cursor: grab;

  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.06), 0 4px 6px rgba(0, 0, 0, 0.1);
`;
