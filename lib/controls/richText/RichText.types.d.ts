import React from 'react';
import { ISwatchColor } from './SwatchColorPickerGroup.types';
export interface IRichTextProps {
    /**
     * ID to apply to the rich text editor.
     * @defaultvalue undefined
     */
    id?: string;
    /**
     * Label displayed above the rich text.
     * @defaultvalue undefined
     */
    label?: string;
    /**
     * CSS class to apply to the rich text editor.
     * @defaultvalue null
     */
    className?: string;
    /**
     * Styles to apply to the rich text editor.
     * @defaultvalue null
     */
    style?: React.CSSProperties;
    /**
     * Indicates if the rich text editor should be in edit mode
     * @defaultvalue true
     */
    isEditMode?: boolean;
    /**
     * Placeholder text to show when editor is empty.
     * @defaultvalue undefined
     */
    placeholder?: string;
    /**
     * The HTML text containing the rich text
     */
    value?: string;
    /**
     * Style options
     */
    styleOptions?: StyleOptions;
    /**
     * Additional colors to include in swatch
     */
    customColors?: ISwatchColor[];
    /**
     * Callback issued when the rich text changes.
     * Returns the text that will be inserted in the rich text control.
     */
    onChange?: (text: string) => string;
    /**
     * Custom renderer for the label.
     * Returns the custom render.
     */
    onRenderLabel?: (props: IRichTextProps) => JSX.Element;
}
export interface StyleOptions {
    /**
     * Indicates if we should show the Align button
     * @defaultvalue true
     */
    showAlign?: boolean;
    /**
     * Indicates if we should show the Bold button
     * @defaultvalue true
     */
    showBold?: boolean;
    /**
     * Indicates if we should show the Italic button
     * @defaultvalue true
     * */
    showItalic?: boolean;
    /**
     * Indicates if we should show the Hyperlink button
     * @defaultvalue true
     */
    showLink?: boolean;
    /**
     * Indicates if we should show the List button
     * @defaultvalue true
     */
    showList?: boolean;
    /**
     * Indicates if we should show the More button.
     * If the More button is enabled, users can use
     * all options (Bold, Italic, etc.) whether they
     * are turned off or not.
     * @defaultvalue true
     */
    showMore?: boolean;
    /**
     * Indicates if we should show the Image button.
     * @defaultvalue true
     */
    showImage?: boolean;
    /**
     * Indicates if we should show the Styles button (Heading 2, Heading 3, ..., Pull quote)
     * @defaultvalue true
     */
    showStyles?: boolean;
    /**
     * Indicates if we should show the Underline button
     * @defaultvalue true
     */
    showUnderline?: boolean;
}
export interface IRichTextState {
    /**
     * Whether the rich text is currently editing (i.e.: has focus)
     */
    editing: boolean;
    /**
     * The formats of the current range selection
     */
    formats: any;
    /**
     * Whether to hide the insert link dialog
     */
    hideDialog: boolean;
    /**
     * Whether to hide the insert image dialog
     */
    hideImageDialog: boolean;
    /**
     * The URL to insert
     */
    insertUrl: string;
    /**
     * The text to display when inserting URL
     */
    insertUrlText: string;
    /**
     * The URL of image to insert
     */
    insertImageUrl: string;
    /**
     * Whether the "More" pane is visible
     */
    morePaneVisible: boolean;
    /**
     * The currently selected range
     */
    selectedRange?: any;
    /**
     * The currently selected text
     */
    selectedText: string;
    /**
     * The currently selected URL
     */
    selectedUrl: string;
    /** The text */
    text: string;
    wrapperTop: number;
}
//# sourceMappingURL=RichText.types.d.ts.map