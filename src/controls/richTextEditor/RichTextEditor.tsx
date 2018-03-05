import * as React from 'react';
import { SPComponentLoader } from "@microsoft/sp-loader";
import * as appInsights from '../../common/appInsights';
export interface IRichTextEditorProps {
    value: string;
    ckEditorUrl:string; // '//cdn.ckeditor.com/4.6.2/full/ckeditor.js'  or your own cdn
    ckEditorConfig:{};
}
import { Guid } from "@microsoft/sp-core-library";
export interface IRichTextEditorState {
    text: string;
}
export class RichTextEditor extends React.Component<IRichTextEditorProps, IRichTextEditorState>{
    private ckeditor;
    private fieldId:string = "richTextEditor"+ Guid.newGuid().toString();
    public componentDidMount() {
        debugger;
        // see https://github.com/SharePoint/sp-de//cdn.ckeditor.com/4.6.2/full/ckeditor.jsv-docs/issues/374
        // var ckEditorCdn: string = "//cdn.ckeditor.com/4.6.2/full/ckeditor.js";
        var ckEditorCdn: string = this.props.ckEditorUrl; //should we default to public cdn if not set?
        SPComponentLoader.loadScript(ckEditorCdn, { globalExportsName: "CKEDITOR" }).then((CKEDITOR: any): void => {
          this.ckeditor = CKEDITOR;
          // replaces the title with a ckeditor. the other textareas are not visible yet. They will be replaced when the tab becomes active
          this.ckeditor.replace(this.fieldId, this.props.ckEditorConfig);
    
        });
    
      }
    constructor(props: IRichTextEditorProps) {
        super(props);
        // set initial state
        appInsights.track('RichTextEditor');
        this.state = { text: props.value };
    }
    public getValue(){
        debugger;
        let instance=this.ckeditor.instances[this.fieldId];
        let data = instance.getData();
        return data;

    }
    public render() {
        debugger;
        return (
            <div>
                <textarea name={this.fieldId} id={this.fieldId} style={{ display: "none" }}>
                    {this.state.text}
                </textarea>
            </div>

        );
    }
}