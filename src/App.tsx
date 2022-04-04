import React, { ReactElement } from 'react';

import { Button, NumberBoard, NumberPanel, OperatorBoard, Toggle } from 'components';

export const App = (): ReactElement => (
  <div>
    <div style={{ display: 'flex' }}>
      <Button>2</Button>
      <Button typeButton="long">=</Button>
      <NumberPanel />
      <NumberBoard />
      <OperatorBoard />
      <Toggle />
    </div>
  </div>
);
