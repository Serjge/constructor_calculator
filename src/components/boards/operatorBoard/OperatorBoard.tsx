import { memo, ReactElement } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { Button } from 'components';
import { Board } from 'enum';
import { resetValue, setOperator } from 'store/action';
import { selectIsConstructor, selectSelectedElements } from 'store/selectors';
import {
  selectLastElementLayoutDesk,
  selectOverBoard,
} from 'store/selectors/selectBoard';
import { WrapperBoard } from 'style';
import { BoardPropsType, OperatorType } from 'types';

const OPERATORS: OperatorType[] = ['/', 'X', '-', '+'];

export const OperatorBoard = memo(
  ({ desk = 'layout', ...props }: BoardPropsType): ReactElement => {
    const dispatch = useDispatch();

    const isConstructor = useSelector(selectIsConstructor);
    const isOverBoard = useSelector(selectOverBoard);
    const selectedBoards = useSelector(selectSelectedElements);
    const isDisable = selectedBoards.includes(Board.Operators);
    const lastElementLayoutDesk = useSelector(selectLastElementLayoutDesk);

    const handleClick = (operator: OperatorType): void => {
      dispatch(setOperator(operator));
      dispatch(resetValue());
    };

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
          isAddLayout={selectedBoards.includes(Board.Numbers)}
          onClick={() => handleClick(operator)}
        >
          {operator}
        </Button>
      );
    });

    return (
      <WrapperBoard
        isDraggable={desk === 'elements' ? !isDisable : isDisable}
        isOverBoard={desk === 'layout' && isOverBoard === Board.Operators}
        isAddLayout={desk === 'layout' && selectedBoards.includes(Board.Numbers)}
        isOverDesk={desk === 'layout' && lastElementLayoutDesk === Board.Operators}
        isDisable={desk === 'elements' && isDisable}
        draggable={desk === 'elements' && !isDisable}
        data-currency={Board.Operators}
        {...props}
      >
        {operators}
      </WrapperBoard>
    );
  },
);
