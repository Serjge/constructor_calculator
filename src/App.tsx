import React, { ReactElement } from 'react';

import { Button } from 'components';
import { NumberPanel } from 'components/numberPanel/NumberPanel';

export const App = (): ReactElement => (
  <div>
    <div style={{ display: 'flex' }}>
      <Button>2</Button>
      <Button typeButton="long">=</Button>
      <NumberPanel />
    </div>
  </div>
);
