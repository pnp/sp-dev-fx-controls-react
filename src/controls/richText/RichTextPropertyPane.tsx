import * as React from 'react';
import * as strings from 'ControlStrings';
import styles from './RichTextPropertyPane.module.scss';
import RteColorPicker from './RteColorPicker';
import { IRichTextPropertyPaneProps, IRichTextPropertyPaneState } from './RichTextPropertyPane.types';
import { IconButton } from '@fluentui/react/lib/Button';
import { Panel, PanelType } from '@fluentui/react/lib/Panel';
import { TooltipHost } from '@fluentui/react/lib/Tooltip';
import { Dropdown, IDropdownOption } from '@fluentui/react/lib/Dropdown';
import { ThemeColorHelper } from '../../common/utilities/ThemeColorHelper';
import { RangeStatic } from 'quill';

export default class RichTextPropertyPane extends React.Component<IRichTextPropertyPaneProps, IRichTextPropertyPaneState> {

  constructor(props: IRichTextPropertyPaneProps) {
    super(props);

    this.state = {
      formats: {}
    };
  }

  /**
   * componentDidUpdate lifecycle hook
   *
   * @param prevProps
   * @param prevState
   */
  public componentDidUpdate(prevProps: IRichTextPropertyPaneProps, prevState: IRichTextPropertyPaneState): void {
    // if we're just opening, sync the format choices with the current selection
    if (!prevProps.isOpen && this.props.isOpen) {
      const quill = this.props.editor;
      if (quill === undefined) {
        return;
      }

      const range = quill.getSelection();
      this.onChangeSelection(range, undefined, undefined);
    }
  }

  /**
   * Default React render method
   */
  public render(): React.ReactElement<IRichTextPropertyPaneProps> {
    return (
      <Panel className={styles.richTextPropertyPane}
        isBlocking={false}
        isOpen={this.props.isOpen}
        type={PanelType.smallFixedFar}
        onDismiss={this.props.onClose}
        closeButtonAriaLabel={strings.CloseButton}
        onRenderNavigation={this.handleRenderNavigation}
        focusTrapZoneProps={{
          forceFocusInsideTrap: false,
          isClickableOutsideFocusTrap: true
        }}>
        <div>
          <div>
            <div>
              <div className={styles.propertyPaneGroupContent}>
                {this.renderActionsGroup()}
                {this.renderFontStylesGroup()}
                {this.renderFontSizesGroup()}
                {this.renderInlineStylesGroup()}
                {this.renderColorStylesGroup()}
              </div>
            </div>
            <div className={styles.propertyPaneGroupContent}>
              <div className={styles.propertyPaneGroupHeaderNoAccordion}>{strings.ParagraphSectionTitle}</div>
              {this.renderAlignmentStylesGroup()}
              {this.renderListStylesGroup()}
            </div>
            <div className={styles.propertyPaneGroupContent}>
              <div className={styles.propertyPaneGroupHeaderNoAccordion}>{strings.HyperlinkSectionTitle}</div>
              {this.renderHyperlinkStylesGroup()}
            </div>
          </div>
        </div>
      </Panel>
    );
  }

  /**
   * On selection changed event handler
   */
  public onChangeSelection = (range: RangeStatic, oldRange?: RangeStatic, source?: RangeStatic): void => {
    const quill = this.props.editor;
    if (quill === undefined || range === undefined) {
      return;
    }

    if (range) {
      const formats = quill.getFormat(range);
      this.setState({
        formats
      });
    }
  }

  /**
   * Render the actions group
   */
  private renderActionsGroup = (): JSX.Element => {
    return (
      <div className={styles.propertyPaneGroupField}>
        <div className="ms-CustomFieldHost">
          <div className={styles.controlsInOneRow}>
            <TooltipHost content={strings.UndoTitle}
              id="undo-propertyPaneButton"
              calloutProps={{ gapSpace: 0 }}>
              <IconButton onClick={this.handleUndo}
                className={styles.propertyPaneButton}
                aria-describedby="undo-propertyPaneButton"
                iconProps={{
                  iconName: 'Undo',
                  style: {
                    fontSize: '20px'
                  }
                }} />
            </TooltipHost>

            <TooltipHost content={strings.RedoTitle}
              id="redo-propertyPaneButton"
              calloutProps={{ gapSpace: 0 }}>
              <IconButton onClick={this.handleRedo}
                className={styles.propertyPaneButton}
                aria-describedby="redo-propertyPaneButton"
                iconProps={{
                  iconName: 'Redo',
                  style: {
                    fontSize: '20px'
                  }
                }} />
            </TooltipHost>

            <TooltipHost content={strings.ClearFormattingTitle}
              id="clearFormatting-button-propertyPaneButton"
              calloutProps={{ gapSpace: 0 }}>
              <IconButton onClick={this.handleClearFormatting}
                className={styles.propertyPaneButton}
                aria-describedby="clearFormatting-button-propertyPaneButton"
                iconProps={{
                  iconName: 'ClearFormatting',
                  style: {
                    fontSize: '20px'
                  }
                }} />
            </TooltipHost>
          </div>
        </div>
      </div>
    );
  }

  /**
   * Render font styles group
   */
  private renderFontStylesGroup = (): JSX.Element => {
    const selectedHeader = this.state.formats?.header ? this.state.formats.header : 0;

    return (
      <div className={styles.propertyPaneGroupField}>
        <Dropdown label={strings.FontStyleTitle}
          ariaLabel={strings.FontStyleTitle}
          selectedKey={selectedHeader}
          options={[
            { key: 0, text: strings.HeaderNormalText },
            { key: 2, text: strings.HeaderH2 },
            { key: 3, text: strings.HeaderH3 },
            { key: 4, text: strings.HeaderH4 },
            { key: 7, text: strings.HeaderBlockQuote }
          ]}
          onChanged={this.onChangeHeading}
        />
      </div>
    );
  }

  /**
   * Render font size group
   */
  private renderFontSizesGroup = (): JSX.Element => {
    // get the selected header
    const selectedSize = this.state.formats?.size ? this.state.formats.size : 'large';

    return (
      <div className={styles.propertyPaneGroupField}>
        <Dropdown label={strings.FontSizeTitle}
          ariaLabel={strings.FontSizeTitle}
          selectedKey={selectedSize}
          options={[
            { key: 'xsmall', text: '10' },
            { key: 'small', text: '12' },
            { key: 'medium', text: '14' },
            { key: 'mediumplus', text: '16' },
            { key: 'large', text: '18' },
            { key: 'xlarge', text: '20' },
            { key: 'xlargeplus', text: '24' },
            { key: 'xxlarge', text: '28' },
            { key: 'xxxlarge', text: '32' },
            { key: 'xxlargeplus', text: '36' },
            { key: 'super', text: '42' },
            { key: 'superlarge', text: '68' }
          ]}
          onChanged={this.onChangeSize}
        />
      </div>
    );
  }

  /**
   * Render inline styles group
   */
  private renderInlineStylesGroup = (): JSX.Element => {
    return (
      <div className={styles.propertyPaneGroupField}>
        <div className="ms-CustomFieldHost">
          <div className={styles.controlsInOneRow}>
            <TooltipHost content={strings.BoldTitle}
              id="bold-propertyPaneButton"
              calloutProps={{ gapSpace: 0 }}>
              <IconButton checked={this.state.formats.bold}
                onClick={() => this.applyFormat('bold', !this.state.formats.bold)}
                className={styles.propertyPaneButton}
                aria-describedby="bold-propertyPaneButton"
                iconProps={{
                  iconName: 'Bold',
                  style: {
                    fontSize: '20px'
                  }
                }} />
            </TooltipHost>

            <TooltipHost content={strings.ItalicTitle}
              id="italic-propertyPaneButton"
              calloutProps={{ gapSpace: 0 }}>
              <IconButton checked={this.state.formats.italic}
                onClick={() => this.applyFormat('italic', !this.state.formats.italic)}
                className={styles.propertyPaneButton}
                aria-describedby="italic-propertyPaneButton"
                iconProps={{
                  iconName: 'Italic',
                  style: {
                    fontSize: '20px'
                  }
                }} />
            </TooltipHost>

            <TooltipHost content={strings.UnderlineTitle}
              id="underline-propertyPaneButton"
              calloutProps={{ gapSpace: 0 }}>
              <IconButton checked={this.state.formats.underline}
                onClick={() => this.applyFormat('underline', !this.state.formats.underline)}
                className={styles.propertyPaneButton}
                aria-describedby="underline-propertyPaneButton"
                iconProps={{
                  iconName: 'Underline',
                  style: {
                    fontSize: '20px'
                  }
                }} />
            </TooltipHost>

            <TooltipHost content={strings.StrikethroughTitle}
              id="strikethrough-propertyPaneButton"
              calloutProps={{ gapSpace: 0 }}>
              <IconButton checked={this.state.formats.strike}
                onClick={() => this.applyFormat('strike', !this.state.formats.strike)}
                className={styles.propertyPaneButton}
                aria-describedby="strikethrough-propertyPaneButton"
                iconProps={{
                  iconName: 'Strikethrough',
                  style: {
                    fontSize: '20px'
                  }
                }} />
            </TooltipHost>

            <TooltipHost content={strings.SuperscriptTitle}
              id="superscript-propertyPaneButton"
              calloutProps={{ gapSpace: 0 }}>
              <IconButton checked={this.state.formats.script === 'super'}
                onClick={() => this.applyFormat('script', this.state.formats.script === 'super' ? '' : 'super')}
                className={styles.propertyPaneButton}
                aria-describedby="superscript-propertyPaneButton"
                iconProps={{
                  iconName: 'Superscript',
                  style: {
                    fontSize: '20px'
                  }
                }} />
            </TooltipHost>

            <TooltipHost content={strings.SubscriptTitle}
              id="subscript-propertyPaneButton"
              calloutProps={{ gapSpace: 0 }}>
              <IconButton checked={this.state.formats.script === 'sub'}
                onClick={() => this.applyFormat('script', this.state.formats.script === 'sub' ? '' : 'sub')}
                className={styles.propertyPaneButton}
                aria-describedby="subscript-propertyPaneButton"
                iconProps={{
                  iconName: 'Subscript',
                  style: {
                    fontSize: '20px'
                  }
                }} />
            </TooltipHost>
          </div>
        </div>
      </div>
    );
  }

  /**
   * Render color styles group
   */
  private renderColorStylesGroup = (): JSX.Element => {
    const color: string = this.state.formats.color || ThemeColorHelper.GetThemeColor(styles.NeutralPrimary);
    const backgroundColor: string = this.state.formats.background || "rgba(0, 0, 0, 0)";

    /**
     * Add custom colors if passed as a property
     */
    const fontColorGroups = ["themeColors","standardColors"];
    if(this.props.customColors) fontColorGroups.push('customColors');

    return (
      <div className={styles.propertyPaneGroupField}>
        <div className="ms-CustomFieldHost">
          <div className={styles.controlsInOneRow}>
            <RteColorPicker colorPickerGroups={fontColorGroups} // changed to variable
              customColors={this.props.customColors}
              buttonLabel={strings.FontColorLabel}
              id="fontColor-propertyPaneButton"
              defaultButtonLabel={strings.AutomaticFontColor}
              fillThemeColor={true}
              previewColor={color}
              selectedColor={color}
              onColorChanged={this.handleFillColorChanged}
              switchToDefaultColor={() => this.handleFillColorChanged(undefined)} />

            <RteColorPicker buttonLabel={strings.HighlightColorLabel}
              colorPickerGroups={[
                "highlightColors"
              ]}
              fillThemeColor={false}
              onColorChanged={this.handleHighlightColorChanged}
              switchToDefaultColor={() => this.handleHighlightColorChanged(undefined)}
              previewColor={backgroundColor}
              defaultButtonLabel={strings.NoColorHighlightColor}
              selectedColor={backgroundColor}
              id="highlightColor-propertyPaneButton"
            />
          </div>
        </div>
      </div>
    );
  }

  /**
   * Render alignment style groups
   */
  private renderAlignmentStylesGroup = (): JSX.Element => {
    return (
      <div className={styles.propertyPaneGroupField}>
        <div className="ms-CustomFieldHost">
          <div className={styles.controlsInOneRow}>
            <TooltipHost content={strings.AlignLeft}
              id="left-propertyPaneButton"
              calloutProps={{ gapSpace: 0 }}>
              <IconButton checked={this.state.formats.align === undefined}
                onClick={() => this.applyFormat('align', undefined)}
                className={styles.propertyPaneButton}
                aria-describedby="left-propertyPaneButton"
                iconProps={{
                  iconName: 'AlignLeft',
                  style: {
                    fontSize: '20px'
                  }
                }} />
            </TooltipHost>

            <TooltipHost content={strings.AlignCenter}
              id="center-propertyPaneButton"
              calloutProps={{ gapSpace: 0 }}>
              <IconButton checked={this.state.formats.align === 'center'}
                onClick={() => this.applyFormat('align', 'center')}
                className={styles.propertyPaneButton}
                aria-describedby="center-propertyPaneButton"
                iconProps={{
                  iconName: 'AlignCenter',
                  style: {
                    fontSize: '20px'
                  }
                }} />
            </TooltipHost>

            <TooltipHost content={strings.AlignRight}
              id="right-propertyPaneButton"
              calloutProps={{ gapSpace: 0 }}>
              <IconButton checked={this.state.formats.align === 'right'}
                onClick={() => this.applyFormat('align', 'right')}
                className={styles.propertyPaneButton}
                aria-describedby="right-propertyPaneButton"
                iconProps={{
                  iconName: 'AlignRight',
                  style: {
                    fontSize: '20px'
                  }
                }} />
            </TooltipHost>

            <TooltipHost content={strings.AlignJustify}
              id="justify-propertyPaneButton"
              calloutProps={{ gapSpace: 0 }}>
              <IconButton checked={this.state.formats.align === 'justify'}
                onClick={() => this.applyFormat('align', 'justify')}
                className={styles.propertyPaneButton}
                aria-describedby="justify-propertyPaneButton"
                iconProps={{
                  iconName: 'AlignJustify',
                  style: {
                    fontSize: '20px'
                  }
                }} />
            </TooltipHost>

            <TooltipHost content={strings.IncreaseIndentTitle}
              id="increaseindent-propertyPaneButton"
              calloutProps={{ gapSpace: 0 }}>
              <IconButton
                onClick={() => this.onChangeIndent(1)}
                className={styles.propertyPaneButton}
                aria-describedby="increaseindent-propertyPaneButton"
                iconProps={{
                  iconName: 'IncreaseIndentLegacy',
                  style: {
                    fontSize: '20px'
                  }
                }} />
            </TooltipHost>

            <TooltipHost content={strings.DecreaseIndentTitle}
              id="decreaseindent-propertyPaneButton"
              calloutProps={{ gapSpace: 0 }}>
              <IconButton
                onClick={() => this.onChangeIndent(-1)}
                className={styles.propertyPaneButton}
                aria-describedby="decreaseindent-propertyPaneButton"
                iconProps={{
                  iconName: 'DecreaseIndentLegacy',
                  style: {
                    fontSize: '20px'
                  }
                }} />
            </TooltipHost>
          </div>
        </div>
      </div>
    );
  }

  /**
   * Render list styles group
   */
  private renderListStylesGroup = (): JSX.Element => {
    return <div className={styles.propertyPaneGroupField}>
      <div className="ms-CustomFieldHost">
        <div className={styles.controlsInOneRow}>
          <TooltipHost content={strings.ListBullet}
            id="bullet-propertyPaneButton"
            calloutProps={{ gapSpace: 0 }}>
            <IconButton checked={this.state.formats.list === 'bullet'}
              onClick={() => this.applyFormat('list', 'bullet')}
              className={styles.propertyPaneButton}
              aria-describedby="bullet-propertyPaneButton"
              iconProps={{
                iconName: 'BulletedList',
                style: {
                  fontSize: '20px'
                }
              }} />
          </TooltipHost>

          <TooltipHost content={strings.ListNumbered}
            id="ordered-propertyPaneButton"
            calloutProps={{ gapSpace: 0 }}>
            <IconButton checked={this.state.formats.list === 'ordered'}
              onClick={() => this.applyFormat('list', 'ordered')}
              className={styles.propertyPaneButton}
              aria-describedby="ordered-propertyPaneButton"
              iconProps={{
                iconName: 'NumberedList',
                style: {
                  fontSize: '20px'
                }
              }} />
          </TooltipHost>
        </div>
      </div>
    </div>;
  }

  /**
   * Render hyperlink styles group
   */
  private renderHyperlinkStylesGroup = (): JSX.Element => {
    return (
      <div className={styles.propertyPaneGroupField}>
        <div className="ms-CustomFieldHost">
          <div className={styles.controlsInOneRow}>
            <TooltipHost content={strings.LinkTitle}
              id="link-propertyPaneButton"
              calloutProps={{ gapSpace: 0 }}>
              <IconButton checked={this.state.formats.link !== undefined}
                onClick={() => this.props.onLink()}
                className={styles.propertyPaneButton}
                aria-describedby="link-propertyPaneButton"
                iconProps={{
                  iconName: 'Link',
                  style: {
                    fontSize: '20px'
                  }
                }} />
            </TooltipHost>

            <TooltipHost content={strings.RemoveLinkLabel}
              id="unlink-propertyPaneButton"
              calloutProps={{ gapSpace: 0 }}>
              <IconButton disabled={this.state.formats.link === undefined}
                onClick={() => this.applyFormat('link', false)}
                className={styles.propertyPaneButton}
                aria-describedby="unlink-propertyPaneButton"
                iconProps={{
                  iconName: 'RemoveLink',
                  style: {
                    fontSize: '20px'
                  }
                }} />
            </TooltipHost>
          </div>
        </div>
      </div>
    );
  }

  /**
   * Handle fill color change
   */
  private handleFillColorChanged = (color: string): void => {
    this.applyFormat('color', color);
  }

  /**
   * Handle the hightlight color change
   */
  private handleHighlightColorChanged = (color: string): void => {
    this.applyFormat('background', color);
  }

  /**
   * On heading change
   */
  private onChangeHeading = (item: IDropdownOption): void => {
    const newHeadingValue = item.key === 0 ? '' : item.key.toString();
    this.applyFormat("header", newHeadingValue);
  }

  /**
   * On indentation change.
   */
  private onChangeIndent = (direction: 1 | -1): void => {
    const quill = this.props.editor;
    const current = +(quill.getFormat(quill.getSelection()).indent || 0);
    this.applyFormat("indent", current + direction);
  }

  /**
   * On size change
   */
  private onChangeSize = (item: IDropdownOption): void => {
    const newSizeValue = item.key === 0 ? '' : item.key.toString();
    this.applyFormat("size", newSizeValue);
  }

  /**
   * Apply the new format
   *
   * @param name
   * @param value
   */
  private applyFormat(name: string, value: any): void { // eslint-disable-line @typescript-eslint/no-explicit-any
    const quill = this.props.editor;
    quill.format(name, value);
    setTimeout(() => {
      this.onChangeSelection(quill.getSelection());
    }, 100);
  }

  /**
   * Handle the undo action
   */
  private handleUndo = (): void => {
    const quill = this.props.editor;
    quill.getModule("history").undo();
    setTimeout(() => {
      this.onChangeSelection(quill.getSelection());
    }, 100);
  }

  /**
   * Handle the clear formatting action
   */
  private handleClearFormatting = (): void => {
    const quill = this.props.editor;
    const range = quill.getSelection();
    if (range) {
      if (range.length > 0) {
        quill.removeFormat(range.index, range.length);
        setTimeout(() => {
          this.onChangeSelection(quill.getSelection());
        }, 100);
      }
    }
  }

  /**
   * Handle the redo action
   */
  private handleRedo = (): void => {
    const quill = this.props.editor;
    quill.getModule("history").redo();
    setTimeout(() => {
      this.onChangeSelection(quill.getSelection());
    }, 100);
  }

  /**
   * Navigation render
   */
  private handleRenderNavigation = (): JSX.Element => {
    return (
      <div className={styles.formattingPaneTitle} aria-hidden="true">{strings.FormattingPaneTitle}
        <IconButton onClick={() => this.props.onClose()}
          className={styles.propertyPaneClose}
          iconProps={{
            iconName: 'Cancel'
          }}
          title={strings.CloseButton}
          ariaLabel={strings.CloseButton} />
      </div>
    );
  }
}
