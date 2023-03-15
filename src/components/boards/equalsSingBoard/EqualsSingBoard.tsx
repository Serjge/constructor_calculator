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
import { BoardPropsType } from 'types';
import { getCursor } from 'utils';

export const EqualsSingBoard = memo(
  ({ desk = Desk.layout, ...props }: BoardPropsType): ReactElement => {
    const { getResultClick } = useCalc();

    const isConstructor = useSelector(selectIsConstructor);
    const isOverBoard = useSelector(selectOverBoard);
    const selectedBoards = useSelector(selectSelectedElements);
    const isDisable = selectedBoards.includes(Board.EqualsSing);
    const lastElementLayoutDesk = useSelector(selectLastElementLayoutDesk);

    return (
      <WrapperBoard
        draggableCursor={getCursor(desk, isDisable, isConstructor)}
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
            onClick={getResultClick}
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
