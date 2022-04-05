import React, { ReactElement, useState } from 'react';

import { useSelector } from 'react-redux';

import { ElementsDesk, LayoutDesk } from 'components';
import { selectCalculatorElements } from 'store/selectors';
import { BoardType } from 'types';

export const App = (): ReactElement => {
  const boards = useSelector(selectCalculatorElements);

  const [oneBoards, setOneBoards] = useState(boards);
  const [twoBoards, setTwoBoards] = useState<BoardType[]>([]);

  const [currentBoard, setCurrentBoard] = useState<number | null>(null);
  const [currentItem, setCurrentItem] = useState<BoardType | null>(null);

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
        <ElementsDesk
          oneBoards={oneBoards}
          setCurrentBoard={setCurrentBoard}
          setCurrentItem={setCurrentItem}
        />

        {/* <Toggle /> */}
        <LayoutDesk
          setCurrentItem={setCurrentItem}
          setCurrentBoard={setCurrentBoard}
          currentItem={currentItem}
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
