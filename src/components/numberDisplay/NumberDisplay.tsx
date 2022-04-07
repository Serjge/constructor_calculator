import { ReactElement } from 'react';

import { Wrapper } from 'components/numberDisplay/style';

export const NumberDisplay = ({ ...props }): ReactElement => (
  <Wrapper {...props}>
    <span>0.022</span>
  </Wrapper>
);
