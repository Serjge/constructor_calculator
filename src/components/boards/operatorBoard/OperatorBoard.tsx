import { memo, ReactElement } from 'react';

import { useSelector } from 'react-redux';

import { Button } from 'components';
import { selectIsConstructor } from 'store/selectors';
import { WrapperBoard } from 'style';
import { BoardPropsType } from 'types';

const OPERATORS = ['/', 'X', '-', '+'];

export const OperatorBoard = memo(
  ({ isAddLayout, ...props }: BoardPropsType): ReactElement => {
    const isConstructor = useSelector(selectIsConstructor);

    return (
      <WrapperBoard isAddLayout={isAddLayout} isVisible={isConstructor} {...props}>
        {OPERATORS.map(number => (
          <Button
            isAddLayout={isAddLayout}
            isVisible={isConstructor}
            typeButton="small"
            key={number}
          >
            {number}
          </Button>
        ))}
      </WrapperBoard>
    );
  },
);
