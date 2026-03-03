import { BaseSubmitActionPeer, PropertySheet, StringPropertyEditor, TypedActionPeer } from "adaptivecards-designer/lib/designer-peers";
import { FluentUIExecuteAction, FluentUIOpenUrlAction, FluentUIShowCardAction, FluentUISubmitAction, FluentUIToggleVisibilityAction } from "../../../adaptiveCardHost/fluentUI/Actions";
export declare class SubmitActionPeer extends BaseSubmitActionPeer<FluentUISubmitAction> {
}
export declare class ExecuteActionPeer extends BaseSubmitActionPeer<FluentUIExecuteAction> {
    static readonly verbProperty: StringPropertyEditor;
    populatePropertySheet(propertySheet: PropertySheet, defaultCategory?: string): void;
}
export declare class OpenUrlActionPeer extends TypedActionPeer<FluentUIOpenUrlAction> {
    static readonly urlProperty: StringPropertyEditor;
    populatePropertySheet(propertySheet: PropertySheet, defaultCategory?: string): void;
}
export declare class ShowCardActionPeer extends TypedActionPeer<FluentUIShowCardAction> {
    protected getToolTip(): string;
}
export declare class ToggleVisibilityActionPeer extends TypedActionPeer<FluentUIToggleVisibilityAction> {
}
//# sourceMappingURL=ActionPeers.d.ts.map