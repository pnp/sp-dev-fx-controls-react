import { atom } from "jotai";

import { ApplicationCustomizerContext } from "@microsoft/sp-application-base";
import { BaseComponentContext } from "@microsoft/sp-component-base";

interface IContextState {
  context:  ApplicationCustomizerContext | BaseComponentContext | undefined;
}

export const contextState = atom<IContextState>({
  context: undefined,
} as IContextState);
