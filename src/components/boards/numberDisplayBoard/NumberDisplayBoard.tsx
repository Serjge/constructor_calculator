import { memo, ReactElement } from 'react';

import { useSelector } from 'react-redux';

import { NumberDisplay } from 'components';
import { selectIsConstructor } from 'store/selectors';
import { WrapperBoard } from 'style';
import { BoardPropsType } from 'types';

export const NumberDisplayBoard = memo(({ ...props }: BoardPropsType): ReactElement => {
  const isConstructor = useSelector(selectIsConstructor);

  return (
    <WrapperBoard isVisible={isConstructor} {...props}>
      <NumberDisplay />
    </WrapperBoard>
  );
});
