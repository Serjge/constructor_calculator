import { ReactElement } from 'react';

import { WrapperNumberBoard } from './style';

import { Button } from 'components';

export const NumberBoard = (): ReactElement => {
  const numbers = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0', ','];
  return (
    <WrapperNumberBoard>
      {numbers.map(number => (
        <Button typeButton={number === '0' ? 'medium' : 'default'} key={number}>
          {number}
        </Button>
      ))}
    </WrapperNumberBoard>
  );
};
