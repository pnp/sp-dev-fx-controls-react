import * as React from 'react';
import { ISPFieldLookupValue } from "../../../common/SPEntities";
import { IFieldRendererProps } from '../fieldCommon/IFieldRendererProps';
import { IContext } from '../../../Common';
/**
 * Field Lookup Renderer Props
 * There are 3 options to provide the props:
 * - [recommended, used in FieldRendererHelper] Provide fieldId and context. In that case request for DispUrl will be sent only if a user clicks on the value
 * - Provide dispFormUrl: if you know this URL a priori you can provide it into the renderer
 * - Provide onClick handler to handle value's click event outside the renderer
 */
export interface IFieldLookupRendererProps extends IFieldRendererProps {
    /**
     * lookup values
     */
    lookups: ISPFieldLookupValue[];
    /**
     * url of Display form for the list that is referenced in the lookup
     */
    dispFormUrl?: string;
    /**
     * custom event handler of lookup item click. If not set the dialog with Display Form will be shown
     */
    onClick?: (args: IFieldLookupClickEventArgs) => void;
    /**
     * Field's id.
     */
    fieldId?: string;
    /**
     * Customizer context. Must be providede if fieldId is set
     */
    context?: IContext;
}
/**
 * Field Lookup Renderer State
 */
export interface IFieldLookupRendererState {
    hideDialog?: boolean;
    lookupDispFormUrl?: string;
    dispFormUrl?: string;
}
/**
 * Lookup click event arguments
 */
export interface IFieldLookupClickEventArgs {
    lookup?: ISPFieldLookupValue;
}
/**
 * Field Lookup Renderer.
 * Used for:
 *   - Lookup, LookupMulti
 */
export declare class FieldLookupRenderer extends React.Component<IFieldLookupRendererProps, IFieldLookupRendererState> {
    constructor(props: IFieldLookupRendererProps, state: IFieldLookupRendererState);
    render(): JSX.Element;
    private _onClick;
    private _onIframeLoaded;
    private _onDialogDismiss;
}
//# sourceMappingURL=FieldLookupRenderer.d.ts.map