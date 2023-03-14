import { memo, ReactElement } from 'react';

import { useSelector } from 'react-redux';

import { NumberDisplay } from 'components';
import { Board } from 'enum';
import { selectSelectedElements } from 'store/selectors';
import { selectLastElementLayoutDesk } from 'store/selectors/selectBoard';
import { WrapperBoard } from 'style';
import { BoardPropsType } from 'types';

export const NumberDisplayBoard = memo(
  ({ desk = 'layout', ...props }: BoardPropsType): ReactElement => {
    const selectedBoards = useSelector(selectSelectedElements);
    const isDisable = selectedBoards.includes(Board.NumberDisplay);
    const lastElementLayoutDesk = useSelector(selectLastElementLayoutDesk);

    return (
      <WrapperBoard
        isDraggable={!selectedBoards.includes(Board.Numbers)}
        isAddLayout={desk === 'layout' && selectedBoards.includes(Board.Numbers)}
        isOverDesk={desk === 'layout' && lastElementLayoutDesk === Board.NumberDisplay}
        isDisable={desk === 'elements' && isDisable}
        draggable={desk === 'elements' && !isDisable}
        data-currency={Board.NumberDisplay}
        {...props}
      >
        <NumberDisplay />
      </WrapperBoard>
    );
  },
);
