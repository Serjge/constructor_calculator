import React, { ReactElement } from 'react';

import { ElementsDesk, LayoutDesk } from 'components';

export const App = (): ReactElement => (
  <div
    style={{
      width: '100vw',
      height: '100vh',
    }}
  >
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
      }}
    >
      <ElementsDesk />

      {/* <Toggle /> */}
      <LayoutDesk />
    </div>
  </div>
);
