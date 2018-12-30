export interface IRichTextProps {
  /**
     * CSS class to apply to the rich text editor.
     * @defaultvalue null
     */
  className?: string;

  /**
   * Indicates if the rich text editor should be in edit mode
   * @defaultvalue true
   */
  isEditMode?: boolean;

  /**
   * Placeholder text to show when editor is empty.
   * @defaultvalue undefined
   */
  placeholder? : string;

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
   * Indicates if we should show the Styles button (Heading 1, Heading 2, ..., Pull quote)
   * @defaultvalue true
   */
  showStyles?: boolean;

  /**
   * Indicates if we should show the Underline button
   * @defaultvalue true
   */
  showUnderline?: boolean;

  /**
   * The HTML text containing the rich text
   */
  value?: string;

  /**
   * Callback issued when the rich text changes.
   * Returns the text that will be inserted in the rich text control.
   */
  onChange?: (text: string) => string;
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
   * The URL to insert
   */
  insertUrl: string;

  /**
   * The text to display when inserting URL
   */
  insertUrlText: string;

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
}
