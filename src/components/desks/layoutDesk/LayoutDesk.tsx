import { ReactElement } from 'react';

import { useSelector } from 'react-redux';

import { Wrapper } from './style';

import { Toggle } from 'components';
import { BOARD_COMPONENTS } from 'const';
import { Droppable } from 'hoc/desckHOC/Droppable';
import { Draggable } from 'hoc/draggable/Draggable';
import { Leaf } from 'icon';
import { selectIsConstructor, selectSortSelectedElements } from 'store/selectors';
import { WrapperDesk } from 'style';

const EMPTY_ARRAY = 0;

export const LayoutDesk = (): ReactElement => {
  const isConstructor = useSelector(selectIsConstructor);
  const selectedBoards = useSelector(selectSortSelectedElements);

  const boards = selectedBoards.map(
    ({ isAddLayout, id, type, isDisable, isLastElementLayoutDesk, isOverBoard }) => {
      const BoardComponent = BOARD_COMPONENTS[type];

      if (!isConstructor) {
        return <BoardComponent key={id} isAddLayout={isAddLayout} data-currency={type} />;
      }

      return (
        <Draggable key={id} id={id} type={type}>
          <BoardComponent
            key={id}
            isDraggable={!isDisable}
            isOverBoard={isOverBoard}
            isAddLayout={isAddLayout}
            isOverDesk={isLastElementLayoutDesk}
          />
        </Draggable>
      );
    },
  );

  if (selectedBoards.length === EMPTY_ARRAY) {
    return (
      <div>
        <Toggle />
        <Droppable>
          <Wrapper data-currency="emptyDesk">
            <Leaf />
            <div>
              <span>Перетащите сюда</span>любой элемент из левой панели
            </div>
          </Wrapper>
        </Droppable>
      </div>
    );
  }
  return (
    <div>
      <Toggle />
      {!isConstructor ? (
        <WrapperDesk data-currency="filledDesk">{boards}</WrapperDesk>
      ) : (
        <Droppable>
          <WrapperDesk data-currency="filledDesk">{boards}</WrapperDesk>
        </Droppable>
      )}
    </div>
  );
};
