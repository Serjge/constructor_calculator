import { memo, ReactElement } from 'react';

import { useSelector } from 'react-redux';

import { Button } from 'components';
import { selectIsConstructor } from 'store/selectors';
import { WrapperBoard } from 'style';
import { BoardPropsType } from 'types';

const NUMBERS = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0', ','];

export const NumberBoard = memo(
  ({ isAddLayout, ...props }: BoardPropsType): ReactElement => {
    const isConstructor = useSelector(selectIsConstructor);

    return (
      <WrapperBoard isAddLayout={isAddLayout} isVisible={isConstructor} {...props}>
        {NUMBERS.map(number => (
          <Button
            isVisible={isConstructor}
            isAddLayout={isAddLayout}
            typeButton={number === '0' ? 'medium' : 'default'}
            key={number}
          >
            {number}
          </Button>
        ))}
      </WrapperBoard>
    );
  },
);
