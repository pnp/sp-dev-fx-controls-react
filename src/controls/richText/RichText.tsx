import * as React from 'react';

import { IRichTextProps, IRichTextState } from './RichText.types';
import RichTextPropertyPane from './RichTextPropertyPane';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styles from './RichText.module.scss';
import { css } from 'office-ui-fabric-react/lib/Utilities';
import { IconButton } from 'office-ui-fabric-react/lib/Button';
import { Guid } from '@microsoft/sp-core-library';
import * as strings from 'ControlStrings';
import { TooltipHost } from 'office-ui-fabric-react/lib/Tooltip';
import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Dropdown, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { elementContains } from 'office-ui-fabric-react/lib/Utilities';


import * as telemetry from '../../common/telemetry';

/**
 * Creates a rich text editing control that mimics the out-of-the-box
 * SharePoint Rich Text control.
 * NOTE:
 * Quill.js has a few quirks that we can't work around
 * - Block quotes only work on single lines. This is a frequently-requested feature with Quill that isn't available yet.
 * - Tables aren't supported yet. I'll gladly add table formatting support if users request it.
 */
export class RichText extends React.Component<IRichTextProps, IRichTextState> {
  private _quillElem: ReactQuill = undefined;
  private _wrapperRef = undefined;
  private _propertyPaneRef: RichTextPropertyPane = undefined;
  private _toolbarId = undefined;

  /**
  * Sets default properties
  */
  public static defaultProps: Partial<IRichTextProps> = {
    isEditMode: true,
    showStyles: true,
    showBold: true,
    showItalic: true,
    showUnderline: true,
    showAlign: true,
    showList: true,
    showLink: true,
    showMore: true
  };


  constructor(props: IRichTextProps) {
    super(props);

    telemetry.track('ReactRichText', {
      className: !!props.className
    });

    this.state = {
      text: this.props.value,
      editing: false,
      morePaneVisible: false,
      hideDialog: true,
      formats: {},
      insertUrl: undefined,
      insertUrlText: undefined,
      selectedText: undefined,
      selectedUrl: undefined
    };

    // Prepare to handle clicking outside of the control
    this._setWrapperRef = this._setWrapperRef.bind(this);
    this._handleClickOutside = this._handleClickOutside.bind(this);

    // Get a unique toolbar id
    this._toolbarId = "toolbar_" + Guid.newGuid().toString();
  }

  /**
   * Attaches to mouse down events to determine if we clicked outside
   */
  public componentDidMount() {
    // If we're in edit mode, attach the mouse down event
    if (this.props.isEditMode) {
      document.addEventListener('click', this._handleClickOutside);
      document.addEventListener('focus', this._handleClickOutside);
    }
  }

  /**
   * Removes the mouse down event
   */
  public componentWillUnmount() {
    // If we were in edit mode, remove the mouse down handler
    if (this.props.isEditMode) {
      document.removeEventListener('click', this._handleClickOutside);
      document.removeEventListener('focus', this._handleClickOutside);
    }
  }

  /**
   * If we're switching from non-edit mode to edit mode, attach mouse down event
   * If we're going from edit mode to non-edit mode, remove mouse down event
   * @param prevProps
   * @param prevState
   */
  public componentDidUpdate(prevProps: IRichTextProps, prevState: IRichTextState): void {
    // If we're going from non-edit to edit mode
    if (this.props.isEditMode && !prevProps.isEditMode) {
      document.addEventListener('click', this._handleClickOutside);
      document.addEventListener('focus', this._handleClickOutside);
    }

    // If we're going from edit mode to non-edit mode
    if (!this.props.isEditMode && prevProps.isEditMode) {
      document.removeEventListener('click', this._handleClickOutside);
      document.removeEventListener('focus', this._handleClickOutside);
    }
  }

  /***
   * Renders the Rich Text Editor
   */
  public render(): React.ReactElement<IRichTextProps> {
    const { text } = this.state;
    const { isEditMode } = this.props;

    // If we're not in edit mode, display read-only version of the html
    if (!isEditMode) {
      return (
        <div
          className={css(styles.richtext,
            this.props.className,
            'ql-editor')}
          dangerouslySetInnerHTML={{ __html: text }}>
        </div>
      );
    }

    // Okay, we're in edit mode.
    const {
      placeholder,
      showStyles,
      showBold,
      showItalic,
      showUnderline,
      showAlign,
      showList,
      showLink,
      showMore
    } = this.props;

    // Get a unique id for the toolbar
    const modules = {
      toolbar: {
        container: "#" + this._toolbarId,
        handlers: [
          "link" // disable the link handler so we can add our own
        ]
      },
      clipboard: {
        matchVisual: false // prevents weird bug that inserts blank lines when loading stored text
      }
    };

    // Remove fonts and set Segoe UI as the main font
    var font = Quill.import('formats/font');
    font.whitelist = ['Segoe UI'];
    Quill.register(font, true);

    // Set headers and add blockquote capability
    var header = Quill.import('formats/header');
    header.tagName = [
      'H1',
      'H2',
      'H3',
      'H4',
      'H5',
      'H6',
      'blockquote'];
    Quill.register(header, true);

    // Add the sharepoint font sizes
    var SizeClass = Quill.import('formats/size');
    SizeClass.whitelist = [
      'small',
      'medium',
      'mediumplus',
      'large',
      'xlarge',
      'xlargeplus',
      'xxlarge',
      'xxxlarge',
      'xxlargeplus',
      'super'];
    Quill.register(SizeClass, true);

    return (
      <div
        ref={this._setWrapperRef}
        className={css(styles.richtext
          && this.state.editing ?
          'ql-active'
          : undefined, this.props.className)}>
        <div
          id={this._toolbarId}>
          {showStyles &&
            <Dropdown
              className={css(styles.headerDropDown, styles.toolbarDropDown)}
              onRenderCaretDown={() => { return <i className={styles.toolbarSubmenuCaret} role="presentation" aria-hidden="true" data-icon-name="CaretDownSolid8"></i>; }}
              selectedKey={this.state.formats.header !== undefined ? this.state.formats.header : 0}
              options={[
                {
                  key: 0,
                  text: strings.HeaderNormalText,
                  data: {}
                },
                {
                  key: 2,
                  text: strings.HeaderH2,
                  data:
                    { className: styles.toolbarButtonH2 }
                },
                {
                  key: 3,
                  text: strings.HeaderH3,
                  data:
                    { className: styles.toolbarButtonH3 }
                },
                {
                  key: 4,
                  text: strings.HeaderH4,
                  data:
                    { className: styles.toolbarButtonH4 }
                },
                {
                  key: 7,
                  text: strings.HeaderBlockQuote,
                  data:
                    { className: styles.toolbarButtonBlockQuote }
                }
              ]}
              onChanged={(item) => this._onChangeHeading(item)}
              onRenderOption={(option: IDropdownOption): JSX.Element => {
                return (
                  <TooltipHost
                    content={option.text}
                    id={`${option.text}-toolbarButton`}
                    calloutProps={{ gapSpace: 0 }}>
                    <div
                      className={css(styles.toolbarDropDownOption,
                        option.data!.className
                          ? option.data!.className
                          : undefined)}
                      aria-describedby={`${option.text}-toolbarButton`}
                    >
                      <span>{option.text}</span>
                    </div>
                  </TooltipHost>
                );
              }}
              onRenderTitle={(options: IDropdownOption[]): JSX.Element => {
                const option = options[0];

                return (
                  <TooltipHost
                    content={option.text}
                    id={`${option.text}-dropDownTitle`}
                    calloutProps={{ gapSpace: 0 }}>
                    <div
                      className={styles.toolbarSubmenuDisplayButton}
                      aria-describedby={`${option.text}-dropDownTitle`}
                    >
                      <span>{option.text}</span>
                    </div>
                  </TooltipHost>
                );
              }}
            />
          }
          {showBold &&
            <TooltipHost
              content={strings.BoldTitle}
              id="bold-richtextbutton"
              calloutProps={{ gapSpace: 0 }}>
              <IconButton
                iconProps={{ iconName: 'Bold' }}
                aria-describedby="bold-richtextbutton"
                checked={this.state.formats.bold}
                onClick={() =>
                  this._onChangeBold()}>
              </IconButton>
            </TooltipHost>
          }
          {showItalic &&
            <TooltipHost
              content={strings.ItalicTitle}
              id="italic-richtextbutton"
              calloutProps={{ gapSpace: 0 }}>
              <IconButton
                iconProps={{ iconName: 'Italic' }}
                aria-describedby="italic-richtextbutton"
                checked={this.state.formats.italic}
                onClick={() =>
                  this._onChangeItalic()}>
              </IconButton>

            </TooltipHost>
          }
          {showUnderline &&
            <TooltipHost
              content={strings.UnderlineTitle}
              id="underline-richtextbutton"
              calloutProps={{ gapSpace: 0 }}>
              <IconButton
                iconProps={{ iconName: 'Underline' }}
                aria-describedby="underline-richtextbutton"
                checked={this.state.formats.underline}
                onClick={() =>
                  this._onChangeUnderline()}>
              </IconButton>
            </TooltipHost>
          }
          {showAlign &&
            <Dropdown
              className={css(styles.toolbarDropDown)}
              onRenderCaretDown={() => { return <i className={styles.toolbarSubmenuCaret} role="presentation" aria-hidden="true" data-icon-name="CaretDownSolid8"></i>; }}
              selectedKey={this.state.formats.align !== undefined ? this.state.formats.align : 'left'}
              options={[
                {
                  key: 'left',
                  text: strings.AlignLeft,
                  data: { icon: 'AlignLeft' }
                },
                {
                  key: 'center',
                  text: strings.AlignCenter,
                  data: { icon: 'AlignCenter' }
                },
                {
                  key: 'right',
                  text: strings.AlignRight,
                  data: { icon: 'AlignRight' }
                }
              ]}
              onChanged={(item) => this._onChangeAlign(item)}
              onRenderOption={(option: IDropdownOption): JSX.Element => {
                return (
                  <TooltipHost
                    content={option.text}
                    id={`${option.text}-toolbarButton`}
                    calloutProps={{ gapSpace: 0 }}>
                    <div
                      className={css(styles.toolbarDropDownOption,
                        option.data!.className
                          ? option.data!.className
                          : undefined)}
                      aria-describedby={`${option.text}-toolbarButton`}
                    >
                      <Icon
                        className={styles.toolbarDropDownIcon}
                        iconName={option.data.icon}
                        aria-hidden="true"
                      />
                    </div>
                  </TooltipHost>
                );
              }}
              onRenderTitle={(options: IDropdownOption[]): JSX.Element => {
                const option = options[0];

                return (
                  <TooltipHost
                    content={option.text}
                    id={`${option.text}-dropDownTitle`}
                    calloutProps={{ gapSpace: 0 }}>
                    <div
                      className={styles.toolbarSubmenuDisplayButton}
                      aria-describedby={`${option.text}-dropDownTitle`}
                    >
                      <Icon className={styles.toolbarDropDownTitleIcon}
                        iconName={option.data.icon}
                        aria-hidden="true" />
                    </div>
                  </TooltipHost>
                );
              }}
            />
          }
          {showList &&
            <Dropdown
              className={css(styles.toolbarDropDown)}
              onRenderCaretDown={() => { return <i className={styles.toolbarSubmenuCaret} role="presentation" aria-hidden="true" data-icon-name="CaretDownSolid8"></i>; }}
              selectedKey={this.state.formats.list}
              options={[
                {
                  key: 'bullet',
                  text: strings.ListBullet,
                  data: { icon: 'BulletedList' }
                },
                {
                  key: 'ordered',
                  text: strings.ListNumbered,
                  data: { icon: 'NumberedList' }
                }
              ]}
              // this option is not available yet
              // notifyOnReselect={true} // allows re-selecting selected item to turn it off
              onChanged={(item) => this._onChangeList(item)}
              onRenderOption={(option: IDropdownOption): JSX.Element => {
                return (
                  <TooltipHost
                    content={option.text}
                    id={`${option.text}-toolbarButton`}
                    calloutProps={{ gapSpace: 0 }}>
                    <div
                      className={css(styles.toolbarDropDownOption,
                        option.data!.className
                          ? option.data!.className
                          : undefined)}
                      aria-describedby={`${option.text}-toolbarButton`}
                    >
                      <Icon
                        className={styles.toolbarDropDownIcon}
                        iconName={option.data.icon}
                        aria-hidden="true"
                      />
                    </div>
                  </TooltipHost>
                );
              }}
              onRenderTitle={(options: IDropdownOption[]): JSX.Element => {
                const option = options[0];

                return (
                  <TooltipHost
                    content={option.text}
                    id={`${option.text}-dropDownTitle`}
                    calloutProps={{ gapSpace: 0 }}>
                    <div
                      className={styles.toolbarSubmenuDisplayButton}
                      aria-describedby={`${option.text}-dropDownTitle`}
                    >
                      <Icon className={styles.toolbarDropDownTitleIcon}
                        iconName={option.data.icon}
                        aria-hidden="true" />
                    </div>
                  </TooltipHost>
                );
              }}
              onRenderPlaceHolder={(): JSX.Element => {
                return (
                  <TooltipHost
                    content={"Placeholder"}
                    id={`Placeholder-dropDownTitle`}
                    calloutProps={{ gapSpace: 0 }}>
                    <div
                      className={styles.toolbarSubmenuDisplayButton}
                      aria-describedby={`Placeholder-dropDownTitle`}
                    >
                      <Icon className={styles.toolbarDropDownTitleIcon}
                        iconName={'BulletedList'}
                        aria-hidden="true" />
                    </div>
                  </TooltipHost>
                );
              }}
            />
          }
          {showLink &&
            <TooltipHost
              content={strings.LinkTitle}
              id="link-richtextbutton"
              calloutProps={{ gapSpace: 0 }}>
              <IconButton
                checked={this.state.formats!.link !== undefined}
                onClick={() => this._showInsertLinkDialog()}
                aria-describedby="link-richtextbutton"
                iconProps={{
                  iconName: 'Link'
                }} />
            </TooltipHost>
          }
          {showMore &&
            <TooltipHost
              content={strings.MoreTitle}
              id="more-richtextbutton"
              calloutProps={{ gapSpace: 0 }}>
              <IconButton
                iconProps={{ iconName: 'More' }}
                aria-describedby="more-richtextbutton"
                onClick={() =>
                  this._handleShowMore()}>
              </IconButton>
            </TooltipHost>
          }
        </div>
        <ReactQuill
          ref={this._linkQuill}
          placeholder={placeholder}
          modules={modules}
          value={text === undefined ? '' : text}
          onChange={this._handleChange}
          onChangeSelection={(range, oldRange, source) =>
            this._handleChangeSelection(range, oldRange, source)}
          onFocus={(range, source, editor) =>
            this._handleOnFocus(range, source, editor)}
        />
        <RichTextPropertyPane
          ref={this._linkPropertyPane}
          editor={this.getEditor()}
          isOpen={this.state.morePaneVisible}
          onClose={() => this._handleClosePanel()}
          onLink={() => this._showInsertLinkDialog()}
        />
        {this._renderLinkDialog()}
      </div>
    );
  }

  /**
   * Returns a handle to the Quill editor
   */
  public getEditor = (): Quill => {
    try {
      return this._quillElem!.getEditor();
    } catch (error) {
      return undefined;
    }
  }

  private _onChangeBold = (): void => {
    const newBoldValue = !this.state.formats.bold;
    this._applyFormat("bold", newBoldValue);
  }

  private _onChangeItalic = (): void => {
    const newValue = !this.state.formats.italic;
    this._applyFormat("italic", newValue);
  }

  private _onChangeUnderline = (): void => {
    const newValue = !this.state.formats.underline;
    this._applyFormat("underline", newValue);
  }
  private _onChangeHeading = (item: IDropdownOption): void => {
    const newHeadingValue = item.key === 0 ? '' : item.key.toString();
    this._applyFormat("header", newHeadingValue);
  }

  private _onChangeAlign = (item: IDropdownOption): void => {
    const newAlignValue = item.key === 'left' ? false : item.key.toString();
    this._applyFormat("align", newAlignValue);
  }

  private _onChangeList = (item: IDropdownOption): void => {
    // if we're already in list mode, toggle off
    const key = item.key;
    const newAlignValue = (key === 'bullet' && this.state.formats.list === 'bullet') ||
      (key === 'numbered' && this.state.formats.list === 'numbered')
      ? false : key;
    this._applyFormat("list", newAlignValue);
  }

  /**
   * Renders the "Insert Link" dialog
   */
  private _renderLinkDialog = (): JSX.Element => {
    return (<Dialog
      hidden={this.state.hideDialog}
      onDismiss={this._closeDialog}
      dialogContentProps={{
        type: DialogType.normal,
        title: strings.InsertLinkTitle,
      }}
      modalProps={{
        className: styles.insertLinkDialog,
        isBlocking: true,
        containerClassName: 'ms-dialogMainOverride'
      }}
    >
      <TextField
        label={strings.AddressFieldLabel}
        value={this.state.insertUrl !== undefined ? this.state.insertUrl : "https://"}
        onChanged={(newValue?: string) => {
          this.setState({
            insertUrl: newValue
          });
        }} />
      <TextField
        label={strings.TextToDisplayLabel}
        value={this.state.insertUrlText !== undefined ? this.state.insertUrlText : this.state.insertUrl}
        onChanged={(newValue?: string) => {
          if (newValue !== this.state.insertUrl) {
            this.setState({
              insertUrlText: newValue
            });
          }
        }} />
      <DialogFooter className={styles.actions}>
        <div className={css("ms-Dialog-actionsRight", styles.actionsRight)}>
          {this.state.selectedUrl &&
            <Link className={css(styles.action, styles.unlinkButton)} onClick={() => this._handleRemoveLink()}>{strings.RemoveLinkLabel}</Link>
          }
          <PrimaryButton className={styles.action} onClick={this._handleCreateLink} text={strings.SaveButtonLabel} />
          <DefaultButton className={styles.action} onClick={this._closeDialog} text={strings.CancelButtonLabel} />
        </div>
      </DialogFooter>
    </Dialog>);
  }

  /**
   * Displays the insert link dialog
   */
  private _showInsertLinkDialog = () => {
    const quill = this.getEditor();
    const range = quill.getSelection();

    let linkText = this.state.selectedText;
    if (this.state.selectedUrl !== undefined && this.state.selectedText === "") {
      const { text } = this.state;
      const urlStartIndex = text.indexOf(this.state.selectedUrl);
      const startTextIndex = text.indexOf(">", urlStartIndex) + 1;
      const endTextIndex = text.indexOf("<", startTextIndex);
      const realLength = endTextIndex - startTextIndex;
      linkText = text.substr(startTextIndex, realLength);

      //Find where the link text starts and select that
      const editorText = quill.getText();
      const linkStart = editorText.indexOf(linkText);
      range.index = linkStart;
      range.length = linkText.length;
    }

    this.setState({
      hideDialog: false,
      insertUrlText: linkText,
      insertUrl: this.state.selectedUrl,
      selectedRange: range
    });
  }

  /**
   * Hides the insert link dialog
   */
  private _closeDialog = () => {
    this.setState({ hideDialog: true });
  }

  /**
   * When user enters the richtext editor, displays the border
   */
  private _handleOnFocus = (range, source, editor) => {
    if (!this.state.editing) {
      this.setState({ editing: true });
    }
  }

  /**
   * Called when user removes the link
   */
  private _handleRemoveLink = () => {
    const quill = this.getEditor();
    quill.format('link', false);
    this._closeDialog();
  }

  /**
   * Called when user creates a new link
   */
  private _handleCreateLink = () => {
    const quill = this.getEditor();
    const range = this.state.selectedRange;
    const cursorPosition: number = range!.index;
    if (range.length > 0) {
      quill.deleteText(range.index, range.length);
    }

    if (cursorPosition) {
      const textToInsert: string = this.state.insertUrlText !== undefined ? this.state.insertUrlText : this.state.insertUrl;
      const urlToInsert: string = this.state.insertUrl;
      quill.insertText(cursorPosition, textToInsert);
      quill.setSelection(cursorPosition, textToInsert.length);
      quill.formatText(cursorPosition, textToInsert.length, 'link', urlToInsert);
    }

    this.setState({
      hideDialog: true,
      insertUrl: undefined,
      insertUrlText: undefined
    });
  }

  /**
   * Applies a format to the selection
   * @param name format name
   * @param value format value, or false to unset format
   */
  private _applyFormat(name: string, value: any) {
    const quill = this.getEditor();
    quill.format(name, value);

    // we use a timeout to ensure that format has been applied
    // and buttons are updated
    setTimeout(
      () => {
        this._handleChangeSelection(quill.getSelection(), undefined, undefined);
      },
      100
    );
  }

  /**
   * Called when richtext selection changes
   */
  private _handleChangeSelection = (range, oldRange, source) => {
    const quill = this.getEditor();
    try {
      if (quill) {
        // Get the selected text
        const selectedText = quill.getText(range);

        // Get the current format
        const formats = quill.getFormat(range);

        // Get the currently selected url
        const selectedUrl = formats.link ? formats.link : undefined;

        this.setState({
          selectedText: selectedText,
          selectedUrl: selectedUrl,
          formats: formats
        });

        if (this._propertyPaneRef && this.state.morePaneVisible) {
          this._propertyPaneRef.onChangeSelection(range, oldRange, source);
        }
      }
    } catch (error) {

    }
  }

  /**
   * Called when user clicks on the close icon
   */
  private _handleClosePanel = (): void => {
    this._closePanel();
  }

  /**
   * Closes the panel
   */
  private _closePanel = (): void => {
    this.setState({ morePaneVisible: false });
  }

  /**
   * Called when user clicks on the more button
   */
  private _handleShowMore = () => {
    this.setState({
      morePaneVisible: !this.state.morePaneVisible
    }, () => {
      this.getEditor().focus();
    });
  }

  /**
   * Called when user changes the text of the editor
   */
  private _handleChange = (value: string) => {
    const { onChange } = this.props;

    // do we need to pass this to a handler?
    if (onChange) {
      // yes, get the changed text from the handler
      let newText: string = this.props.onChange(value);
      this.setState({ text: newText });
    } else {
      // no, write the text to the state
      this.setState({ text: value });
    }
  }

  /**
   * Set the wrapper ref
   */
  private _setWrapperRef(node) {
    this._wrapperRef = node;
  }

  /**
   * Keeps track of whether we clicked outside the element
   */
  private _handleClickOutside(event) {
    let outside: boolean = !elementContains(this._wrapperRef, event.target);

    // Did we click outside?
    if (outside) {
      // If we are currently editing, stop editing
      // -- unless we're using the property pane or the dialog
      if (this.state.editing) {
        this.setState({
          editing: false
        });
      }
    } else {
      // We clicked inside
      if (!this.state.editing) {
        // if we aren't currently editing, start editing
        this.setState({ editing: true });
      }
    }
  }

  /**
   * Links to the quill reference
   */
  private _linkQuill = (e: any) => {
    this._quillElem = e;
  }

  /**
   * Links to the property pane element
   */
  private _linkPropertyPane = (e: any) => {
    this._propertyPaneRef = e;
  }
}
