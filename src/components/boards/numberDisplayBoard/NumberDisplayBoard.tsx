import { ReactElement } from 'react';

import { NumberDisplay } from 'components/index';
import { WrapperBoard } from 'style';

export const NumberDisplayBoard = (): ReactElement => (
  <WrapperBoard>
    <NumberDisplay />
  </WrapperBoard>
);
