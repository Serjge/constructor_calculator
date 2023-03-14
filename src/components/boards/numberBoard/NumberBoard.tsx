import { memo, ReactElement } from 'react';

import { useSelector } from 'react-redux';

import { Button } from 'components';
import { Board, Desk } from 'enum';
import { useCalc } from 'hooks/useCalc';
import {
  selectIsConstructor,
  selectLastElementLayoutDesk,
  selectOverBoard,
  selectSelectedElements,
} from 'store/selectors';
import { WrapperBoard } from 'style';
import { BoardPropsType } from 'types';

const NUMBERS = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0', '.'];

export const NumberBoard = memo(
  ({ desk = Desk.layout, ...props }: BoardPropsType): ReactElement => {
    const { setNumberClick } = useCalc();

    const isConstructor = useSelector(selectIsConstructor);
    const isOverBoard = useSelector(selectOverBoard);
    const lastElementLayoutDesk = useSelector(selectLastElementLayoutDesk);
    const selectedBoards = useSelector(selectSelectedElements);
    const isDisable = selectedBoards.includes(Board.Numbers);

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
          onClick={() => setNumberClick(number)}
        >
          {number}
        </Button>
      );
    });

    return (
      <WrapperBoard
        isDraggable={desk === Desk.elements ? !isDisable : isDisable}
        isOverBoard={desk === Desk.layout && isOverBoard === Board.Numbers}
        isAddLayout={desk === Desk.layout && selectedBoards.includes(Board.Numbers)}
        isOverDesk={desk === Desk.layout && lastElementLayoutDesk === Board.Numbers}
        isDisable={desk === Desk.elements && isDisable}
        draggable={desk === Desk.elements && !isDisable}
        data-currency={Board.Numbers}
        {...props}
      >
        {numbers}
      </WrapperBoard>
    );
  },
);
