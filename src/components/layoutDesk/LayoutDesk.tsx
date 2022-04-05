import React, { ReactElement } from 'react';

import { useSelector } from 'react-redux';

import { Wrapper } from 'components/layoutDesk/style';
import { BOARD_COMPONENTS } from 'const';
import { Leaf } from 'icon/Leaf';
import { selectSelectedElements } from 'store/selectors';

export const LayoutDesk = (): ReactElement => {
  const boards = useSelector(selectSelectedElements);

  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  if (boards.length === 0) {
    return (
      <Wrapper data-currency="board">
        <div>
          <Leaf />
          <span>Перетащите сюда</span>любой элемент из левой панели
        </div>
      </Wrapper>
    );
  }

  return (
    <div>
      {boards.map(({ type }) => {
        const BoardComponent = BOARD_COMPONENTS[type];
        return <BoardComponent key={type} />;
      })}
    </div>
  );
};
