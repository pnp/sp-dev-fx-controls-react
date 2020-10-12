import * as React from 'react';
import * as strings from 'ControlStrings';
import 'react-quill/dist/quill.snow.css';
import RichTextPropertyPane from './RichTextPropertyPane';
import ReactQuill, { Quill } from 'react-quill';
import styles from './RichText.module.scss';
import { IRichTextProps, IRichTextState } from './RichText.types';
import { IconButton } from 'office-ui-fabric-react/lib/Button';
import { Guid } from '@microsoft/sp-core-library';
import { TooltipHost } from 'office-ui-fabric-react/lib/Tooltip';
import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Dropdown, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { elementContains } from 'office-ui-fabric-react/lib/Utilities';
import * as telemetry from '../../common/telemetry';
import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';
import isEqual from 'lodash/isEqual';

const TOOLBARPADDING: number = 28;
/**
 * Creates a rich text editing control that mimics the out-of-the-box
 * SharePoint Rich Text control.
 * NOTE:
 * Quill.js has a few quirks that we can't work around
 * - Block quotes only work on single lines. This is a frequently-requested feature with Quill that isn't available yet.
 * - Tables aren't supported yet. I'll gladly add table formatting support if users request it.
 */

initializeIcons();

export class RichText extends React.Component<IRichTextProps, IRichTextState> {
  private _quillElem: ReactQuill = undefined;
  private _wrapperRef: HTMLDivElement = undefined;
  private _propertyPaneRef: RichTextPropertyPane = undefined;
  private _toolbarId = undefined;

  private ddStyleOpts = [{
    key: 0,
    text: strings.HeaderNormalText,
    data: { }
  }, {
    key: 2,
    text: strings.HeaderH2,
    data:
      { className: styles.toolbarButtonH2 }
  }, {
    key: 3,
    text: strings.HeaderH3,
    data:
      { className: styles.toolbarButtonH3 }
  }, {
    key: 4,
    text: strings.HeaderH4,
    data:
      { className: styles.toolbarButtonH4 }
  }, {
    key: 7,
    text: strings.HeaderBlockQuote,
    data:
      { className: styles.toolbarButtonBlockQuote }
  }];

  private ddAlignOpts = [{
    key: 'left',
    text: strings.AlignLeft,
    data: { icon: 'AlignLeft' }
  }, {
    key: 'center',
    text: strings.AlignCenter,
    data: { icon: 'AlignCenter' }
  }, {
    key: 'right',
    text: strings.AlignRight,
    data: { icon: 'AlignRight' }
  }];

  private ddListOpts = [{
    key: 'bullet',
    text: strings.ListBullet,
    data: { icon: 'BulletedList' }
  }, {
    key: 'ordered',
    text: strings.ListNumbered,
    data: { icon: 'NumberedList' }
  }];

  /**
   * Sets default properties
   */
  public static defaultProps: Partial<IRichTextProps> = {
    isEditMode: true,
    styleOptions: {
      showStyles: true,
      showBold: true,
      showItalic: true,
      showUnderline: true,
      showAlign: true,
      showList: true,
      showLink: true,
      showMore: true
    }
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
      selectedUrl: undefined,
      wrapperTop: 0
    };

    // Get a unique toolbar id
    this._toolbarId = "toolbar_" + Guid.newGuid().toString();
  }

  /**
   * Attaches to mouse down events to determine if we clicked outside
   */
  public componentDidMount() {
    // If we're in edit mode, attach the mouse down event
    if (this.props.isEditMode) {
      document.addEventListener('click', this.handleClickOutside);
      document.addEventListener('focus', this.handleClickOutside);

      const clientRect: ClientRect = this._wrapperRef.getBoundingClientRect();
      const parentClientRect: ClientRect = this._wrapperRef.parentElement.getBoundingClientRect();
      const toolbarTop: number = clientRect.top - parentClientRect.top - TOOLBARPADDING;

      this.setState({
        wrapperTop: toolbarTop
      });
    }
  }

  /**
   * Removes the mouse down event
   */
  public componentWillUnmount() {
    // If we were in edit mode, remove the mouse down handler
    if (this.props.isEditMode) {
      document.removeEventListener('click', this.handleClickOutside);
      document.removeEventListener('focus', this.handleClickOutside);
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
      document.addEventListener('click', this.handleClickOutside);
      document.addEventListener('focus', this.handleClickOutside);
    }

    // If we're going from edit mode to non-edit mode
    if (!this.props.isEditMode && prevProps.isEditMode) {
      document.removeEventListener('click', this.handleClickOutside);
      document.removeEventListener('focus', this.handleClickOutside);
    }
  }

  /**
   * shouldComponentUpdate lifecycle hook
   *
   * @param nextProps
   * @param nextState
   */
  public shouldComponentUpdate(nextProps: IRichTextProps, nextState: IRichTextState): boolean {
    // Checks if the value coming in is the same
    if (isEqual(nextState, this.state) && isEqual(nextProps, this.props)) {
      return false;
    }

    return true;
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

  /**
   * Render style option
   *
   * @param option
   */
  private onRenderStyleOption (option: IDropdownOption): JSX.Element {
    return (
      <TooltipHost content={option.text}
                   id={`${option.text}-toolbarButton`}
                   calloutProps={{ gapSpace: 0 }}>
        <div className={`${styles.toolbarDropDownOption} ${option.data!.className ? option.data!.className : ""}`}
             aria-describedby={`${option.text}-toolbarButton`}>
          <span>{option.text}</span>
        </div>
      </TooltipHost>
    );
  }

  /**
   * Render the title of the style dropdown
   *
   * @param options
   */
  private onRenderStyleTitle (options: IDropdownOption[]): JSX.Element {
    const option = options[0];

    return (
      <TooltipHost content={option.text}
                   id={`${option.text}-dropDownTitle`}
                   calloutProps={{ gapSpace: 0 }}>
        <div className={styles.toolbarSubmenuDisplayButton}
             aria-describedby={`${option.text}-dropDownTitle`}>
          <span>{option.text}</span>
        </div>
      </TooltipHost>
    );
  }

  /**
   * Render align option
   *
   * @param option
   */
  private onRenderAlignOption (option: IDropdownOption): JSX.Element {
    return (
      <TooltipHost content={option.text}
                   id={`${option.text}-toolbarButton`}
                   calloutProps={{ gapSpace: 0 }}>
        <div className={`${styles.toolbarDropDownOption} ${option.data!.className ? option.data!.className : ""}`}
             aria-describedby={`${option.text}-toolbarButton`}>
          <Icon className={styles.toolbarDropDownIcon}
                iconName={option.data.icon}
                aria-hidden="true" />
        </div>
      </TooltipHost>
    );
  }

  /**
   * Render the list dropdown title
   *
   * @param options
   */
  private onRenderListTitle (options: IDropdownOption[]): JSX.Element {
    const option = options[0];

    return (
      <TooltipHost content={option.text}
                   id={`${option.text}-dropDownTitle`}
                   calloutProps={{ gapSpace: 0 }}>
        <div className={styles.toolbarSubmenuDisplayButton}
             aria-describedby={`${option.text}-dropDownTitle`}>
          <Icon className={styles.toolbarDropDownTitleIcon}
                iconName={option.data.icon}
                aria-hidden="true" />
        </div>
      </TooltipHost>
    );
  }

  /**
   * Render the title of the align dropdown
   *
   * @param options
   */
  private onRenderAlignTitle (options: IDropdownOption[]): JSX.Element {
    const option = options[0];

    return (
      <TooltipHost content={option.text}
                   id={`${option.text}-dropDownTitle`}
                   calloutProps={{ gapSpace: 0 }}>
        <div className={styles.toolbarSubmenuDisplayButton}
             aria-describedby={`${option.text}-dropDownTitle`}>
          <Icon className={styles.toolbarDropDownTitleIcon}
                iconName={option.data.icon}
                aria-hidden="true" />
        </div>
      </TooltipHost>
    );
  }

  /**
   * Render list dropdown option
   *
   * @param option
   */
  private onRenderListOption (option: IDropdownOption): JSX.Element {
    return (
      <TooltipHost content={option.text}
                   id={`${option.text}-toolbarButton`}
                   calloutProps={{ gapSpace: 0 }}>
        <div className={`${styles.toolbarDropDownOption} ${option.data!.className ? option.data!.className : ""}`}
             aria-describedby={`${option.text}-toolbarButton`}>
          <Icon className={styles.toolbarDropDownIcon}
                iconName={option.data.icon}
                aria-hidden="true" />
        </div>
      </TooltipHost>
    );
  }

  /**
   * Render the list dropdown placeholder
   */
  private onRenderListPlaceholder (): JSX.Element {
    return (
      <TooltipHost content={"Placeholder"}
                   id={`Placeholder-dropDownTitle`}
                   calloutProps={{ gapSpace: 0 }}>
        <div className={styles.toolbarSubmenuDisplayButton}
             aria-describedby={`Placeholder-dropDownTitle`}>
          <Icon className={styles.toolbarDropDownTitleIcon}
                iconName={'BulletedList'}
                aria-hidden="true" />
        </div>
      </TooltipHost>
    );
  }

  /**
   * Renders the "Insert Link" dialog
   */
  private renderLinkDialog = (): JSX.Element => {
    return (
      <Dialog hidden={this.state.hideDialog}
              onDismiss={this.closeDialog}
              dialogContentProps={{
                type: DialogType.normal,
                title: strings.InsertLinkTitle,
              }}
              modalProps={{
                className: styles.insertLinkDialog,
                isBlocking: true,
                containerClassName: 'ms-dialogMainOverride'
              }}>
        <TextField label={strings.AddressFieldLabel}
                   value={this.state.insertUrl !== undefined ? this.state.insertUrl : "https://"}
                   onChanged={(newValue?: string) => {
                    this.setState({
                      insertUrl: newValue
                    });
                  }} />

        <TextField label={strings.TextToDisplayLabel}
                   value={this.state.insertUrlText}
                   onChanged={(newValue?: string) => {
                    if (newValue !== this.state.insertUrl) {
                      this.setState({
                        insertUrlText: newValue
                      });
                    }
                   }} />

        <DialogFooter className={styles.actions}>
          <div className={`ms-Dialog-actionsRight ${styles.actionsRight}`}>
            {
              this.state.selectedUrl && (
                <Link className={`${styles.action} ${styles.unlinkButton}`} onClick={this.handleRemoveLink}>{strings.RemoveLinkLabel}</Link>
              )
            }
            <PrimaryButton className={styles.action} onClick={this.handleCreateLink} text={strings.SaveButtonLabel} disabled={this.checkLinkUrl()} />
            <DefaultButton className={styles.action} onClick={this.closeDialog} text={strings.CancelButtonLabel} />
          </div>
        </DialogFooter>
      </Dialog>
    );
  }

  /**
   * Renders the Rich Text Editor
   */
  public render(): React.ReactElement<IRichTextProps> {
    const { text } = this.state;
    const { isEditMode } = this.props;

    // If we're not in edit mode, display read-only version of the html
    if (!isEditMode) {
      return (
        <div className={`ql-editor ${styles.richtext} ${this.props.className || ''}`}
             dangerouslySetInnerHTML={{ __html: text }}>
        </div>
      );
    }

    // Okay, we're in edit mode.
    const { placeholder, styleOptions: { showStyles, showBold, showItalic, showUnderline, showAlign, showList, showLink, showMore } } = this.props;

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
    let font = Quill.import('formats/font');
    font.whitelist = ['Segoe UI'];
    Quill.register(font, true);

    // Set headers and add blockquote capability
    let header = Quill.import('formats/header');
    header.tagName = [
      'H1',
      'H2',
      'H3',
      'H4',
      'H5',
      'H6',
      'blockquote'];
    Quill.register(header, true);

    // Add the SharePoint font sizes
    let SizeClass = Quill.import('formats/size');
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
      <div ref={(ref) => this._wrapperRef = ref} className={`${styles.richtext && this.state.editing ? 'ql-active' : ''} ${this.props.className}`}>
        <div id={this._toolbarId} style={{top:this.state.wrapperTop}}>
          {
            showStyles && (
              <Dropdown
id="DropDownStyles"
              className={`${styles.headerDropDown} ${styles.toolbarDropDown}`}
                        onRenderCaretDown={() => <Icon className={styles.toolbarSubmenuCaret} iconName="CaretDownSolid8" />}
                        selectedKey={this.state.formats.header || 0}
                        options={this.ddStyleOpts}
                        onChanged={this.onChangeHeading}
                        onRenderOption={this.onRenderStyleOption}
                        onRenderTitle={this.onRenderStyleTitle}
                      />
            )
          }
          {
            showBold && (
              <TooltipHost content={strings.BoldTitle}
                           id="bold-richtextbutton"
                           calloutProps={{ gapSpace: 0 }}>
                <IconButton iconProps={{ iconName: 'Bold' }}
                            aria-describedby="bold-richtextbutton"
                            checked={this.state.formats.bold}
                            onClick={this.onChangeBold} />
              </TooltipHost>
            )
          }
          {
            showItalic && (
              <TooltipHost content={strings.ItalicTitle}
                           id="italic-richtextbutton"
                           calloutProps={{ gapSpace: 0 }}>
                <IconButton iconProps={{ iconName: 'Italic' }}
                            aria-describedby="italic-richtextbutton"
                            checked={this.state.formats.italic}
                            onClick={this.onChangeItalic} />
              </TooltipHost>
            )
          }
          {
            showUnderline && (
              <TooltipHost content={strings.UnderlineTitle}
                           id="underline-richtextbutton"
                           calloutProps={{ gapSpace: 0 }}>
                <IconButton iconProps={{ iconName: 'Underline' }}
                            aria-describedby="underline-richtextbutton"
                            checked={this.state.formats.underline}
                            onClick={this.onChangeUnderline} />
            </TooltipHost>
            )
          }
          {
            showAlign && (
              <Dropdown className={`${styles.toolbarDropDown}`}
              id="DropDownAlign"
                        onRenderCaretDown={() => <Icon className={styles.toolbarSubmenuCaret} iconName="CaretDownSolid8" />}
                        selectedKey={this.state.formats.align || 'left'}
                        options={this.ddAlignOpts}
                        onChanged={this.onChangeAlign}
                        onRenderOption={this.onRenderAlignOption}
                        onRenderTitle={this.onRenderAlignTitle}
              />
            )
          }
          {
            showList && (
              <Dropdown className={styles.toolbarDropDown}
              id="DropDownLists"
                        onRenderCaretDown={() => <Icon className={styles.toolbarSubmenuCaret} iconName="CaretDownSolid8" />}
                        selectedKey={this.state.formats.list}
                        options={this.ddListOpts}
                        // this option is not available yet
                        // notifyOnReselect={true} // allows re-selecting selected item to turn it off
                        onChanged={this.onChangeList}
                        onRenderOption={this.onRenderListOption}
                        onRenderTitle={this.onRenderListTitle}
                        onRenderPlaceHolder={this.onRenderListPlaceholder}
              />
            )
          }
          {
            showLink && (
              <TooltipHost content={strings.LinkTitle}
                           id="link-richtextbutton"
                           calloutProps={{ gapSpace: 0 }}>
                <IconButton checked={this.state.formats!.link !== undefined}
                            onClick={this.showInsertLinkDialog}
                            aria-describedby="link-richtextbutton"
                            iconProps={{
                              iconName: 'Link'
                            }} />
              </TooltipHost>
            )
          }
          {
            showMore && (
              <TooltipHost content={strings.MoreTitle}
                           id="more-richtextbutton"
                           calloutProps={{ gapSpace: 0 }}>
                <IconButton iconProps={{ iconName: 'More' }}
                            aria-describedby="more-richtextbutton"
                            onClick={this.handleShowMore} />
              </TooltipHost>
            )
          }
        </div>

        <ReactQuill ref={this.linkQuill}
                    placeholder={placeholder}
                    modules={modules}
                    defaultValue={text || ''} //property value causes issues, defaultValue does not
                    onChange={this.handleChange}
                    onChangeSelection={this.handleChangeSelection}
                    onFocus={this.handleOnFocus} />

        <RichTextPropertyPane ref={this.linkPropertyPane}
                              editor={this.getEditor()}
                              isOpen={this.state.morePaneVisible}
                              onClose={this.handleClosePanel}
                              onLink={this.showInsertLinkDialog}
                              customColors={this.props.customColors}/>

        {
          this.renderLinkDialog()
        }
      </div>
    );
  }

  /**
   * Style trigger events
   */
  private onChangeBold = (): void => {
    const newBoldValue = !this.state.formats.bold;
    this.applyFormat("bold", newBoldValue);
  }

  private onChangeItalic = (): void => {
    const newValue = !this.state.formats.italic;
    this.applyFormat("italic", newValue);
  }

  private onChangeUnderline = (): void => {
    const newValue = !this.state.formats.underline;
    this.applyFormat("underline", newValue);
  }
  private onChangeHeading = (item: IDropdownOption): void => {
    const newHeadingValue = item.key === 0 ? '' : item.key.toString();
    this.applyFormat("header", newHeadingValue);
  }

  private onChangeAlign = (item: IDropdownOption): void => {
    const newAlignValue = item.key === 'left' ? false : item.key.toString();
    this.applyFormat("align", newAlignValue);
  }

  private onChangeList = (item: IDropdownOption): void => {
    // if we're already in list mode, toggle off
    const key = item.key;
    const newAlignValue = (key === 'bullet' && this.state.formats.list === 'bullet') || (key === 'numbered' && this.state.formats.list === 'numbered') ? false : key;
    this.applyFormat("list", newAlignValue);
  }

  /**
   * Displays the insert link dialog
   */
  private showInsertLinkDialog = () => {
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
  private closeDialog = () => {
    this.setState({ hideDialog: true });
  }

  /**
   * When user enters the richtext editor, displays the border
   */
  private handleOnFocus = (range, source, editor) => {
    if (!this.state.editing) {
      this.setState({ editing: true });
    }
  }

  /**
   * Called when user removes the link
   */
  private handleRemoveLink = () => {
    const quill = this.getEditor();
    quill.format('link', false);
    this.closeDialog();
  }

  /**
   * Called when user creates a new link
   */
  private handleCreateLink = () => {
    const quill = this.getEditor();
    const range = this.state.selectedRange;
    const cursorPosition: number = range!.index;
    if (range.length > 0) {
      quill.deleteText(range.index, range.length);
    }

    if (cursorPosition > -1) {
      const textToInsert: string = (this.state.insertUrlText !== undefined && this.state.insertUrlText !== "") ? this.state.insertUrlText : this.state.insertUrl;
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
   * Disable Save-button if hyperlink is undefined or empty
   * This prevents the user of adding an empty hyperlink
   */
  private checkLinkUrl = () => {
    if (this.state.insertUrl !== undefined && this.state.insertUrl != "") {
      return false;
    }
    return true;
  }

  /**
   * Applies a format to the selection
   * @param name format name
   * @param value format value, or false to unset format
   */
  private applyFormat(name: string, value: any) {
    const quill = this.getEditor();
    quill.format(name, value);

    // We use a timeout to ensure that format has been applied and buttons are updated
    setTimeout(() => {
      this.handleChangeSelection(quill.getSelection(), undefined, undefined);
    }, 100);
  }

  /**
   * Called when richtext selection changes
   */
  private handleChangeSelection = (range, oldRange, source) => {
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
  private handleClosePanel = (): void => {
    this.closePanel();
  }

  /**
   * Closes the panel
   */
  private closePanel = (): void => {
    this.setState({ morePaneVisible: false });
  }

  /**
   * Called when user clicks on the more button
   */
  private handleShowMore = () => {
    this.setState({
      morePaneVisible: !this.state.morePaneVisible
    }, () => {
      this.getEditor().focus();
    });
  }

  /**
   * Called when user changes the text of the editor
   */
  private handleChange = (value: string) => {
    const { onChange } = this.props;

    // do we need to pass this to a handler?
    if (onChange) {
      // yes, get the changed text from the handler
      let newText: string = onChange(value);
      this.setState({ text: newText });
    } else {
      // no, write the text to the state
      this.setState({ text: value });
    }
  }

  /**
   * Keeps track of whether we clicked outside the element
   */
  private handleClickOutside = (event) => {
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
  private linkQuill = (e: any) => {
    this._quillElem = e;
  }

  /**
   * Links to the property pane element
   */
  private linkPropertyPane = (e: any) => {
    this._propertyPaneRef = e;
  }
}
