import styled from 'styled-components';

export const Wrapper = styled.div`
  margin: 30px;
  display: flex;
  width: 243px;
  height: 480px;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 15px;

  box-sizing: border-box;
  border-radius: 6px;

  border: 2px dashed ${({ theme: { secondBorderColor } }) => secondBorderColor};
  & div {
    width: 130px;
    text-align: center;
  }

  & span {
    margin: 10px 0 5px 0;
    width: 130px;
    display: block;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    color: ${({ theme: { mainColor } }) => mainColor};
  }
`;
