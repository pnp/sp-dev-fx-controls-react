import * as React from 'react';
import { IRichTextPropertyPaneProps, IRichTextPropertyPaneState } from './RichTextPropertyPane.types';
import { RangeStatic } from 'quill';
export default class RichTextPropertyPane extends React.Component<IRichTextPropertyPaneProps, IRichTextPropertyPaneState> {
    constructor(props: IRichTextPropertyPaneProps);
    /**
     * componentDidUpdate lifecycle hook
     *
     * @param prevProps
     * @param prevState
     */
    componentDidUpdate(prevProps: IRichTextPropertyPaneProps, prevState: IRichTextPropertyPaneState): void;
    /**
     * Default React render method
     */
    render(): React.ReactElement<IRichTextPropertyPaneProps>;
    /**
     * On selection changed event handler
     */
    onChangeSelection: (range: RangeStatic, oldRange?: RangeStatic, source?: RangeStatic) => void;
    /**
     * Render the actions group
     */
    private renderActionsGroup;
    /**
     * Render font styles group
     */
    private renderFontStylesGroup;
    /**
     * Render font size group
     */
    private renderFontSizesGroup;
    /**
     * Render inline styles group
     */
    private renderInlineStylesGroup;
    /**
     * Render color styles group
     */
    private renderColorStylesGroup;
    /**
     * Render alignment style groups
     */
    private renderAlignmentStylesGroup;
    /**
     * Render list styles group
     */
    private renderListStylesGroup;
    /**
     * Render hyperlink styles group
     */
    private renderHyperlinkStylesGroup;
    /**
     * Handle fill color change
     */
    private handleFillColorChanged;
    /**
     * Handle the hightlight color change
     */
    private handleHighlightColorChanged;
    /**
     * On heading change
     */
    private onChangeHeading;
    /**
     * On indentation change.
     */
    private onChangeIndent;
    /**
     * On size change
     */
    private onChangeSize;
    /**
     * Apply the new format
     *
     * @param name
     * @param value
     */
    private applyFormat;
    /**
     * Handle the undo action
     */
    private handleUndo;
    /**
     * Handle the clear formatting action
     */
    private handleClearFormatting;
    /**
     * Handle the redo action
     */
    private handleRedo;
    /**
     * Navigation render
     */
    private handleRenderNavigation;
}
//# sourceMappingURL=RichTextPropertyPane.d.ts.map