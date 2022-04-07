import { ReactElement } from 'react';

import { Button } from 'components/index';
import { WrapperBoard } from 'style';

type NumberBoardPropsType = {
  isAddLayout?: boolean;
  isDraggable?: boolean;
  isOverDesk?: boolean;
  isOverBoard?: boolean;
};

export const NumberBoard = ({
  isDraggable,
  isAddLayout,
  ...props
}: NumberBoardPropsType): ReactElement => {
  const numbers = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0', ','];
  return (
    <WrapperBoard isAddLayout={isAddLayout} isDraggable={isDraggable} {...props}>
      {numbers.map(number => (
        <Button
          // cursor={cursor}
          typeButton={number === '0' ? 'medium' : 'default'}
          key={number}
        >
          {number}
        </Button>
      ))}
    </WrapperBoard>
  );
};
