import React, { ReactElement } from 'react';

import { Button } from 'components';
import { NumberBoard } from 'components/NumberBoard/NumberBoard';
import { NumberPanel } from 'components/numberPanel/NumberPanel';

export const App = (): ReactElement => (
  <div>
    <div style={{ display: 'flex' }}>
      <Button>2</Button>
      <Button typeButton="long">=</Button>
      <NumberPanel />
      <NumberBoard />
    </div>
  </div>
);
