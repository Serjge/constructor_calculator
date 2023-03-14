import { ReactElement } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { BOARD_COMPONENTS } from 'const';
import { Board, Desk } from 'enum';
import { setCurrentBoardDrag } from 'store/action';
import { selectCalculatorElements, selectIsConstructor } from 'store/selectors';
import { WrapperDesk } from 'style';

export const ElementsDesk = (): ReactElement => {
  const dispatch = useDispatch();

  const boards = useSelector(selectCalculatorElements);
  const isConstructor = useSelector(selectIsConstructor);

  const handleDragStart = (draggableBoard: Board) => () => {
    dispatch(setCurrentBoardDrag(draggableBoard));
  };

  if (!isConstructor) {
    return <WrapperDesk />;
  }

  return (
    <WrapperDesk>
      {boards.map(board => {
        const BoardComponent = BOARD_COMPONENTS[board];

        return (
          <BoardComponent
            desk={Desk.elements}
            key={board}
            onDragStart={handleDragStart(board)}
          />
        );
      })}
    </WrapperDesk>
  );
};
