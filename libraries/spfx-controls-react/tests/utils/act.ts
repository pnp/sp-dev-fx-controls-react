import * as React from 'react';

/**
 * React 18.3 exposes `act` from `react` (the `react-dom/test-utils` export is deprecated), but
 * `@types/react` 18.2 used by the SPFx template does not declare it yet.
 */
export const act = (React as unknown as {
  act: (callback: () => void | Promise<void>) => Promise<void>;
}).act;
