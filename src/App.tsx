import React, { ReactElement, useState } from 'react';

import { useSelector } from 'react-redux';

import { ElementsDesk, LayoutDesk } from 'components';
import { selectCalculatorElements, selectSelectedElements } from 'store/selectors';
import { BoardType } from 'types';

export const App = (): ReactElement => {
  const boards = useSelector(selectCalculatorElements);
  const boards2 = useSelector(selectSelectedElements);

  const [oneBoards, setOneBoards] = useState(boards);
  const [twoBoards, setTwoBoards] = useState<BoardType[]>(boards2);

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
        <ElementsDesk oneBoards={oneBoards} />

        {/* <Toggle /> */}
        <LayoutDesk
          oneBoards={oneBoards}
          setOneBoards={setOneBoards}
          setTwoBoards={setTwoBoards}
          twoBoards={twoBoards}
        />
      </div>
    </div>
  );
};
