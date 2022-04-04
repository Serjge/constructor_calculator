import { ReactElement } from 'react';

import { Button } from 'components';
import { WrapperBoard } from 'style';

export const EqualsSingBoard = (): ReactElement => (
  <WrapperBoard>
    <Button typeButton="long">=</Button>
  </WrapperBoard>
);
