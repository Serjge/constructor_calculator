import { ReactElement, useRef } from 'react';

import { useSelector } from 'react-redux';

import { Wrapper } from './style';

import { selectVisibleValue } from 'store/selectors';

type NumberDisplayPropsType = {
  value?: string;
};

const WIDTH_NUMBER_DISPLAY = 230;
const COEFFICIENT = 1.35;
const MIN_LENGTH_NUMBER = 10;

export const NumberDisplay = ({ ...props }: NumberDisplayPropsType): ReactElement => {
  const value = useSelector(selectVisibleValue);

  const ref = useRef<HTMLDivElement>(null);

  if (ref.current && value.length > MIN_LENGTH_NUMBER) {
    ref.current!.style.fontSize = String(
      `${(WIDTH_NUMBER_DISPLAY / value.length) * COEFFICIENT}px`,
    );
  }
  if (ref.current && value.length < MIN_LENGTH_NUMBER) {
    ref.current!.style.fontSize = '32px';
  }

  return (
    <Wrapper ref={ref} value={value} {...props}>
      <span>{value === '' ? '0' : value}</span>
    </Wrapper>
  );
};
