import React, { ReactElement } from 'react';

import { useSelector } from 'react-redux';

import { BOARD_COMPONENTS } from 'const';
import { selectCalculatorElements } from 'store/selectors';

export const DeskWithCalculatorElements = (): ReactElement => {
  const boards = useSelector(selectCalculatorElements);

  return (
    <div style={{ margin: '30px' }}>
      {boards.map(({ type }) => {
        const BoardComponent = BOARD_COMPONENTS[type];
        return <BoardComponent key={type} />;
      })}
    </div>
  );
};
