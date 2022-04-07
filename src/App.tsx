import React, { ReactElement, useState } from 'react';

import { useSelector } from 'react-redux';

import { ElementsDesk, LayoutDesk } from 'components';
import { selectCalculatorElements } from 'store/selectors';
import { BoardType } from 'types';

export const App = (): ReactElement => {
  const boards = useSelector(selectCalculatorElements);

  const [oneBoards, setOneBoards] = useState(boards);
  const [twoBoards, setTwoBoards] = useState<BoardType[]>([]);

  const [currentBoard, setCurrentBoard] = useState<BoardType | null>(null);

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
        }}
      >
        <ElementsDesk oneBoards={oneBoards} setCurrentItem={setCurrentBoard} />

        {/* <Toggle /> */}
        <LayoutDesk
          setCurrentBoard={setCurrentBoard}
          currentBoard={currentBoard}
          oneBoards={oneBoards}
          setOneBoards={setOneBoards}
          setTwoBoards={setTwoBoards}
          twoBoards={twoBoards}
        />
      </div>
    </div>
  );
};
