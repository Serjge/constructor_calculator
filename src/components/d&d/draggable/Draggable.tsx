import { DragEvent, FC } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { Board } from 'enum';
import { useSetOverWhichBoard } from 'hooks';
import {
  addBoard,
  deleteBoard,
  setCurrentBoardDrag,
  setOrder,
  setOverBoard,
} from 'store/action';
import {
  selectCurrentBoard,
  selectCurrentBoardDrag,
  selectSelectedElements,
} from 'store/selectors';

type DraggableProps = {
  type: Board;
};

export const Draggable: FC<DraggableProps> = ({ type, children }) => {
  const dispatch = useDispatch();

  const setOverWhichBoard = useSetOverWhichBoard();

  const selectedBoards = useSelector(selectSelectedElements);
  const currentBoardDrag = useSelector(selectCurrentBoardDrag);
  const currentBoard = useSelector(selectCurrentBoard);

  const handleDragOver = (e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    setOverWhichBoard(e, '#F0F9FF');
  };

  const handleDropToBoard =
    (draggableBoardId: string) =>
    (e: DragEvent<HTMLDivElement>): void => {
      e.preventDefault();
      setOverWhichBoard(e, 'none');
      e.stopPropagation();

      const dragBoardLayoutDesk = selectedBoards.find(el => el === currentBoard);
      const destinationIndex = selectedBoards.findIndex(el => el === draggableBoardId);
      if (dragBoardLayoutDesk) {
        const sourceIndex = selectedBoards.findIndex(el => el === currentBoardDrag);
        const destinationBoard = selectedBoards[destinationIndex];

        if (destinationBoard !== Board.NumberDisplay) {
          dispatch(setOrder({ sourceIndex, destinationIndex }));
        }
      } else if (currentBoard) {
        if (!selectedBoards.includes(currentBoard)) {
          dispatch(addBoard({ board: currentBoard, destinationIndex }));
        }
      }
      dispatch(setCurrentBoardDrag(null));
    };

  const handleDragLeave = (): void => {
    dispatch(setOverBoard({ typeBoard: null }));
  };

  const handleDragEnd = (e: DragEvent<HTMLDivElement>): void => {
    e.currentTarget.style.background = 'none';
    e.stopPropagation();
  };

  const handleDragStart = (draggableBoardId: Board) => () => {
    dispatch(setCurrentBoardDrag(draggableBoardId));
  };

  const deleteBoardToLayoutDesk = (boardId: Board) => () => {
    dispatch(deleteBoard(boardId));
  };

  const isDraggableNumberDisplay = type !== Board.NumberDisplay;

  return (
    <div
      data-currency={type}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDropToBoard(type)}
      onDragStart={handleDragStart(type)}
      draggable={isDraggableNumberDisplay}
      onDoubleClick={deleteBoardToLayoutDesk(type)}
    >
      {children}
    </div>
  );
};
