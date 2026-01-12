import { ApplicationCustomizerContext } from "@microsoft/sp-application-base";
import { BaseComponentContext } from "@microsoft/sp-component-base";
interface IContextState {
    context: ApplicationCustomizerContext | BaseComponentContext | undefined;
}
export declare const contextState: import("jotai").PrimitiveAtom<IContextState> & {
    init: IContextState;
};
export {};
//# sourceMappingURL=contextState.d.ts.map