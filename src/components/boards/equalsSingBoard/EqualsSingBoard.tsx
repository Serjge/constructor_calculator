import { memo, ReactElement } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { Button } from 'components';
import { getResult, setOperator } from 'store/action';
import { selectIsConstructor } from 'store/selectors';
import { selectBoardEqualsSing } from 'store/selectors/selectBoard';
import { WrapperBoard } from 'style';
import { BoardPropsType } from 'types';

export const EqualsSingBoard = memo(
  ({ isDisable, desk = 'layout', ...props }: BoardPropsType): ReactElement => {
    const dispatch = useDispatch();

    const isConstructor = useSelector(selectIsConstructor);
    const board = useSelector(selectBoardEqualsSing);

    const handleClick = (): void => {
      dispatch(getResult());
      dispatch(setOperator(null));
    };

    return (
      <WrapperBoard
        isDraggable={!isDisable}
        isOverBoard={desk === 'layout' && board.isOverBoard}
        isAddLayout={desk === 'layout' && board.isAddLayout}
        isOverDesk={desk === 'layout' && board.isLastElementLayoutDesk}
        isDisable={isDisable}
        {...props}
      >
        {isConstructor ? (
          <Button typeButton="long">=</Button>
        ) : (
          <Button onClick={handleClick} isAddLayout={board.isAddLayout} typeButton="long">
            =
          </Button>
        )}
      </WrapperBoard>
    );
  },
);
