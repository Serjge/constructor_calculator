import React, { ReactElement } from 'react';

import { Button } from 'components';

export const App = (): ReactElement => (
  <div>
    <div style={{ display: 'flex' }}>
      <Button>2</Button>
      <Button typeButton="long">=</Button>
    </div>
  </div>
);
