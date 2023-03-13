import { memo, ReactElement, useCallback } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { Button } from 'components';
import { setValue } from 'store/action';
import { selectIsConstructor } from 'store/selectors';
import { selectBoardNumbers } from 'store/selectors/selectBoard';
import { WrapperBoard } from 'style';
import { BoardPropsType } from 'types';

const NUMBERS = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0', '.'];

export const NumberBoard = memo(
  ({ isDisable, desk = 'layout', ...props }: BoardPropsType): ReactElement => {
    const dispatch = useDispatch();

    const isConstructor = useSelector(selectIsConstructor);
    const board = useSelector(selectBoardNumbers);

    const handleClick = useCallback((number: string): void => {
      dispatch(setValue(number));
    }, []);

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
          isAddLayout={board.isAddLayout}
          typeButton={number === '0' ? 'medium' : 'default'}
          key={number}
          onClick={() => handleClick(number)}
        >
          {number}
        </Button>
      );
    });

    return (
      <WrapperBoard
        isDraggable={!isDisable}
        isOverBoard={desk === 'layout' && board.isOverBoard}
        isAddLayout={desk === 'layout' && board.isAddLayout}
        isOverDesk={desk === 'layout' && board.isLastElementLayoutDesk}
        isDisable={isDisable}
        {...props}
      >
        {numbers}
      </WrapperBoard>
    );
  },
);
