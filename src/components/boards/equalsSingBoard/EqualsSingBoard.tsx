import { memo, ReactElement } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { Button } from 'components';
import { Board, Desk } from 'enum';
import { getResult, setOperator } from 'store/action';
import { selectIsConstructor, selectSelectedElements } from 'store/selectors';
import {
  selectLastElementLayoutDesk,
  selectOverBoard,
} from 'store/selectors/selectBoard';
import { WrapperBoard } from 'style';
import { BoardPropsType } from 'types';

export const EqualsSingBoard = memo(
  ({ desk = Desk.layout, ...props }: BoardPropsType): ReactElement => {
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
        isDraggable={desk === Desk.elements ? !isDisable : isDisable}
        isOverBoard={desk === Desk.layout && isOverBoard === Board.EqualsSing}
        isAddLayout={desk === Desk.layout && selectedBoards.includes(Board.EqualsSing)}
        isOverDesk={desk === Desk.layout && lastElementLayoutDesk === Board.EqualsSing}
        isDisable={desk === Desk.elements && isDisable}
        draggable={desk === Desk.elements && !isDisable}
        data-currency={Board.EqualsSing}
        {...props}
      >
        {isConstructor ? (
          <Button typeButton="long">=</Button>
        ) : (
          <Button
            onClick={handleClick}
            isAddLayout={selectedBoards.includes(Board.EqualsSing)}
            typeButton="long"
          >
            =
          </Button>
        )}
      </WrapperBoard>
    );
  },
);
