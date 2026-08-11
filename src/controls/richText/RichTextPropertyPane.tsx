import * as React from 'react';
import * as strings from 'ControlStrings';
import styles from './RichTextPropertyPane.module.scss';
import RteColorPicker from './RteColorPicker';
import { IRichTextPropertyPaneProps, IRichTextPropertyPaneState } from './RichTextPropertyPane.types';
import { ISwatchColor } from './SwatchColorPickerGroup.types';
import { IconButton } from '@fluentui/react/lib/Button';
import { Panel, PanelType } from '@fluentui/react/lib/Panel';
import { TooltipHost } from '@fluentui/react/lib/Tooltip';
import { Dropdown, IDropdownOption } from '@fluentui/react/lib/Dropdown';
import { ThemeColorHelper } from '../../common/utilities/ThemeColorHelper';
import { RangeStatic } from 'quill';

const FONT_SIZE_OPTIONS: IDropdownOption[] = [
  { key: 'xsmall', text: '10', data: { px: 10 } },
  { key: 'small', text: '12', data: { px: 12 } },
  { key: 'medium', text: '14', data: { px: 14 } },
  { key: 'mediumplus', text: '16', data: { px: 16 } },
  { key: 'large', text: '18', data: { px: 18 } },
  { key: 'xlarge', text: '20', data: { px: 20 } },
  { key: 'xlargeplus', text: '24', data: { px: 24 } },
  { key: 'xxlarge', text: '28', data: { px: 28 } },
  { key: 'xxxlarge', text: '32', data: { px: 32 } },
  { key: 'xxlargeplus', text: '36', data: { px: 36 } },
  { key: 'super', text: '42', data: { px: 42 } },
  { key: 'superlarge', text: '68', data: { px: 68 } }
];

export default class RichTextPropertyPane extends React.Component<IRichTextPropertyPaneProps, IRichTextPropertyPaneState> {
  private _customSizeValuesPx: Set<number> = new Set<number>();

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

      const renderedStyles = this.getRenderedStyleValues(range);
      // Keep Quill inline formats as source of truth; only use rendered values as fallback.
      if ((formats.size === undefined || formats.size === null || formats.size === '') && renderedStyles.size !== undefined) {
        formats.size = renderedStyles.size;
      }
      if ((formats.color === undefined || formats.color === null || formats.color === '') && renderedStyles.color !== undefined) {
        formats.color = renderedStyles.color;
      }
      if ((formats.background === undefined || formats.background === null || formats.background === '') && renderedStyles.background !== undefined) {
        formats.background = renderedStyles.background;
      }

      this.refreshCustomSizeValuesFromDocument();

      this.setState({
        formats
      });
    }
  }

  /**
   * Reads computed styles from the selected rendered element to keep tracked
   * formatting values (size, color, highlight) in sync with custom CSS classes.
   */
  private getRenderedStyleValues = (range: RangeStatic): { size?: string; color?: string; background?: string } => {
    const quill = this.props.editor;

    // Access Quill's root DOM element; if unavailable we cannot read computed styles.
    const editor = quill?.root as HTMLElement;
    if (!editor) {
      return {};
    }

    // Normalize the selection index to a non-negative value.
    const requestedIndex = Math.max(0, range.index || 0);

    // For caret selections (length 0), probe one character back when possible.
    // This helps when the caret sits at a boundary where the next node has different styles.
    const probeIndex = range.length === 0 && requestedIndex > 0 ? requestedIndex - 1 : requestedIndex;

    // Line-level node is the most reliable source for block formats (h2/h3/h4/blockquote/etc.).
    const [line] = quill.getLine(probeIndex);

    // Convert Quill line model node to a DOM element we can inspect.
    const lineElement = line?.domNode as HTMLElement;

    // Also inspect the exact piece of content where the cursor/selection is,
    // so inline color/highlight styles can still be detected when needed.
    const [leaf] = quill.getLeaf(probeIndex);
    const leafNode = leaf?.domNode as Node;

    // If leaf is a text node, use its parent element; otherwise use the element directly.
    const leafElement = leafNode?.nodeType === Node.TEXT_NODE
      ? (leafNode.parentElement as HTMLElement)
      : (leafNode as HTMLElement);

    // Choose the best target element for style inspection in priority order:
    // 1) line element (best for block styles),
    // 2) nearest block-like ancestor from leaf,
    // 3) leaf element itself,
    // 4) editor root as final fallback.
    const targetElement = lineElement
      || (leafElement?.closest('h1, h2, h3, h4, h5, h6, blockquote, p, div, li, ul, ol') as HTMLElement)
      || leafElement
      || editor;

    try {
      // Read final, browser-resolved CSS values after all classes/cascades are applied.
      const computed = getComputedStyle(targetElement);

      // Parse numeric font size in pixels from values like "18px".
      const fontSize = parseInt(computed.fontSize, 10);

      // Resolve to a known Quill size key when it matches one of our supported options.
      // Example: 28 -> "xxlarge".
      const sizeKey = FONT_SIZE_OPTIONS.find((option) => option.data?.px === fontSize)?.key?.toString();

      return {
        // If size is known, return the Quill key; otherwise return raw px string (display-only fallback).
        size: sizeKey || `${fontSize}px`,
        color: computed.color,
        background: computed.backgroundColor
      };
    } catch {
      return {};
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
    const sizeOptions = this.buildSortedSizeOptions(selectedSize);

    return (
      <div className={styles.propertyPaneGroupField}>
        <Dropdown label={strings.FontSizeTitle}
          ariaLabel={strings.FontSizeTitle}
          selectedKey={selectedSize}
          options={sizeOptions}
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
    const customFontColors = this.mergeSwatchColors(
      this.props.customColors,
      this.getCustomStyleSwatchColors('color')
    );
    const customHighlightColors = this.getCustomStyleSwatchColors('backgroundColor');

    /**
     * Add custom colors if passed as a property
     */
    const fontColorGroups = ["themeColors","standardColors"];
    if (customFontColors.length > 0) {
      fontColorGroups.push('customColors');
    }

    const highlightColorGroups = ["highlightColors"];
    if (customHighlightColors.length > 0) {
      highlightColorGroups.push('customColors');
    }

    return (
      <div className={styles.propertyPaneGroupField}>
        <div className="ms-CustomFieldHost">
          <div className={styles.controlsInOneRow}>
            <RteColorPicker colorPickerGroups={fontColorGroups} // changed to variable
              customColors={customFontColors}
              buttonLabel={strings.FontColorLabel}
              id="fontColor-propertyPaneButton"
              defaultButtonLabel={strings.AutomaticFontColor}
              fillThemeColor={true}
              previewColor={color}
              selectedColor={color}
              onColorChanged={this.handleFillColorChanged}
              switchToDefaultColor={() => this.handleFillColorChanged(undefined)} />

            <RteColorPicker buttonLabel={strings.HighlightColorLabel}
              colorPickerGroups={highlightColorGroups}
              fillThemeColor={false}
              onColorChanged={this.handleHighlightColorChanged}
              switchToDefaultColor={() => this.handleHighlightColorChanged(undefined)}
              previewColor={backgroundColor}
              defaultButtonLabel={strings.NoColorHighlightColor}
              selectedColor={backgroundColor}
              customColors={customHighlightColors}
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
                  iconName: 'IncreaseIndentText',
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
                  iconName: 'DecreaseIndentText',
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
    const quill = this.props.editor;
    const newHeadingValue = item.key === 0 ? '' : item.key.toString();

    // Reset explicit font-size so heading defaults (including customStyles) can apply.
    quill.format('size', false);
    quill.format('header', newHeadingValue);
    setTimeout(() => {
      this.onChangeSelection(quill.getSelection());
    }, 100);
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
    if (typeof item.key === 'string' && item.key.endsWith('px')) {
      const quill = this.props.editor;
      // This option represents a computed size outside Quill's whitelist.
      // Clear inline size so block-level/default styles can drive the rendered size.
      quill.format('size', false);
      setTimeout(() => {
        this.onChangeSelection(quill.getSelection());
      }, 100);
      return;
    }

    const newSizeValue = item.key === 0 ? '' : item.key.toString();
    this.applyFormat("size", newSizeValue);
  }

  /**
   * Builds the size dropdown list by combining:
   * - Quill whitelist sizes,
   * - font sizes found in custom style classes,
   * - and rendered custom sizes detected in the editor.
   *
   * Duplicate values are keyed by size and collapsed into a single option.
   */
  private buildSortedSizeOptions = (selectedSize?: string): IDropdownOption[] => {
    const optionsByKey: Record<string, IDropdownOption> = {};

    // Start with standard Quill sizes.
    FONT_SIZE_OPTIONS.forEach((option) => {
      optionsByKey[option.key.toString()] = option;
    });

    // Include custom sizes declared in customStyles.
    this.getCustomStyleFontSizesPx().forEach((px) => {
      const key = `${px}px`;
      optionsByKey[key] = {
        key,
        text: String(px),
        data: { px }
      };
    });

    // Include custom rendered sizes detected from current document content.
    this._customSizeValuesPx.forEach((px) => {
      const key = `${px}px`;
      optionsByKey[key] = {
        key,
        text: String(px),
        data: { px }
      };
    });

    // Keep currently selected value visible even if it is no longer in collected options.
    if (selectedSize && !optionsByKey[selectedSize]) {
      optionsByKey[selectedSize] = {
        key: selectedSize,
        text: selectedSize.endsWith('px') ? selectedSize.replace('px', '') : selectedSize
      };
    }

    // Sort numerically so users see a predictable ascending list.
    return Object.values(optionsByKey)
      .sort((a, b) => this.getSizeOptionPx(a) - this.getSizeOptionPx(b));
  }

  /**
   * Resolves a dropdown option to a numeric pixel value for sorting.
   */
  private getSizeOptionPx = (option: IDropdownOption): number => {
    // Preferred source: explicit numeric metadata.
    const value = option.data?.px;
    if (typeof value === 'number' && !Number.isNaN(value)) {
      return value;
    }

    // Fallback: parse displayed text value.
    const textValue = parseInt(option.text?.toString() || '', 10);
    // Invalid values are pushed to the end of the list.
    return Number.isNaN(textValue) ? Number.MAX_SAFE_INTEGER : textValue;
  }

  /**
   * Extracts distinct font sizes (px) from the custom style configuration.
   */
  private getCustomStyleFontSizesPx = (): number[] => {
    const customStyles = this.props.customStyles;
    if (!customStyles) {
      return [];
    }

    const fontSizesPx = new Set<number>();

    Object.values(customStyles).forEach((style) => {
      const fontSize = style?.fontSize;
      const fontSizePx = this.parseStyleSizePx(fontSize);

      if (fontSizePx !== undefined) {
        fontSizesPx.add(fontSizePx);
      }
    });

    return Array.from(fontSizesPx);
  }

  /**
   * Builds a deduplicated color list from custom style declarations for
   * either font color or background color.
   */
  private getCustomStyleSwatchColors = (styleKey: 'color' | 'backgroundColor'): ISwatchColor[] => {
    const customStyles = this.props.customStyles;
    if (!customStyles) {
      return [];
    }

    const colorsByValue: Record<string, ISwatchColor> = {};

    Object.values(customStyles).forEach((style) => {
      const colorValue = style?.[styleKey];
      if (typeof colorValue !== 'string' || !colorValue.trim()) {
        return;
      }

      const normalizedColor = colorValue.trim().toLowerCase();
      colorsByValue[normalizedColor] = {
        color: colorValue,
        id: `custom-style-${styleKey}-${normalizedColor.replace(/[^a-z0-9]+/g, '-')}`,
        label: colorValue
      };
    });

    return Object.values(colorsByValue);
  }

  /**
   * Merges multiple color groups into one list and deduplicates by normalized
   * color value, so the picker does not show repeated entries.
   */
  private mergeSwatchColors = (...colorGroups: Array<ISwatchColor[] | undefined>): ISwatchColor[] => {
    const colorsByValue: Record<string, ISwatchColor> = {};

    colorGroups.forEach((group) => {
      group?.forEach((color) => {
        const normalizedColor = color.color.trim().toLowerCase();
        if (!normalizedColor) {
          return;
        }

        colorsByValue[normalizedColor] = color;
      });
    });

    return Object.values(colorsByValue);
  }

  /**
   * Parses a CSS-like font size input into a numeric pixel value.
   * Accepts number inputs or strings such as "18px".
   */
  private parseStyleSizePx = (fontSize: string | number | undefined): number | undefined => {
    if (typeof fontSize === 'number' && !Number.isNaN(fontSize)) {
      return fontSize;
    }

    if (typeof fontSize === 'string') {
      const parsedFontSize = parseInt(fontSize, 10);
      if (!Number.isNaN(parsedFontSize)) {
        return parsedFontSize;
      }
    }

    return undefined;
  }

  /**
   * Scans the rendered editor content and stores non-whitelisted computed
   * font sizes. These values are exposed in the size dropdown so current
   * formatting can still be represented to the user.
   */
  private refreshCustomSizeValuesFromDocument = (): void => {
    const quill = this.props.editor;
    const root = quill?.root as HTMLElement;

    if (!root) {
      return;
    }

    const customSizeValuesPx = new Set<number>();
    const fontSizeElements = [root, ...Array.from(root.querySelectorAll<HTMLElement>('*'))];

    fontSizeElements.forEach((element) => {
      // Read the final computed font size after CSS cascade is applied.
      const computedFontSize = getComputedStyle(element).fontSize;
      const fontSizePx = parseInt(computedFontSize, 10);

      if (Number.isNaN(fontSizePx)) {
        return;
      }

      if (FONT_SIZE_OPTIONS.some((option) => option.data?.px === fontSizePx)) {
        return;
      }

      customSizeValuesPx.add(fontSizePx);
    });

    // Replace the cache atomically to keep updates simple and deterministic.
    this._customSizeValuesPx = customSizeValuesPx;
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
