import { ReactElement } from 'react';

import { useSelector } from 'react-redux';

import { Toggle, Draggable, Droppable } from 'components';
import { BOARD_COMPONENTS } from 'const';
import { selectIsConstructor, selectSelectedElements } from 'store/selectors';
import { WrapperDesk } from 'style';

export const LayoutDesk = (): ReactElement => {
  const isConstructor = useSelector(selectIsConstructor);
  const selectedBoards = useSelector(selectSelectedElements);

  const boards = selectedBoards.map(board => {
    const BoardComponent = BOARD_COMPONENTS[board];

    if (!isConstructor) {
      return <BoardComponent key={board} data-currency={board} />;
    }

    return (
      <Draggable key={board} type={board}>
        <BoardComponent />
      </Draggable>
    );
  });

  return (
    <div>
      <Toggle />
      {!isConstructor ? (
        <WrapperDesk data-currency="filledDesk">{boards}</WrapperDesk>
      ) : (
        <Droppable>{boards}</Droppable>
      )}
    </div>
  );
};
