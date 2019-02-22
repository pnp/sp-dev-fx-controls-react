import * as React from 'react';
import styles from './RichTextEditor.module.scss';
import { IRichTextEditorProps, IRichTextEditorState } from '.';

import { createEditorViewState, EditorViewState } from 'roosterjs-react';
// import { Ribbon, RibbonPlugin } from 'roosterjs-react-ribbon';
import ReactEditor from './ReactEditor';

export class RichTextEditor extends React.Component<IRichTextEditorProps, IRichTextEditorState> {
  // private ribbonPlugin: RibbonPlugin = null;

  constructor(props: IRichTextEditorProps) {
    super(props);

    // this.ribbonPlugin = new RibbonPlugin();

    this.state = {
      viewState: null
    };
  }

  public componentWillMount(): void {
    this.setState({
      viewState: createEditorViewState(this.props.value || "")
    });
  }

  public componentDidUpdate(prevProps: IRichTextEditorProps, prevState: IRichTextEditorState): void {
    if (prevProps.value !== this.props.value) {
      this.setState({
        viewState: createEditorViewState(this.props.value || "")
      });
    }
  }

  /**
   * Update the view state
   */
  private updateViewState = (viewState: EditorViewState, content: string, isInitializing: boolean): void => {
    this.setState({
      viewState
    });

    if (this.props.editorChanged) {
      this.props.editorChanged(content);
    }
  }

  /**
   * Default React render method
   */
  public render(): React.ReactElement<IRichTextEditorProps> {
    return (
      <div className={ styles.richTextEditor }>
        {/* <Ribbon ribbonPlugin={this.ribbonPlugin}  /> */}
        <ReactEditor viewState={this.state.viewState} updateViewState={this.updateViewState} />
      </div>
    );
  }
}
