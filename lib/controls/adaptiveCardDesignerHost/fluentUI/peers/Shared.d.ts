import * as Adaptive from "adaptivecards";
import { PropertySheetContext, PropertySheetEntry } from "adaptivecards-designer/lib/designer-peers";
export declare class DesignerPeerCategory {
    static Unknown: string;
    static Containers: string;
    static Elements: string;
    static Inputs: string;
    static Actions: string;
}
export declare class NameValuePairPropertyEditor extends PropertySheetEntry {
    readonly targetVersion: Adaptive.TargetVersion;
    readonly collectionPropertyName: string;
    readonly namePropertyName: string;
    readonly valuePropertyName: string;
    readonly createCollectionItem: (name: string, value: string) => any;
    readonly namePropertyLabel: string;
    readonly valuePropertyLabel: string;
    readonly addButtonTitle: string;
    readonly messageIfEmpty: string;
    private collectionChanged;
    render(context: PropertySheetContext): Adaptive.CardElement;
    constructor(targetVersion: Adaptive.TargetVersion, collectionPropertyName: string, namePropertyName: string, valuePropertyName: string, createCollectionItem: (name: string, value: string) => any, // eslint-disable-line @typescript-eslint/no-explicit-any
    namePropertyLabel?: string, valuePropertyLabel?: string, addButtonTitle?: string, messageIfEmpty?: string);
}
//# sourceMappingURL=Shared.d.ts.map