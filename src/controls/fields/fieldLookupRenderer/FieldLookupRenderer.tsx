import { override } from '@microsoft/decorators';
import * as React from 'react';
import { css, DialogType, Link } from 'office-ui-fabric-react';

import { ISPFieldLookupValue } from "../../../common/SPEntities";
import { IFieldRendererProps } from '../fieldCommon/IFieldRendererProps';
import * as appInsights from '../../../common/appInsights';

import styles from './FieldLookupRenderer.module.scss';
import IFrameDialog from '../../iFrameDialog/IFrameDialog';

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
    onClick?: (args: IFieldLookupClickEventArgs) => {};
}

/**
 * For future
 */
export interface IFieldLookupRendererState {
    hideDialog?: boolean;
    lookupDispFormUrl?: string;
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
export class FieldLookupRenderer extends React.Component<IFieldLookupRendererProps, IFieldLookupRendererState> {
    public constructor(props: IFieldLookupRendererProps, state: IFieldLookupRendererState) {
        super(props, state);

        appInsights.track('FieldLookupRenderer', {});

        this.state = {
            hideDialog: true
        };
    }

    @override
    public render(): JSX.Element {
        const lookupLinks: JSX.Element[] = this.props.lookups.map((lookup) => {
            return <Link onClick={this._onClick.bind(this, lookup)} className={styles.lookup} style={this.props.cssProps}>{lookup.lookupValue}</Link>;
        });
        return (
        <div style={this.props.cssProps} className={css(this.props.className)}>{lookupLinks}
        {!this.state.hideDialog && <IFrameDialog
            url={this.state.lookupDispFormUrl}
            iframeOnLoad={this._onIframeLoaded.bind(this)}
            hidden={this.state.hideDialog}
            onDismiss={this._onDialogDismiss.bind(this)}
            modalProps={{
                isBlocking: true,
                containerClassName: styles.dialogContainer
            }}
            dialogContentProps={{
                type: DialogType.close,
                showCloseButton: true
            }}
            width={'570px'}
            height={'315px'}/>}
        </div>);
    }

    private _onClick(lookup: ISPFieldLookupValue): void {
        if (this.props.onClick) {
            const args: IFieldLookupClickEventArgs = {
                lookup: lookup
            };
            this.props.onClick(args);
            return;
        }

        //
        // showing Display Form in the dialog
        //
        this.setState({
            lookupDispFormUrl: `${this.props.dispFormUrl}&ID=${lookup.lookupId}&RootFolder=*&IsDlg=1`,
            hideDialog: false
        });
    }

    private _onIframeLoaded(iframe: any): void {
        //
        // some additional configuration to beutify content of the iframe
        //
        const iframeWindow: Window = iframe.contentWindow;
        const iframeDocument: Document = iframeWindow.document;

        const s4Workspace: HTMLDivElement = iframeDocument.getElementById('s4-workspace') as HTMLDivElement;
        s4Workspace.style.height = iframe.style.height;

        s4Workspace.scrollIntoView();
    }

    private _onDialogDismiss(): void {
        this.setState({
            hideDialog: true
        });
    }
}
