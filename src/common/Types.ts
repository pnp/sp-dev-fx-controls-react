
import { BaseComponentContext } from '@microsoft/sp-component-base';
import { SPWeb } from '@microsoft/sp-page-context';
import { ServiceScope } from '@microsoft/sp-core-library';

export type RecursivePicker<T> = {
  [K in keyof T]: T[K] extends object | undefined ? (T[K] extends (...args: never[]) => any ? T[K] : RecursivePicker<T[K]>) : T[K]
};

export type SPFxWeb = RecursivePicker<SPWeb>;
export type SPFxServiceScope = RecursivePicker<ServiceScope>;
export type SPFxContext = RecursivePicker<BaseComponentContext>;
