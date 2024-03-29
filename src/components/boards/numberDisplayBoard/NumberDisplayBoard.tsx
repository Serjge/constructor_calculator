import { memo, ReactElement } from 'react';

import { useSelector } from 'react-redux';

import { NumberDisplay } from 'components';
import { Board, Desk } from 'enum';
import { selectIsConstructor, selectSelectedElements } from 'store/selectors';
import { selectLastElementLayoutDesk } from 'store/selectors/selectBoard';
import { WrapperBoard } from 'style';
import { BoardPropsType } from 'types';
import { getCursor } from 'utils';

export const NumberDisplayBoard = memo(
  ({ desk = Desk.layout, ...props }: BoardPropsType): ReactElement => {
    const isConstructor = useSelector(selectIsConstructor);
    const selectedBoards = useSelector(selectSelectedElements);
    const isDisable = selectedBoards.includes(Board.NumberDisplay);
    const lastElementLayoutDesk = useSelector(selectLastElementLayoutDesk);

    return (
      <WrapperBoard
        draggableCursor={getCursor(desk, isDisable, isConstructor, true)}
        // isDraggable={!selectedBoards.includes(Board.NumberDisplay)}
        isAddLayout={desk === Desk.layout && selectedBoards.includes(Board.NumberDisplay)}
        isOverDesk={desk === Desk.layout && lastElementLayoutDesk === Board.NumberDisplay}
        isDisable={desk === Desk.elements && isDisable}
        draggable={desk === Desk.elements && !isDisable}
        data-currency={Board.NumberDisplay}
        {...props}
      >
        <NumberDisplay />
      </WrapperBoard>
    );
  },
);
