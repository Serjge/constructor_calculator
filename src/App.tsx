import React, { ReactElement } from 'react';

import { Toggle, DeskWithCalculatorElements } from 'components';

export const App = (): ReactElement => (
  <div>
    <div>
      <DeskWithCalculatorElements />
      <Toggle />
    </div>
  </div>
);
