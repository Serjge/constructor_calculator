import { ReactElement, DragEvent } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { BOARD_COMPONENTS } from 'const';
import { setCurrentBoardDragId } from 'store/action';
import { selectCalculatorElements } from 'store/selectors';
import { WrapperDesk } from 'style';

export const ElementsDesk = (): ReactElement => {
  const dispatch = useDispatch();

  const boards = useSelector(selectCalculatorElements);

  const handleDragStart = (
    e: DragEvent<HTMLDivElement>,
    draggableBoardId: string,
  ): void => {
    dispatch(setCurrentBoardDragId(draggableBoardId));
  };

  return (
    <WrapperDesk>
      {boards.map(({ id, type, isDisable, dataCurrency }) => {
        const BoardComponent = BOARD_COMPONENTS[type];
        return (
          <BoardComponent
            key={id}
            role="presentation"
            isDisable={isDisable}
            draggable={!isDisable}
            isDraggable={!isDisable}
            data-currency={dataCurrency}
            onDragStart={(e: DragEvent<HTMLDivElement>) => handleDragStart(e, id)}
          />
        );
      })}
    </WrapperDesk>
  );
};
