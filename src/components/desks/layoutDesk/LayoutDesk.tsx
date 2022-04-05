import React, { ReactElement } from 'react';

import { Wrapper } from 'components/desks/layoutDesk/style';
import { BOARD_COMPONENTS } from 'const';
import { Desks } from 'enum';
import { Leaf } from 'icon/Leaf';
import { BoardType } from 'types';

type LayoutDeskPropsType = {
  twoBoards: BoardType[];
  setTwoBoards: React.Dispatch<React.SetStateAction<BoardType[]>>;
  setOneBoards: React.Dispatch<React.SetStateAction<BoardType[]>>;
  oneBoards: BoardType[];
  currentBoard: number | null;
  currentItem: BoardType | null;
  setCurrentBoard: React.Dispatch<React.SetStateAction<number | null>>;
  setCurrentItem: React.Dispatch<React.SetStateAction<BoardType | null>>;
};

const ZERO = 0;

export const LayoutDesk = ({
  setOneBoards,
  oneBoards,
  currentBoard,
  currentItem,
  setCurrentItem,
  setCurrentBoard,
  twoBoards,
  setTwoBoards,
}: LayoutDeskPropsType): ReactElement => {
  const dragOverHandler = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    const { currency } = e.currentTarget.dataset;
    if (currency === 'emptyDesk') {
      e.currentTarget.style.background = ' #F0F9FF';
    }
  };

  const dragLeaveHandler = (e: React.DragEvent<HTMLDivElement>): void => {
    const { currency } = e.currentTarget.dataset;
    if (currency === 'emptyDesk') {
      e.currentTarget.style.background = 'none';
    }
  };

  const dragEndHandler = (e: React.DragEvent<HTMLDivElement>): void => {
    e.currentTarget.style.background = 'none';
  };

  const dropHandler = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.currentTarget.style.background = 'none';
  };

  const onDoubleClick = (task: BoardType): void => {
    setTwoBoards(twoBoards.filter(item => item.id !== task.id));
    setOneBoards(
      oneBoards.map(item => (item.id === task.id ? { ...item, isDisable: false } : item)),
    );
  };
  console.log(currentBoard);

  const dropLayoutDeskHandler = (): void => {
    if (currentItem) {
      twoBoards.push(currentItem);
      setTwoBoards([...twoBoards]);
      setOneBoards(
        oneBoards.map(item =>
          item.id === currentItem.id ? { ...item, isDisable: true } : item,
        ),
      );
    }
  };
  const dragStartHandler = (
    e: React.DragEvent<HTMLDivElement>,
    board: number,
    item: BoardType,
  ): void => {
    setCurrentBoard(board);
    setCurrentItem(item);
  };

  if (twoBoards.length === ZERO) {
    return (
      <Wrapper
        onDrop={dropLayoutDeskHandler}
        onDragOver={e => dragOverHandler(e)}
        onDragLeave={(e: React.DragEvent<HTMLDivElement>) => dragLeaveHandler(e)}
        data-currency="emptyDesk"
      >
        <Leaf />
        <div>
          <span>Перетащите сюда</span>любой элемент из левой панели
        </div>
      </Wrapper>
    );
  }

  return (
    <div
      style={{ margin: '30px', width: '243px', height: '480px' }}
      onDrop={dropLayoutDeskHandler}
      onDragOver={(e: React.DragEvent<HTMLDivElement>) => dragOverHandler(e)}
      data-currency="filledDesk"
    >
      {twoBoards.map(item => {
        const BoardComponent = BOARD_COMPONENTS[item.type];
        return (
          <BoardComponent
            key={item.id}
            data-currency={item.dataCurrency}
            onDoubleClick={() => onDoubleClick(item)}
            style={{ opacity: item.isDisable ? '0.5' : '1' }}
            onDragOver={(e: React.DragEvent<HTMLDivElement>) => dragOverHandler(e)}
            onDragLeave={(e: React.DragEvent<HTMLDivElement>) => dragLeaveHandler(e)}
            onDragStart={(e: React.DragEvent<HTMLDivElement>) =>
              dragStartHandler(e, Desks.Layout, item)
            }
            onDragEnd={(e: React.DragEvent<HTMLDivElement>) => dragEndHandler(e)}
            onDrop={(e: React.DragEvent<HTMLDivElement>) => dropHandler(e)}
            onDragCapture={(e: React.DragEvent<HTMLDivElement>) => dragEndHandler(e)}
            draggable={!item.isDisable}
          />
        );
      })}
    </div>
  );
};
