import { ReactElement } from 'react';

import { useSelector } from 'react-redux';

import { Wrapper } from './style';

import { selectVisibleValue } from 'store/selectors';

type NumberDisplayPropsType = {
  value?: string;
};

export const NumberDisplay = ({ ...props }: NumberDisplayPropsType): ReactElement => {
  const value = useSelector(selectVisibleValue);

  return (
    <Wrapper value={value} {...props}>
      <span>{value === '' ? '0' : Number(value)}</span>
    </Wrapper>
  );
};
