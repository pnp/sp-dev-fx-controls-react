import * as React from 'react';

import type { IToastController } from './IToast';
import { ToastContext } from './ToastProvider';

export const useToast = (): IToastController => {
  const context = React.useContext(ToastContext);

  if (!context) {
    throw new Error('useToast must be used within a ToastProvider.');
  }

  return context;
};