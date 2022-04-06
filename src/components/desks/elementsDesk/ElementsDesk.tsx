import React, { Dispatch, ReactElement } from 'react';

import { BOARD_COMPONENTS } from 'const';
import { Desks } from 'enum';
import { BoardType } from 'types';

type DeskWithCalculatorElementsPropsType = {
  oneBoards: BoardType[];
  setCurrentItem: Dispatch<React.SetStateAction<BoardType | null>>;
};

export const ElementsDesk = ({
  setCurrentItem,
  oneBoards,
}: DeskWithCalculatorElementsPropsType): ReactElement => {
  const dragStartHandler = (
    e: React.DragEvent<HTMLDivElement>,
    board: number,
    item: BoardType,
  ): void => {
    setCurrentItem(item);
  };

  return (
    <div style={{ margin: '30px' }}>
      {oneBoards.map(board => {
        const BoardComponent = BOARD_COMPONENTS[board.type];
        return (
          <BoardComponent
            data-currency={board.dataCurrency}
            role="presentation"
            key={board.id}
            style={{ opacity: board.isDisable ? '0.5' : '1' }}
            onDragStart={(e: React.DragEvent<HTMLDivElement>) =>
              dragStartHandler(e, Desks.Elements, board)
            }
            draggable={!board.isDisable}
          />
        );
      })}
    </div>
  );
};
