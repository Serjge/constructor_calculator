import React, { ReactElement } from 'react';

import {
  EqualsSingBoard,
  NumberBoard,
  NumberDisplayBoard,
  OperatorBoard,
} from 'components/boards';
import { BoardsType } from 'types';

type boardType = {
  id: string;
  type: BoardsType;
  isDisable: boolean;
  dataCurrency: BoardsType;
};

export const DeskWithCalculatorElements = (): ReactElement => {
  const initialsState: boardType[] = [
    { id: '1', type: 'numberDisplay', isDisable: false, dataCurrency: 'numberDisplay' },
    { id: '2', type: 'operators', isDisable: false, dataCurrency: 'operators' },
    { id: '3', type: 'numbers', isDisable: false, dataCurrency: 'numbers' },
    { id: '4', type: 'equalsSing', isDisable: false, dataCurrency: 'equalsSing' },
  ];

  const getBoard = (typeBoard: BoardsType): ReactElement => {
    switch (typeBoard) {
      case 'equalsSing':
        return <EqualsSingBoard />;
      case 'numbers':
        return <NumberBoard />;
      case 'operators':
        return <OperatorBoard />;
      default:
        return <NumberDisplayBoard />;
    }
  };

  return <div>{initialsState.map(({ type }) => getBoard(type))}</div>;
};
