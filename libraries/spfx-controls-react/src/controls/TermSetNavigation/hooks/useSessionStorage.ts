/* eslint-disable @typescript-eslint/no-explicit-any */

import * as React from 'react';

import addSeconds from 'date-fns/addSeconds';
import isAfter from 'date-fns/isAfter';

/* eslint-disable @typescript-eslint/explicit-function-return-type */
interface IStorage {
  value: unknown;
  expires: string;
}


const DEFAULT_EXPIRED_IN_SECONDS = 15 * 60; // 1 hour

export const useSessionStorage = (): any  => {
  const setStorageValue = React.useCallback( (key: string, newValue: unknown, expiredInSeconds: number) => {
    const expires = addSeconds(new Date(), expiredInSeconds ?? DEFAULT_EXPIRED_IN_SECONDS);
    sessionStorage.setItem(key, JSON.stringify({ value: newValue, expires }));
  }, []);
  const getStorageValue = React.useCallback((key: string): any => {
    const storage: IStorage = JSON.parse(sessionStorage.getItem(key) || "{}");
    // getting stored value
    const { value, expires } = storage || ({} as IStorage);
    if (isAfter(new Date(expires), new Date())) {
      return value;
    }
    return undefined;
  }, []);

  const removeStorageValue = React.useCallback((key: string): void => {
    sessionStorage.removeItem(key);
  }, []);

  return [getStorageValue, setStorageValue, removeStorageValue] as const;
};
