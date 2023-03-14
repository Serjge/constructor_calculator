import { memo, ReactElement, useCallback } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { Button } from 'components';
import { Board } from 'enum';
import { setValue } from 'store/action';
import { selectIsConstructor, selectSelectedElements } from 'store/selectors';
import {
  selectLastElementLayoutDesk,
  selectOverBoard,
} from 'store/selectors/selectBoard';
import { WrapperBoard } from 'style';
import { BoardPropsType } from 'types';

const NUMBERS = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0', '.'];

export const NumberBoard = memo(
  ({ desk = 'layout', ...props }: BoardPropsType): ReactElement => {
    const dispatch = useDispatch();

    const isConstructor = useSelector(selectIsConstructor);
    const isOverBoard = useSelector(selectOverBoard);
    const lastElementLayoutDesk = useSelector(selectLastElementLayoutDesk);
    const selectedBoards = useSelector(selectSelectedElements);
    const isDisable = selectedBoards.includes(Board.Numbers);

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
          isAddLayout={selectedBoards.includes(Board.Numbers)}
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
        isDraggable={desk === 'elements' ? !isDisable : isDisable}
        isOverBoard={desk === 'layout' && isOverBoard === Board.Numbers}
        isAddLayout={desk === 'layout' && selectedBoards.includes(Board.Numbers)}
        isOverDesk={desk === 'layout' && lastElementLayoutDesk === Board.Numbers}
        isDisable={desk === 'elements' && isDisable}
        draggable={desk === 'elements' && !isDisable}
        data-currency={Board.Numbers}
        {...props}
      >
        {numbers}
      </WrapperBoard>
    );
  },
);
