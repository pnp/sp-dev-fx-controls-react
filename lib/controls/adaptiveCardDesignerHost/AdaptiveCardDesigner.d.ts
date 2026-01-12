import { BindingPreviewMode } from 'adaptivecards-designer';
import { IAdaptiveCardDesignerHostProps } from './IAdaptiveCardDesignerProps';
export declare const EmptyCard: {
    $schema: string;
    type: string;
    version: string;
};
export declare const AdaptiveCardDesigner: {
    (props: IAdaptiveCardDesignerHostProps): JSX.Element;
    defaultProps: {
        newCardPayload: {
            $schema: string;
            type: string;
            version: string;
        };
        hostContainers: any[];
        supportedTargetVersions: import("adaptivecards").Version[];
        snippets: any[];
        bindingPreviewMode: BindingPreviewMode;
        enableDataBindingSupport: boolean;
        selectedHostContainerControlsTargetVersion: boolean;
        showTargetVersionMismatchWarning: boolean;
        showVersionPicker: boolean;
        showSampleDataEditorToolbox: boolean;
        showDataStructureToolbox: boolean;
        showFluentBreakpointsPicker: boolean;
        showCopyToJsonToolbarCommand: boolean;
        addDefaultAdaptiveCardHostContainer: boolean;
        injectAdaptiveCardHostContextProperty: boolean;
    };
};
//# sourceMappingURL=AdaptiveCardDesigner.d.ts.map