import { memo, ReactElement } from 'react';

import { useSelector } from 'react-redux';

import { Button } from 'components';
import { Board, Desk } from 'enum';
import { useCalc } from 'hooks/useCalc';
import { selectIsConstructor, selectSelectedElements } from 'store/selectors';
import {
  selectLastElementLayoutDesk,
  selectOverBoard,
} from 'store/selectors/selectBoard';
import { WrapperBoard } from 'style';
import { BoardPropsType, OperatorType } from 'types';

const OPERATORS: OperatorType[] = ['/', 'X', '-', '+'];

export const OperatorBoard = memo(
  ({ desk = Desk.layout, ...props }: BoardPropsType): ReactElement => {
    const isConstructor = useSelector(selectIsConstructor);
    const isOverBoard = useSelector(selectOverBoard);
    const selectedBoards = useSelector(selectSelectedElements);
    const isDisable = selectedBoards.includes(Board.Operators);
    const lastElementLayoutDesk = useSelector(selectLastElementLayoutDesk);

    const { setOperatorClick } = useCalc();

    const operators = OPERATORS.map(operator => {
      if (isConstructor) {
        return (
          <Button typeButton="small" key={operator}>
            {operator}
          </Button>
        );
      }

      return (
        <Button
          key={operator}
          typeButton="small"
          isAddLayout={selectedBoards.includes(Board.Operators)}
          onClick={() => setOperatorClick(operator)}
        >
          {operator}
        </Button>
      );
    });

    return (
      <WrapperBoard
        isDraggable={desk === Desk.elements ? !isDisable : isDisable}
        isOverBoard={desk === Desk.layout && isOverBoard === Board.Operators}
        isAddLayout={desk === Desk.layout && selectedBoards.includes(Board.Operators)}
        isOverDesk={desk === Desk.layout && lastElementLayoutDesk === Board.Operators}
        isDisable={desk === Desk.elements && isDisable}
        draggable={desk === Desk.elements && !isDisable}
        data-currency={Board.Operators}
        {...props}
      >
        {operators}
      </WrapperBoard>
    );
  },
);
