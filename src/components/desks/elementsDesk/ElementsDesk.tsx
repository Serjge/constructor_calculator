import { ReactElement } from 'react';

import { useSelector } from 'react-redux';

import { BOARD_COMPONENTS } from 'const';
import { Draggable } from 'hoc/draggable/Draggable';
import { selectCalculatorElements, selectIsConstructor } from 'store/selectors';
import { WrapperDesk } from 'style';

export const ElementsDesk = (): ReactElement => {
  const boards = useSelector(selectCalculatorElements);
  const isConstructor = useSelector(selectIsConstructor);

  if (!isConstructor) {
    return <WrapperDesk />;
  }

  return (
    <WrapperDesk>
      {boards.map(({ id, type, isDisable }) => {
        const BoardComponent = BOARD_COMPONENTS[type];
        return (
          <Draggable key={id} desk="elements" type={type} id={id} isDisable={isDisable}>
            <BoardComponent
              role="presentation"
              isDisable={isDisable}
              isDraggable={!isDisable}
            />
          </Draggable>
        );
      })}
    </WrapperDesk>
  );
};
