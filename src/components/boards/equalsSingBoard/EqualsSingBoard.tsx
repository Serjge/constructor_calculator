import { memo, ReactElement } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { Button } from 'components';
import { Board } from 'enum';
import { getResult, setOperator } from 'store/action';
import { selectIsConstructor, selectSelectedElements } from 'store/selectors';
import {
  selectLastElementLayoutDesk,
  selectOverBoard,
} from 'store/selectors/selectBoard';
import { WrapperBoard } from 'style';
import { BoardPropsType } from 'types';

export const EqualsSingBoard = memo(
  ({ desk = 'layout', ...props }: BoardPropsType): ReactElement => {
    const dispatch = useDispatch();

    const isConstructor = useSelector(selectIsConstructor);
    const isOverBoard = useSelector(selectOverBoard);
    const selectedBoards = useSelector(selectSelectedElements);
    const isDisable = selectedBoards.includes(Board.EqualsSing);
    const lastElementLayoutDesk = useSelector(selectLastElementLayoutDesk);

    const handleClick = (): void => {
      dispatch(getResult());
      dispatch(setOperator(null));
    };

    return (
      <WrapperBoard
        isDraggable={desk === 'elements' ? !isDisable : isDisable}
        isOverBoard={desk === 'layout' && isOverBoard === Board.EqualsSing}
        isAddLayout={desk === 'layout' && selectedBoards.includes(Board.EqualsSing)}
        isOverDesk={desk === 'layout' && lastElementLayoutDesk === Board.EqualsSing}
        isDisable={desk === 'elements' && isDisable}
        draggable={desk === 'elements' && !isDisable}
        data-currency={Board.EqualsSing}
        {...props}
      >
        {isConstructor ? (
          <Button typeButton="long">=</Button>
        ) : (
          <Button
            onClick={handleClick}
            isAddLayout={selectedBoards.includes(Board.Numbers)}
            typeButton="long"
          >
            =
          </Button>
        )}
      </WrapperBoard>
    );
  },
);
