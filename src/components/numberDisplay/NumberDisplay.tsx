import { memo, ReactElement, useRef } from 'react';

import { Wrapper } from './style';

type NumberDisplayPropsType = {
  value: string;
};

const WIDTH_NUMBER_DISPLAY = 230;
const COEFFICIENT = 1.35;
const MIN_LENGTH_NUMBER = 10;

export const NumberDisplay = memo(
  ({ value, ...props }: NumberDisplayPropsType): ReactElement => {
    const ref = useRef<HTMLDivElement>(null);

    if (ref.current && value.length > MIN_LENGTH_NUMBER) {
      ref.current!.style.fontSize = String(
        `${(WIDTH_NUMBER_DISPLAY / value.length) * COEFFICIENT}px`,
      );
    }

    return (
      <Wrapper ref={ref} value={value} {...props}>
        <span>{value}</span>
      </Wrapper>
    );
  },
);
