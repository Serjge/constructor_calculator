import { ReactElement } from 'react';

import { NumberDisplay } from 'components/index';
import { WrapperBoard } from 'style';

export const NumberDisplayBoard = ({ ...props }): ReactElement => (
  <WrapperBoard {...props}>
    <NumberDisplay />
  </WrapperBoard>
);
