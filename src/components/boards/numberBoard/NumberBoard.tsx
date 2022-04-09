import { memo, ReactElement } from 'react';

import { Button } from 'components';
import { WrapperBoard } from 'style';

type NumberBoardPropsType = {
  isAddLayout?: boolean;
  isDraggable?: boolean;
  isOverDesk?: boolean;
  isOverBoard?: boolean;
  isDisable?: boolean;
};

const NUMBERS = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0', ','];

export const NumberBoard = memo(
  ({ ...props }: NumberBoardPropsType): ReactElement => (
    <WrapperBoard {...props}>
      {NUMBERS.map(number => (
        <Button typeButton={number === '0' ? 'medium' : 'default'} key={number}>
          {number}
        </Button>
      ))}
    </WrapperBoard>
  ),
);
