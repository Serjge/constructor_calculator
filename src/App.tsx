import React, { ReactElement } from 'react';

import { Toggle, DeskWithCalculatorElements, LayoutDesk } from 'components';

export const App = (): ReactElement => (
  <div>
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
      }}
    >
      <DeskWithCalculatorElements />
      <div>
        <Toggle />
        <LayoutDesk />
      </div>
    </div>
  </div>
);
