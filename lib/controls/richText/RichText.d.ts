import * as React from 'react';
import 'react-quill/dist/quill.snow.css';
import type { Quill } from 'quill';
import { IRichTextProps, IRichTextState } from './RichText.types';
export declare class RichText extends React.Component<IRichTextProps, IRichTextState> {
    private _quillElem;
    private _wrapperRef;
    private _propertyPaneRef;
    private _toolbarId;
    private _richTextId;
    private ddStyleOpts;
    private ddAlignOpts;
    private ddListOpts;
    /**
     * Sets default properties
     */
    static defaultProps: Partial<IRichTextProps>;
    constructor(props: IRichTextProps);
    /**
     * Attaches to mouse down events to determine if we clicked outside
     */
    componentDidMount(): void;
    /**
     * Removes the mouse down event
     */
    componentWillUnmount(): void;
    /**
     * If we're switching from non-edit mode to edit mode, attach mouse down event
     * If we're going from edit mode to non-edit mode, remove mouse down event
     * @param prevProps
     * @param prevState
     */
    componentDidUpdate(prevProps: IRichTextProps, prevState: IRichTextState): void;
    /**
     * shouldComponentUpdate lifecycle hook
     *
     * @param nextProps
     * @param nextState
     */
    shouldComponentUpdate(nextProps: IRichTextProps, nextState: IRichTextState): boolean;
    UNSAFE_componentWillReceiveProps(nextProps: IRichTextProps): void;
    /**
     * Returns a handle to the Quill editor
     */
    getEditor: () => Quill;
    /**
     * Render style option
     *
     * @param option
     */
    private onRenderStyleOption;
    /**
     * Render the title of the style dropdown
     *
     * @param options
     */
    private onRenderStyleTitle;
    /**
     * Render align option
     *
     * @param option
     */
    private onRenderAlignOption;
    /**
     * Render the list dropdown title
     *
     * @param options
     */
    private onRenderListTitle;
    /**
     * Render the title of the align dropdown
     *
     * @param options
     */
    private onRenderAlignTitle;
    /**
     * Render list dropdown option
     *
     * @param option
     */
    private onRenderListOption;
    /**
     * Render the list dropdown placeholder
     */
    private onRenderListPlaceholder;
    /**
     * Renders the "Insert Link" dialog
     */
    private renderLinkDialog;
    /**
     * Renders the "Insert Image" dialog
     */
    private renderImageDialog;
    /**
     * Renders the Rich Text Editor
     */
    render(): React.ReactElement<IRichTextProps>;
    /**
     * Style trigger events
     */
    private onChangeBold;
    private onChangeItalic;
    private onChangeUnderline;
    private onChangeHeading;
    private onChangeAlign;
    private onChangeList;
    /**
     * Displays the insert link dialog
     */
    private showInsertLinkDialog;
    /**
     * Hides the insert link dialog
     */
    private closeDialog;
    /**
     * Displays the insert link dialog
     */
    private showInsertImageDialog;
    /**
     * Hides the insert image dialog
     */
    private closeImageDialog;
    /**
     * When user enters the richtext editor, displays the border
     */
    private handleOnFocus;
    /**
     * Called when user removes the link
     */
    private handleRemoveLink;
    /**
     * Called when user creates a new link
     */
    private handleCreateLink;
    /**
     * Called when user insert an image
     */
    private handleInsertImage;
    /**
     * Disable Save-button if hyperlink is undefined or empty
     * This prevents the user of adding an empty hyperlink
     */
    private checkLinkUrl;
    /**
     * Disable Save-button if hyperlink for the imported image is undefined or empty
     * This prevents the user of adding an empty image
     */
    private checkImageLinkUrl;
    /**
     * Applies a format to the selection
     * @param name format name
     * @param value format value, or false to unset format
     */
    private applyFormat;
    /**
     * Called when richtext selection changes
     */
    private handleChangeSelection;
    /**
     * Called when user clicks on the close icon
     */
    private handleClosePanel;
    /**
     * Closes the panel
     */
    private closePanel;
    /**
     * Called when user clicks on the more button
     */
    private handleShowMore;
    /**
     * Called when user changes the text of the editor
     */
    private handleChange;
    /**
     * Keeps track of whether we clicked outside the element
     */
    private handleClickOutside;
    /**
     * Links to the quill reference
     */
    private linkQuill;
    /**
     * Links to the property pane element
     */
    private linkPropertyPane;
    /**
     * Renders the label above the rich text (if specified)
     */
    private onRenderLabel;
}
//# sourceMappingURL=RichText.d.ts.map