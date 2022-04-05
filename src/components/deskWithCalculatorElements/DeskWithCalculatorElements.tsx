import React, { ReactElement } from 'react';

import { BOARD_COMPONENTS } from 'const';
import { BoardType } from 'types';

export const DeskWithCalculatorElements = (): ReactElement => {
  const initialsState: BoardType[] = [
    { id: '1', type: 'numberDisplay', isDisable: false, dataCurrency: 'numberDisplay' },
    { id: '2', type: 'operators', isDisable: false, dataCurrency: 'operators' },
    { id: '3', type: 'numbers', isDisable: false, dataCurrency: 'numbers' },
    { id: '4', type: 'equalsSing', isDisable: false, dataCurrency: 'equalsSing' },
  ];

  return (
    <div>
      {initialsState.map(({ type }) => {
        const BoardComponent = BOARD_COMPONENTS[type];
        return <BoardComponent key={type} />;
      })}
    </div>
  );
};
