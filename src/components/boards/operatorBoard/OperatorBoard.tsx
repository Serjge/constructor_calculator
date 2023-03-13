import { memo, ReactElement } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { Button } from 'components';
import { resetValue, setOperator } from 'store/action';
import { selectIsConstructor } from 'store/selectors';
import { selectBoardOperators } from 'store/selectors/selectBoard';
import { WrapperBoard } from 'style';
import { BoardPropsType, OperatorType } from 'types';

const OPERATORS: OperatorType[] = ['/', 'X', '-', '+'];

export const OperatorBoard = memo(
  ({ isDisable, desk = 'layout', ...props }: BoardPropsType): ReactElement => {
    const dispatch = useDispatch();

    const isConstructor = useSelector(selectIsConstructor);
    const board = useSelector(selectBoardOperators);

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
          isAddLayout={board.isAddLayout}
          onClick={() => handleClick(operator)}
        >
          {operator}
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
        {operators}
      </WrapperBoard>
    );
  },
);
