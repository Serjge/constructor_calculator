import { ReactElement } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { BOARD_COMPONENTS } from 'const';
import { Board } from 'enum';
import { setCurrentBoardDrag } from 'store/action';
import {
  selectCalculatorElements,
  selectIsConstructor,
  selectSelectedElements,
} from 'store/selectors';
import { WrapperDesk } from 'style';

export const ElementsDesk = (): ReactElement => {
  const dispatch = useDispatch();

  const boards = useSelector(selectCalculatorElements);
  const isConstructor = useSelector(selectIsConstructor);
  const selectedBoards = useSelector(selectSelectedElements);

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
        const isAddBoard = selectedBoards.find(selectBoard => selectBoard === board);

        return (
          <BoardComponent
            desk="elements"
            key={board}
            data-currency={board}
            onDragStart={handleDragStart(board)}
            draggable={!isAddBoard}
            isDisable={!!isAddBoard}
          />
        );
      })}
    </WrapperDesk>
  );
};
