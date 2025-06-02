import * as React from 'react';
import * as strings from 'ControlStrings';
import 'react-quill/dist/quill.snow.css';
import RichTextPropertyPane from './RichTextPropertyPane';
import ReactQuill, { Quill as ReactQuillInstance } from 'react-quill';
import type { Quill } from 'quill';
import styles from './RichText.module.scss';
import { IRichTextProps, IRichTextState } from './RichText.types';
import { Guid } from '@microsoft/sp-core-library';
import * as telemetry from '../../common/telemetry';
import isEqual from 'lodash/isEqual';
import { IconButton } from '@fluentui/react/lib/Button';
import { TooltipHost } from '@fluentui/react/lib/Tooltip';
import { Dialog, DialogType, DialogFooter } from '@fluentui/react/lib/Dialog';
import { TextField } from '@fluentui/react/lib/TextField';
import { Link } from '@fluentui/react/lib/Link';
import { PrimaryButton, DefaultButton } from '@fluentui/react/lib/Button';
import { Dropdown, IDropdownOption } from '@fluentui/react/lib/Dropdown';
import { Icon } from '@fluentui/react/lib/Icon';
import { css, elementContains } from '@fluentui/react/lib/Utilities';
import { initializeIcons } from '@fluentui/react/lib/Icons';
import { Label } from '@fluentui/react/lib/Label';

const TOOLBARPADDING: number = 28;
const CONTAINER_CLASS: string = 'pnp-richtext-quill-container';
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
  private _richTextId = undefined;

  private ddStyleOpts = [
    {
      key: 2,
      text: strings.HeaderH2,
      data: { className: styles.toolbarButtonH2 },
    },
    {
      key: 3,
      text: strings.HeaderH3,
      data: { className: styles.toolbarButtonH3 },
    },
    {
      key: 4,
      text: strings.HeaderH4,
      data: { className: styles.toolbarButtonH4 },
    },
    {
      key: 0,
      text: strings.HeaderNormalText,
      data: { className: styles.toolbarButtonNormal },
    },
    {
      key: 7,
      text: strings.HeaderBlockQuote,
      data: { className: styles.toolbarButtonBlockQuote },
    },
  ];

  private ddAlignOpts = [
    {
      key: 'left',
      text: strings.AlignLeft,
      data: { icon: 'AlignLeft' },
    },
    {
      key: 'center',
      text: strings.AlignCenter,
      data: { icon: 'AlignCenter' },
    },
    {
      key: 'right',
      text: strings.AlignRight,
      data: { icon: 'AlignRight' },
    },
  ];

  private ddListOpts = [
    {
      key: 'bullet',
      text: strings.ListBullet,
      data: { icon: 'BulletedList' },
    },
    {
      key: 'ordered',
      text: strings.ListNumbered,
      data: { icon: 'NumberedList' },
    },
  ];

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
      showImage: true,
      showMore: true,
    },
  };

  constructor(props: IRichTextProps) {
    super(props);
    telemetry.track('ReactRichText', {
      className: !!props.className,
    });

    this.state = {
      text: this.props.value,
      editing: false,
      morePaneVisible: false,
      hideDialog: true,
      hideImageDialog: true,
      formats: {},
      insertUrl: undefined,
      insertUrlText: undefined,
      insertImageUrl: undefined,
      selectedText: undefined,
      selectedUrl: undefined,
      wrapperTop: 0,
    };

    // Get a unique toolbar id
    this._toolbarId = 'toolbar_' + Guid.newGuid().toString();

    // Get a unique rich text id if not provided by props
    this._richTextId = props.id ?? 'richText_' + Guid.newGuid().toString();
  }

  /**
   * Attaches to mouse down events to determine if we clicked outside
   */
  public componentDidMount(): void {
    // If we're in edit mode, attach the mouse down event
    if (this.props.isEditMode) {
      document.addEventListener('click', this.handleClickOutside);
      document.addEventListener('focus', this.handleClickOutside);

      const domRect: DOMRect = this._wrapperRef.getBoundingClientRect();
      const parentDomRect: DOMRect =
        this._wrapperRef.parentElement.getBoundingClientRect();
      const toolbarTop: number =
        domRect.top - parentDomRect.top - TOOLBARPADDING;

      this.setState({
        wrapperTop: toolbarTop,
      });
    }
  }

  /**
   * Removes the mouse down event
   */
  public componentWillUnmount(): void {
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
  public componentDidUpdate(
    prevProps: IRichTextProps,
    prevState: IRichTextState
  ): void {
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
  public shouldComponentUpdate(
    nextProps: IRichTextProps,
    nextState: IRichTextState
  ): boolean {
    // Checks if the value coming in is the same
    if (isEqual(nextState, this.state) && isEqual(nextProps, this.props)) {
      return false;
    }

    return true;
  }

  public UNSAFE_componentWillReceiveProps(nextProps: IRichTextProps): void {
    if (
      nextProps.value !== this.props.value &&
      nextProps.value !== this.state.text
    ) {
      this.setState({
        text: nextProps.value,
      });
    }
  }

  /**
   * Returns a handle to the Quill editor
   */
  public getEditor = (): Quill => {
    try {
      return this._quillElem.getEditor();
    } catch {
      return undefined;
    }
  };

  /**
   * Render style option
   *
   * @param option
   */
  private onRenderStyleOption(option: IDropdownOption): JSX.Element {
    return (
      <TooltipHost
        content={option.text}
        id={`${option.text}-toolbarButton`}
        calloutProps={{ gapSpace: 0 }}
      >
        <div
          className={`${styles.toolbarDropDownOption} ${
            option.data?.className ? option.data.className : ''
          }`}
          aria-describedby={`${option.text}-toolbarButton`}
        >
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
  private onRenderStyleTitle(options: IDropdownOption[]): JSX.Element {
    const option = options[0];

    return (
      <TooltipHost
        content={option.text}
        id={`${option.text}-dropDownTitle`}
        calloutProps={{ gapSpace: 0 }}
      >
        <div
          className={styles.toolbarSubmenuDisplayButton}
          aria-describedby={`${option.text}-dropDownTitle`}
        >
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
  private onRenderAlignOption(option: IDropdownOption): JSX.Element {
    return (
      <TooltipHost
        content={option.text}
        id={`${option.text}-toolbarButton`}
        calloutProps={{ gapSpace: 0 }}
      >
        <div
          className={`${styles.toolbarDropDownOption} ${
            option.data?.className ? option.data.className : ''
          }`}
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
  }

  /**
   * Render the list dropdown title
   *
   * @param options
   */
  private onRenderListTitle(options: IDropdownOption[]): JSX.Element {
    const option = options[0];

    return (
      <TooltipHost
        content={option.text}
        id={`${option.text}-dropDownTitle`}
        calloutProps={{ gapSpace: 0 }}
      >
        <div
          className={styles.toolbarSubmenuDisplayButton}
          aria-describedby={`${option.text}-dropDownTitle`}
        >
          <Icon
            className={styles.toolbarDropDownTitleIcon}
            iconName={option.data.icon}
            aria-hidden="true"
          />
        </div>
      </TooltipHost>
    );
  }

  /**
   * Render the title of the align dropdown
   *
   * @param options
   */
  private onRenderAlignTitle(options: IDropdownOption[]): JSX.Element {
    const option = options[0];

    return (
      <TooltipHost
        content={option.text}
        id={`${option.text}-dropDownTitle`}
        calloutProps={{ gapSpace: 0 }}
      >
        <div
          className={styles.toolbarSubmenuDisplayButton}
          aria-describedby={`${option.text}-dropDownTitle`}
        >
          <Icon
            className={styles.toolbarDropDownTitleIcon}
            iconName={option.data.icon}
            aria-hidden="true"
          />
        </div>
      </TooltipHost>
    );
  }

  /**
   * Render list dropdown option
   *
   * @param option
   */
  private onRenderListOption(option: IDropdownOption): JSX.Element {
    return (
      <TooltipHost
        content={option.text}
        id={`${option.text}-toolbarButton`}
        calloutProps={{ gapSpace: 0 }}
      >
        <div
          className={`${styles.toolbarDropDownOption} ${
            option.data?.className ? option.data.className : ''
          }`}
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
  }

  /**
   * Render the list dropdown placeholder
   */
  private onRenderListPlaceholder(): JSX.Element {
    return (
      <TooltipHost
        content={'Placeholder'}
        id={`Placeholder-dropDownTitle`}
        calloutProps={{ gapSpace: 0 }}
      >
        <div
          className={styles.toolbarSubmenuDisplayButton}
          aria-describedby={`Placeholder-dropDownTitle`}
        >
          <Icon
            className={styles.toolbarDropDownTitleIcon}
            iconName={'BulletedList'}
            aria-hidden="true"
          />
        </div>
      </TooltipHost>
    );
  }

  /**
   * Renders the "Insert Link" dialog
   */
  private renderLinkDialog = (): JSX.Element => {
    return (
      <Dialog
        hidden={this.state.hideDialog}
        onDismiss={this.closeDialog}
        dialogContentProps={{
          type: DialogType.normal,
          title: strings.InsertLinkTitle,
        }}
        modalProps={{
          className: styles.insertLinkDialog,
          isBlocking: true,
          containerClassName: 'ms-dialogMainOverride',
        }}
      >
        <TextField
          label={strings.AddressFieldLabel}
          placeholder="https://"
          value={this.state.insertUrl !== undefined ? this.state.insertUrl : ''}
          onChange={(e, newValue?: string) => {
            this.setState({
              insertUrl: newValue,
            });
          }}
        />

        <TextField
          label={strings.TextToDisplayLabel}
          value={this.state.insertUrlText}
          onChange={(e, newValue?: string) => {
            if (newValue !== this.state.insertUrlText) {
              this.setState({
                insertUrlText: newValue,
              });
            }
          }}
        />

        <DialogFooter className={styles.actions}>
          <div className={`ms-Dialog-actionsRight ${styles.actionsRight}`}>
            {this.state.selectedUrl && (
              <Link
                className={`${styles.action} ${styles.unlinkButton}`}
                onClick={this.handleRemoveLink}
              >
                {strings.RemoveLinkLabel}
              </Link>
            )}
            <PrimaryButton
              className={styles.action}
              onClick={this.handleCreateLink}
              text={strings.SaveButtonLabel}
              disabled={this.checkLinkUrl()}
            />
            <DefaultButton
              className={styles.action}
              onClick={this.closeDialog}
              text={strings.CancelButtonLabel}
            />
          </div>
        </DialogFooter>
      </Dialog>
    );
  };

  /**
   * Renders the "Insert Image" dialog
   */
  private renderImageDialog = (): JSX.Element => {
    return (
      <Dialog
        hidden={this.state.hideImageDialog}
        onDismiss={this.closeImageDialog}
        dialogContentProps={{
          type: DialogType.normal,
          title: strings.InsertImageTitle,
        }}
        modalProps={{
          className: styles.insertLinkDialog,
          isBlocking: true,
          containerClassName: 'ms-dialogMainOverride',
        }}
      >
        <TextField
          label={strings.AddressFieldLabel}
          value={
            this.state.insertImageUrl !== undefined
              ? this.state.insertImageUrl
              : ''
          }
          onChange={(e, newValue?: string) => {
            this.setState({
              insertImageUrl: newValue,
            });
          }}
        />

        <DialogFooter className={styles.actions}>
          <div className={`ms-Dialog-actionsRight ${styles.actionsRight}`}>
            <PrimaryButton
              className={styles.action}
              onClick={this.handleInsertImage}
              text={strings.SaveButtonLabel}
              disabled={this.checkImageLinkUrl()}
            />
            <DefaultButton
              className={styles.action}
              onClick={this.closeImageDialog}
              text={strings.CancelButtonLabel}
            />
          </div>
        </DialogFooter>
      </Dialog>
    );
  };

  /**
   * Renders the Rich Text Editor
   */
  public render(): React.ReactElement<IRichTextProps> {
    const { text } = this.state;
    const { isEditMode } = this.props;

    const renderLabel: JSX.Element =
      (this.props.onRenderLabel && this.props.onRenderLabel(this.props)) ??
      this.onRenderLabel();

    // If we're not in edit mode, display read-only version of the html
    if (!isEditMode) {
      return (
        <>
          {renderLabel}
          <div
            id={this._richTextId}
            className={css(
              'ql-editor',
              styles.richtext,
              this.props.className || null
            )}
            dangerouslySetInnerHTML={{ __html: text }}
          />
        </>
      );
    }

    // Okay, we're in edit mode.
    const {
      placeholder,
      style,
      styleOptions: {
        showStyles,
        showBold,
        showItalic,
        showUnderline,
        showAlign,
        showList,
        showLink,
        showMore,
        showImage,
      },
    } = this.props;

    // Get a unique id for the toolbar
    const modules = {
      toolbar: {
        container: '#' + this._toolbarId,
        handlers: [
          'link', // disable the link handler so we can add our own
        ],
      },
      clipboard: {
        matchVisual: false, // prevents weird bug that inserts blank lines when loading stored text
      },
    };

    // Remove fonts and set Segoe UI as the main font
    const font = ReactQuillInstance.import('formats/font');
    font.whitelist = ['Segoe UI'];
    ReactQuillInstance.register(font, true);

    // Set headers and add blockquote capability
    const header = ReactQuillInstance.import('formats/header');
    header.tagName = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'blockquote'];
    ReactQuillInstance.register(header, true);

    // Add the SharePoint font sizes
    const sizeClass = ReactQuillInstance.import('formats/size');
    sizeClass.whitelist = [
      'small',
      'medium',
      'mediumplus',
      'large',
      'xlarge',
      'xlargeplus',
      'xxlarge',
      'xxxlarge',
      'xxlargeplus',
      'super',
      'superlarge',
    ];
    ReactQuillInstance.register(sizeClass, true);

    return (
      <div
        ref={(ref) => {
          this._wrapperRef = ref;
        }}
        className={
          css(
            styles.richtext && this.state.editing ? 'ql-active' : null,
            CONTAINER_CLASS,
            this.props.className || null
          ) || null
        }
        style={style}
      >
        {renderLabel}
        <div id={this._toolbarId} style={{ top: this.state.wrapperTop }}>
          {showStyles && (
            <Dropdown
              id="DropDownStyles"
              className={`${styles.headerDropDown} ${styles.toolbarDropDown}`}
              onRenderCaretDown={() => (
                <Icon
                  className={styles.toolbarSubmenuCaret}
                  iconName="CaretDownSolid8"
                />
              )}
              selectedKey={this.state.formats.header || 0}
              options={this.ddStyleOpts}
              onChange={this.onChangeHeading}
              onRenderOption={this.onRenderStyleOption}
              onRenderTitle={this.onRenderStyleTitle}
            />
          )}
          {showBold && (
            <TooltipHost
              content={strings.BoldTitle}
              id="bold-richtextbutton"
              calloutProps={{ gapSpace: 0 }}
            >
              <IconButton
                iconProps={{ iconName: 'Bold' }}
                aria-describedby="bold-richtextbutton"
                checked={this.state.formats.bold}
                onClick={this.onChangeBold}
              />
            </TooltipHost>
          )}
          {showItalic && (
            <TooltipHost
              content={strings.ItalicTitle}
              id="italic-richtextbutton"
              calloutProps={{ gapSpace: 0 }}
            >
              <IconButton
                iconProps={{ iconName: 'Italic' }}
                aria-describedby="italic-richtextbutton"
                checked={this.state.formats.italic}
                onClick={this.onChangeItalic}
              />
            </TooltipHost>
          )}
          {showUnderline && (
            <TooltipHost
              content={strings.UnderlineTitle}
              id="underline-richtextbutton"
              calloutProps={{ gapSpace: 0 }}
            >
              <IconButton
                iconProps={{ iconName: 'Underline' }}
                aria-describedby="underline-richtextbutton"
                checked={this.state.formats.underline}
                onClick={this.onChangeUnderline}
              />
            </TooltipHost>
          )}
          {showAlign && (
            <Dropdown
              className={`${styles.toolbarDropDown}`}
              id="DropDownAlign"
              onRenderCaretDown={() => (
                <Icon
                  className={styles.toolbarSubmenuCaret}
                  iconName="CaretDownSolid8"
                />
              )}
              selectedKey={this.state.formats.align || 'left'}
              options={this.ddAlignOpts}
              onChange={this.onChangeAlign}
              onRenderOption={this.onRenderAlignOption}
              onRenderTitle={this.onRenderAlignTitle}
            />
          )}
          {showList && (
            <Dropdown
              className={styles.toolbarDropDown}
              id="DropDownLists"
              onRenderCaretDown={() => (
                <Icon
                  className={styles.toolbarSubmenuCaret}
                  iconName="CaretDownSolid8"
                />
              )}
              selectedKey={this.state.formats.list}
              options={this.ddListOpts}
              // this option is not available yet
              notifyOnReselect={true} // allows re-selecting selected item to turn it off
              onChange={this.onChangeList}
              onRenderOption={this.onRenderListOption}
              onRenderTitle={this.onRenderListTitle}
              onRenderPlaceholder={this.onRenderListPlaceholder}
            />
          )}
          {showLink && (
            <TooltipHost
              content={strings.LinkTitle}
              id="link-richtextbutton"
              calloutProps={{ gapSpace: 0 }}
            >
              <IconButton
                checked={this.state.formats?.link !== undefined}
                onClick={this.showInsertLinkDialog}
                aria-describedby="link-richtextbutton"
                iconProps={{
                  iconName: 'Link',
                }}
              />
            </TooltipHost>
          )}
          {showImage && (
            <TooltipHost
              content={strings.ImageTitle}
              id="image-richtextbutton"
              calloutProps={{ gapSpace: 0 }}
            >
              <IconButton //checked={this.state.formats!.link !== undefined}
                onClick={this.showInsertImageDialog}
                aria-describedby="image-richtextbutton"
                iconProps={{
                  iconName: 'PictureFill',
                }}
              />
            </TooltipHost>
          )}
          {showMore && (
            <TooltipHost
              content={strings.MoreTitle}
              id="more-richtextbutton"
              calloutProps={{ gapSpace: 0 }}
            >
              <IconButton
                iconProps={{ iconName: 'More' }}
                aria-describedby="more-richtextbutton"
                onClick={this.handleShowMore}
              />
            </TooltipHost>
          )}
        </div>

        <ReactQuill
          ref={this.linkQuill}
          id={this._richTextId}
          placeholder={placeholder}
          modules={modules}
          value={text || ''} //property value causes issues, defaultValue does not
          onChange={this.handleChange}
          onChangeSelection={this.handleChangeSelection}
          onFocus={this.handleOnFocus}
        />

        <RichTextPropertyPane
          ref={this.linkPropertyPane}
          editor={this.getEditor()}
          isOpen={this.state.morePaneVisible}
          onClose={this.handleClosePanel}
          onLink={this.showInsertLinkDialog}
          customColors={this.props.customColors}
        />

        {this.renderLinkDialog()}
        {this.renderImageDialog()}
      </div>
    );
  }

  /**
   * Style trigger events
   */
  private onChangeBold = (): void => {
    const newBoldValue = !this.state.formats.bold;
    this.applyFormat('bold', newBoldValue);
  };

  private onChangeItalic = (): void => {
    const newValue = !this.state.formats.italic;
    this.applyFormat('italic', newValue);
  };

  private onChangeUnderline = (): void => {
    const newValue = !this.state.formats.underline;
    this.applyFormat('underline', newValue);
  };
  private onChangeHeading = (
    _event: React.FormEvent<HTMLDivElement>,
    item?: IDropdownOption,
    _index?: number
  ): void => {
    const newHeadingValue = item.key === 0 ? '' : item.key.toString();
    this.applyFormat('header', newHeadingValue);
  };

  private onChangeAlign = (
    _event: React.FormEvent<HTMLDivElement>,
    item?: IDropdownOption,
    _index?: number
  ): void => {
    const newAlignValue = item.key === 'left' ? false : item.key.toString();
    this.applyFormat('align', newAlignValue);
  };

  private onChangeList = (
    _event: React.FormEvent<HTMLDivElement>,
    item?: IDropdownOption,
    _index?: number
  ): void => {
    // if we're already in list mode, toggle off
    const key = item.key;
    const newAlignValue =
      (key === 'bullet' && this.state.formats.list === 'bullet') ||
      (key === 'ordered' && this.state.formats.list === 'ordered')
        ? false
        : key;
    this.applyFormat('list', newAlignValue);
  };

  /**
   * Displays the insert link dialog
   */
  private showInsertLinkDialog = (): void => {
    const quill = this.getEditor();
    const range = quill.getSelection();

    let linkText = this.state.selectedText;
    if (
      this.state.selectedUrl !== undefined &&
      this.state.selectedText === ''
    ) {
      const { text } = this.state;
      const urlStartIndex = text.indexOf(this.state.selectedUrl);
      const startTextIndex = text.indexOf('>', urlStartIndex) + 1;
      const endTextIndex = text.indexOf('<', startTextIndex);
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
      selectedRange: range,
    });
  };

  /**
   * Hides the insert link dialog
   */
  private closeDialog = (): void => {
    this.setState({ hideDialog: true });
  };

  /**
   * Displays the insert link dialog
   */
  private showInsertImageDialog = (): void => {
    const quill = this.getEditor();
    const range = quill.getSelection();

    this.setState({
      hideImageDialog: false,
      selectedRange: range,
    });
  };

  /**
   * Hides the insert image dialog
   */
  private closeImageDialog = (): void => {
    this.setState({
      hideImageDialog: true,
      insertImageUrl: undefined,
    });
  };

  /**
   * When user enters the richtext editor, displays the border
   */
  private handleOnFocus = (range, source, editor): void => {
    if (!this.state.editing) {
      this.setState({ editing: true });
    }
  };

  /**
   * Called when user removes the link
   */
  private handleRemoveLink = (): void => {
    const quill = this.getEditor();
    quill.format('link', false);
    this.closeDialog();
  };

  /**
   * Called when user creates a new link
   */
  private handleCreateLink = (): void => {
    const quill = this.getEditor();
    const range = this.state.selectedRange;
    const cursorPosition: number = range.index;
    if (range.length > 0) {
      quill.deleteText(range.index, range.length);
    }

    if (cursorPosition > -1) {
      const textToInsert: string =
        this.state.insertUrlText !== undefined &&
        this.state.insertUrlText !== ''
          ? this.state.insertUrlText
          : this.state.insertUrl;
      const urlToInsert: string = this.state.insertUrl;
      quill.insertText(cursorPosition, textToInsert);
      quill.setSelection(cursorPosition, textToInsert.length);
      quill.formatText(
        cursorPosition,
        textToInsert.length,
        'link',
        urlToInsert
      );
    }

    this.setState({
      hideDialog: true,
      insertUrl: undefined,
      insertUrlText: undefined,
    });
  };

  /**
   * Called when user insert an image
   */
  private handleInsertImage = (): void => {
    const { insertImageUrl, selectedRange } = this.state;
    try {
      const quill = this.getEditor();
      const cursorPosition: number = selectedRange.index;
      quill.insertEmbed(cursorPosition, 'image', insertImageUrl, 'user');
      this.setState({
        insertImageUrl: undefined,
        hideImageDialog: true,
      });
    } catch {
      //Close the image dialog if something went wrong
      this.setState({
        insertImageUrl: undefined,
        hideImageDialog: true,
      });
    }
  };

  /**
   * Disable Save-button if hyperlink is undefined or empty
   * This prevents the user of adding an empty hyperlink
   */
  private checkLinkUrl = (): boolean => {
    if (this.state.insertUrl !== undefined && this.state.insertUrl !== '') {
      return false;
    }
    return true;
  };

  /**
   * Disable Save-button if hyperlink for the imported image is undefined or empty
   * This prevents the user of adding an empty image
   */
  private checkImageLinkUrl = (): boolean => {
    if (
      this.state.insertImageUrl !== undefined &&
      this.state.insertImageUrl !== ''
    ) {
      return false;
    }
    return true;
  };

  /**
   * Applies a format to the selection
   * @param name format name
   * @param value format value, or false to unset format
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private applyFormat(name: string, value: any): void {
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
  private handleChangeSelection = (range, oldRange, source): void => {
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
          formats: formats,
        });

        if (this._propertyPaneRef && this.state.morePaneVisible) {
          this._propertyPaneRef.onChangeSelection(range, oldRange, source);
        }
      }
    } catch {
      // no-op;
    }
  };

  /**
   * Called when user clicks on the close icon
   */
  private handleClosePanel = (): void => {
    this.closePanel();
  };

  /**
   * Closes the panel
   */
  private closePanel = (): void => {
    this.setState({ morePaneVisible: false });
  };

  /**
   * Called when user clicks on the more button
   */
  private handleShowMore = (): void => {
    this.setState(
      {
        morePaneVisible: !this.state.morePaneVisible,
      },
      () => {
        this.getEditor().focus();
      }
    );
  };

  /**
   * Called when user changes the text of the editor
   */
  private handleChange = (value: string): void => {
    const { onChange } = this.props;

    const newState: any = {}; // eslint-disable-line @typescript-eslint/no-explicit-any

    const quill = this.getEditor();
    if (quill) {
      const range = quill.getSelection();
      if (range) {
        const formats = quill.getFormat(range);

        if (!isEqual(formats, this.state.formats)) {
          console.log(`current format: ${formats.list}`);
          newState.formats = formats;
        }
      }
    }

    // do we need to pass this to a handler?
    if (onChange) {
      // yes, get the changed text from the handler
      const newText: string = onChange(value);
      newState.text = newText;
    } else {
      // no, write the text to the state
      newState.text = value;
    }

    this.setState({
      ...newState,
    });
  };

  /**
   * Keeps track of whether we clicked outside the element
   */
  private handleClickOutside = (event): void => {
    const outside: boolean = !elementContains(this._wrapperRef, event.target);

    // Did we click outside?
    if (outside) {
      // If we are currently editing, stop editing
      // -- unless we're using the property pane or the dialog
      if (this.state.editing) {
        this.setState({
          editing: false,
        });
      }
    } else {
      // We clicked inside
      if (!this.state.editing) {
        // if we aren't currently editing, start editing
        this.setState({ editing: true });
      }
    }
  };

  /**
   * Links to the quill reference
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private linkQuill = (e: any): void => {
    this._quillElem = e;
  };

  /**
   * Links to the property pane element
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private linkPropertyPane = (e: any): void => {
    this._propertyPaneRef = e;
  };

  /**
   * Renders the label above the rich text (if specified)
   */
  private onRenderLabel = (): JSX.Element | null => {
    const { label } = this.props;

    if (label) {
      return <Label htmlFor={this._richTextId}>{label}</Label>;
    }

    return null;
  };
}
