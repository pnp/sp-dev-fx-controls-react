import type { IShowToastOptions } from './IToast';

const DEFAULT_TOAST_DURATION_MS = 3000;

export const getToastTimeout = (options: Pick<IShowToastOptions, 'autoDismiss' | 'duration' | 'durationUnit'>): number => {
  if (!options.autoDismiss) {
    return -1;
  }

  if (options.duration === undefined) {
    return DEFAULT_TOAST_DURATION_MS;
  }

  return options.durationUnit === 'seconds' ? options.duration * 1000 : options.duration;
};
