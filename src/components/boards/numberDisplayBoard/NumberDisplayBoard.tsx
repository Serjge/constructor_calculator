import { memo, ReactElement } from 'react';

import { useSelector } from 'react-redux';

import { NumberDisplay } from 'components';
import { selectBoardNumberDisplay } from 'store/selectors/selectBoard';
import { WrapperBoard } from 'style';
import { BoardPropsType } from 'types';

export const NumberDisplayBoard = memo(
  ({ isDisable, desk = 'layout', ...props }: BoardPropsType): ReactElement => {
    const board = useSelector(selectBoardNumberDisplay);

    return (
      <WrapperBoard
        isDraggable={!board.isAddLayout}
        isOverBoard={desk === 'layout' && board.isOverBoard}
        isAddLayout={desk === 'layout' && board.isAddLayout}
        isOverDesk={desk === 'layout' && board.isLastElementLayoutDesk}
        isDisable={isDisable}
        {...props}
      >
        <NumberDisplay />
      </WrapperBoard>
    );
  },
);
