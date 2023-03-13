import { DragEvent, FC, ReactElement } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { useSetOverWhichBoard } from 'hooks';
import { Leaf } from 'icon';
import { addBoard, setCurrentBoardDrag, setLastElementLayoutDesk } from 'store/action';
import {
  selectCurrentBoard,
  selectBoards,
  selectSelectedElements,
} from 'store/selectors';
import { WrapperDesk } from 'style';

const EMPTY_ARRAY = 0;
const LAST_ELEMENT_ARRAY = 1;

export const Droppable: FC = ({ children }): ReactElement => {
  const dispatch = useDispatch();

  const setOverWhichBoard = useSetOverWhichBoard();

  const selectedBoards = useSelector(selectSelectedElements);
  const currentBoard = useSelector(selectCurrentBoard);
  const board = useSelector(selectBoards);

  const handleDragOver = (e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    setOverWhichBoard(e, '#F0F9FF', true);
    e.stopPropagation();

    if (!board[currentBoard!].isAddLayout) {
      if (selectedBoards.length !== EMPTY_ARRAY) {
        dispatch(
          setLastElementLayoutDesk({
            isLastElementLayoutDesk: true,
            typeBoard: selectedBoards[selectedBoards.length - LAST_ELEMENT_ARRAY],
          }),
        );
      }
    }
  };

  const handleDropToLayoutDesk = (e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.style.background = 'none';

    if (currentBoard) {
      if (!board[currentBoard].isAddLayout) {
        dispatch(addBoard({ board: currentBoard }));
      }
    }
    dispatch(setCurrentBoardDrag(null));
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>): void => {
    setOverWhichBoard(e, 'none', false);
  };

  if (selectedBoards.length === EMPTY_ARRAY) {
    return (
      <WrapperDesk
        isEmptyDesk
        data-currency="emptyDesk"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDropToLayoutDesk}
      >
        <Leaf />
        <div>
          <span>Перетащите сюда</span>любой элемент из левой панели
        </div>
      </WrapperDesk>
    );
  }
  return (
    <WrapperDesk
      data-currency="filledDesk"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDropToLayoutDesk}
    >
      {children}
    </WrapperDesk>
  );
};
