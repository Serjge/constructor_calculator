import { memo, ReactElement } from 'react';

import { useSelector } from 'react-redux';

import { NumberDisplay } from 'components';
import { selectIsConstructor, selectVisibleValue } from 'store/selectors';
import { WrapperBoard } from 'style';
import { BoardPropsType } from 'types';

export const NumberDisplayBoard = memo(({ ...props }: BoardPropsType): ReactElement => {
  const isConstructor = useSelector(selectIsConstructor);
  let value = useSelector(selectVisibleValue);

  if (value === '') {
    value = '0';
  }

  return (
    <WrapperBoard isVisible={isConstructor} {...props}>
      <NumberDisplay value={value} />
    </WrapperBoard>
  );
});
