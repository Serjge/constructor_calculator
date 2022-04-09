import { memo, ReactElement } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { Button } from 'components';
import { setValue } from 'store/action';
import { selectIsConstructor, selectVisibleValue } from 'store/selectors';
import { WrapperBoard } from 'style';
import { BoardPropsType } from 'types';

const NUMBERS = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0', ','];

const MAX_LENGTH_NUMBER = 16;

export const NumberBoard = memo(
  ({ isAddLayout, ...props }: BoardPropsType): ReactElement => {
    const dispatch = useDispatch();

    const isConstructor = useSelector(selectIsConstructor);
    const value = useSelector(selectVisibleValue);

    const handleClick = (number: string): void => {
      if (value.length < MAX_LENGTH_NUMBER) {
        dispatch(setValue(number));
      }
    };

    const numbers = NUMBERS.map(number => {
      if (isConstructor) {
        return (
          <Button typeButton={number === '0' ? 'medium' : 'default'} key={number}>
            {number}
          </Button>
        );
      }
      return (
        <Button
          isVisible={isConstructor}
          isAddLayout={isAddLayout}
          typeButton={number === '0' ? 'medium' : 'default'}
          key={number}
          onClick={() => handleClick(number)}
        >
          {number}
        </Button>
      );
    });

    return (
      <WrapperBoard isAddLayout={isAddLayout} isVisible={isConstructor} {...props}>
        {numbers}
      </WrapperBoard>
    );
  },
);
