import * as React from 'react';
import { TextField, ITextFieldProps } from "office-ui-fabric-react/lib/TextField";
import { IconButton, PrimaryButton, DefaultButton } from "office-ui-fabric-react/lib/Button";
import { Panel,PanelType } from "office-ui-fabric-react/lib/Panel";
import { Dialog, DialogType, DialogContent, DialogFooter } from "office-ui-fabric-react/lib/Dialog";
import { Link, ILinkProps } from "office-ui-fabric-react/lib/Link";
import { RichTextEditor } from "../richTextEditor/RichTextEditor";
export interface ITextFieldWithEditProps {
    value: string;
    onValueChanged?: (oldValue, newValue) => Promise<any>;
    dangerouslySetInnerHTML?: boolean;
    ckEditorUrl: string;
    ckEditorConfig: {};
}
export interface ITextFieldWithEditState {
    showWeditor: boolean;

}
export class TextFieldWithEdit extends React.Component<ITextFieldWithEditProps, ITextFieldWithEditState>{
    private richTextEditor: RichTextEditor;
    constructor(props: ITextFieldWithEditProps) {
        super(props);
        // set initial state
        this.state = { showWeditor: false };
    }
    private onValueChanged(oldValue, newValue) {
        this.props.onValueChanged(oldValue, newValue).then(() => {
            this.setState((current) => ({ ...current, showWeditor: false }));
        });

    }
    public render() {
        debugger;
        let textFieldProps: ITextFieldProps = { value: this.props.value };
        let linkProps: ILinkProps = {};

        debugger;
        return (
            <div>
                <div dangerouslySetInnerHTML={{ __html: this.props.value }} />
                {this.props.onValueChanged &&
                    <IconButton
                        iconProps={{ iconName: "Edit" }}
                        value="Edit Comments"
                        onClick={(e) => { debugger; this.setState((current) => ({ ...current, showWeditor: true })); }}
                    />
                }

                <Panel 
                 type={PanelType.medium}
                    isOpen={this.state.showWeditor}
                    onDismiss={()=>{ this.setState((current) => ({ ...current, showWeditor: false }));}}
                
                >
                    <RichTextEditor
                        ref={instance => { this.richTextEditor = instance; }}
                        value={this.props.value}
                        ckEditorConfig={this.props.ckEditorConfig}
                        ckEditorUrl={this.props.ckEditorUrl}
                    />

                    <DialogFooter>
                        <PrimaryButton
                            text='Save'
                            onClick={(e) => {
                                debugger;
                                let newValue = this.richTextEditor.getValue();
                                this.onValueChanged(this.props.value, newValue);

                            }}
                        />
                        <DefaultButton
                            onClick={(e) => { debugger; this.setState((current) => ({ ...current, showWeditor: false })); }}
                            text='Cancel' />
                    </DialogFooter>
                </Panel>

            </div>

        );
    }
}