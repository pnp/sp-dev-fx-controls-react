var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import * as React from 'react';
import * as strings from 'ControlStrings';
import styles from './RichTextPropertyPane.module.scss';
import RteColorPicker from './RteColorPicker';
import { IconButton } from '@fluentui/react/lib/Button';
import { Panel, PanelType } from '@fluentui/react/lib/Panel';
import { TooltipHost } from '@fluentui/react/lib/Tooltip';
import { Dropdown } from '@fluentui/react/lib/Dropdown';
import { ThemeColorHelper } from '../../common/utilities/ThemeColorHelper';
var RichTextPropertyPane = /** @class */ (function (_super) {
    __extends(RichTextPropertyPane, _super);
    function RichTextPropertyPane(props) {
        var _this = _super.call(this, props) || this;
        /**
         * On selection changed event handler
         */
        _this.onChangeSelection = function (range, oldRange, source) {
            var quill = _this.props.editor;
            if (quill === undefined || range === undefined) {
                return;
            }
            if (range) {
                var formats = quill.getFormat(range);
                _this.setState({
                    formats: formats
                });
            }
        };
        /**
         * Render the actions group
         */
        _this.renderActionsGroup = function () {
            return (React.createElement("div", { className: styles.propertyPaneGroupField },
                React.createElement("div", { className: "ms-CustomFieldHost" },
                    React.createElement("div", { className: styles.controlsInOneRow },
                        React.createElement(TooltipHost, { content: strings.UndoTitle, id: "undo-propertyPaneButton", calloutProps: { gapSpace: 0 } },
                            React.createElement(IconButton, { onClick: _this.handleUndo, className: styles.propertyPaneButton, "aria-describedby": "undo-propertyPaneButton", iconProps: {
                                    iconName: 'Undo',
                                    style: {
                                        fontSize: '20px'
                                    }
                                } })),
                        React.createElement(TooltipHost, { content: strings.RedoTitle, id: "redo-propertyPaneButton", calloutProps: { gapSpace: 0 } },
                            React.createElement(IconButton, { onClick: _this.handleRedo, className: styles.propertyPaneButton, "aria-describedby": "redo-propertyPaneButton", iconProps: {
                                    iconName: 'Redo',
                                    style: {
                                        fontSize: '20px'
                                    }
                                } })),
                        React.createElement(TooltipHost, { content: strings.ClearFormattingTitle, id: "clearFormatting-button-propertyPaneButton", calloutProps: { gapSpace: 0 } },
                            React.createElement(IconButton, { onClick: _this.handleClearFormatting, className: styles.propertyPaneButton, "aria-describedby": "clearFormatting-button-propertyPaneButton", iconProps: {
                                    iconName: 'ClearFormatting',
                                    style: {
                                        fontSize: '20px'
                                    }
                                } }))))));
        };
        /**
         * Render font styles group
         */
        _this.renderFontStylesGroup = function () {
            var _a;
            var selectedHeader = ((_a = _this.state.formats) === null || _a === void 0 ? void 0 : _a.header) ? _this.state.formats.header : 0;
            return (React.createElement("div", { className: styles.propertyPaneGroupField },
                React.createElement(Dropdown, { label: strings.FontStyleTitle, ariaLabel: strings.FontStyleTitle, selectedKey: selectedHeader, options: [
                        { key: 0, text: strings.HeaderNormalText },
                        { key: 2, text: strings.HeaderH2 },
                        { key: 3, text: strings.HeaderH3 },
                        { key: 4, text: strings.HeaderH4 },
                        { key: 7, text: strings.HeaderBlockQuote }
                    ], onChanged: _this.onChangeHeading })));
        };
        /**
         * Render font size group
         */
        _this.renderFontSizesGroup = function () {
            var _a;
            // get the selected header
            var selectedSize = ((_a = _this.state.formats) === null || _a === void 0 ? void 0 : _a.size) ? _this.state.formats.size : 'large';
            return (React.createElement("div", { className: styles.propertyPaneGroupField },
                React.createElement(Dropdown, { label: strings.FontSizeTitle, ariaLabel: strings.FontSizeTitle, selectedKey: selectedSize, options: [
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
                    ], onChanged: _this.onChangeSize })));
        };
        /**
         * Render inline styles group
         */
        _this.renderInlineStylesGroup = function () {
            return (React.createElement("div", { className: styles.propertyPaneGroupField },
                React.createElement("div", { className: "ms-CustomFieldHost" },
                    React.createElement("div", { className: styles.controlsInOneRow },
                        React.createElement(TooltipHost, { content: strings.BoldTitle, id: "bold-propertyPaneButton", calloutProps: { gapSpace: 0 } },
                            React.createElement(IconButton, { checked: _this.state.formats.bold, onClick: function () { return _this.applyFormat('bold', !_this.state.formats.bold); }, className: styles.propertyPaneButton, "aria-describedby": "bold-propertyPaneButton", iconProps: {
                                    iconName: 'Bold',
                                    style: {
                                        fontSize: '20px'
                                    }
                                } })),
                        React.createElement(TooltipHost, { content: strings.ItalicTitle, id: "italic-propertyPaneButton", calloutProps: { gapSpace: 0 } },
                            React.createElement(IconButton, { checked: _this.state.formats.italic, onClick: function () { return _this.applyFormat('italic', !_this.state.formats.italic); }, className: styles.propertyPaneButton, "aria-describedby": "italic-propertyPaneButton", iconProps: {
                                    iconName: 'Italic',
                                    style: {
                                        fontSize: '20px'
                                    }
                                } })),
                        React.createElement(TooltipHost, { content: strings.UnderlineTitle, id: "underline-propertyPaneButton", calloutProps: { gapSpace: 0 } },
                            React.createElement(IconButton, { checked: _this.state.formats.underline, onClick: function () { return _this.applyFormat('underline', !_this.state.formats.underline); }, className: styles.propertyPaneButton, "aria-describedby": "underline-propertyPaneButton", iconProps: {
                                    iconName: 'Underline',
                                    style: {
                                        fontSize: '20px'
                                    }
                                } })),
                        React.createElement(TooltipHost, { content: strings.StrikethroughTitle, id: "strikethrough-propertyPaneButton", calloutProps: { gapSpace: 0 } },
                            React.createElement(IconButton, { checked: _this.state.formats.strike, onClick: function () { return _this.applyFormat('strike', !_this.state.formats.strike); }, className: styles.propertyPaneButton, "aria-describedby": "strikethrough-propertyPaneButton", iconProps: {
                                    iconName: 'Strikethrough',
                                    style: {
                                        fontSize: '20px'
                                    }
                                } })),
                        React.createElement(TooltipHost, { content: strings.SuperscriptTitle, id: "superscript-propertyPaneButton", calloutProps: { gapSpace: 0 } },
                            React.createElement(IconButton, { checked: _this.state.formats.script === 'super', onClick: function () { return _this.applyFormat('script', _this.state.formats.script === 'super' ? '' : 'super'); }, className: styles.propertyPaneButton, "aria-describedby": "superscript-propertyPaneButton", iconProps: {
                                    iconName: 'Superscript',
                                    style: {
                                        fontSize: '20px'
                                    }
                                } })),
                        React.createElement(TooltipHost, { content: strings.SubscriptTitle, id: "subscript-propertyPaneButton", calloutProps: { gapSpace: 0 } },
                            React.createElement(IconButton, { checked: _this.state.formats.script === 'sub', onClick: function () { return _this.applyFormat('script', _this.state.formats.script === 'sub' ? '' : 'sub'); }, className: styles.propertyPaneButton, "aria-describedby": "subscript-propertyPaneButton", iconProps: {
                                    iconName: 'Subscript',
                                    style: {
                                        fontSize: '20px'
                                    }
                                } }))))));
        };
        /**
         * Render color styles group
         */
        _this.renderColorStylesGroup = function () {
            var color = _this.state.formats.color || ThemeColorHelper.GetThemeColor(styles.NeutralPrimary);
            var backgroundColor = _this.state.formats.background || "rgba(0, 0, 0, 0)";
            /**
             * Add custom colors if passed as a property
             */
            var fontColorGroups = ["themeColors", "standardColors"];
            if (_this.props.customColors)
                fontColorGroups.push('customColors');
            return (React.createElement("div", { className: styles.propertyPaneGroupField },
                React.createElement("div", { className: "ms-CustomFieldHost" },
                    React.createElement("div", { className: styles.controlsInOneRow },
                        React.createElement(RteColorPicker, { colorPickerGroups: fontColorGroups, customColors: _this.props.customColors, buttonLabel: strings.FontColorLabel, id: "fontColor-propertyPaneButton", defaultButtonLabel: strings.AutomaticFontColor, fillThemeColor: true, previewColor: color, selectedColor: color, onColorChanged: _this.handleFillColorChanged, switchToDefaultColor: function () { return _this.handleFillColorChanged(undefined); } }),
                        React.createElement(RteColorPicker, { buttonLabel: strings.HighlightColorLabel, colorPickerGroups: [
                                "highlightColors"
                            ], fillThemeColor: false, onColorChanged: _this.handleHighlightColorChanged, switchToDefaultColor: function () { return _this.handleHighlightColorChanged(undefined); }, previewColor: backgroundColor, defaultButtonLabel: strings.NoColorHighlightColor, selectedColor: backgroundColor, id: "highlightColor-propertyPaneButton" })))));
        };
        /**
         * Render alignment style groups
         */
        _this.renderAlignmentStylesGroup = function () {
            return (React.createElement("div", { className: styles.propertyPaneGroupField },
                React.createElement("div", { className: "ms-CustomFieldHost" },
                    React.createElement("div", { className: styles.controlsInOneRow },
                        React.createElement(TooltipHost, { content: strings.AlignLeft, id: "left-propertyPaneButton", calloutProps: { gapSpace: 0 } },
                            React.createElement(IconButton, { checked: _this.state.formats.align === undefined, onClick: function () { return _this.applyFormat('align', undefined); }, className: styles.propertyPaneButton, "aria-describedby": "left-propertyPaneButton", iconProps: {
                                    iconName: 'AlignLeft',
                                    style: {
                                        fontSize: '20px'
                                    }
                                } })),
                        React.createElement(TooltipHost, { content: strings.AlignCenter, id: "center-propertyPaneButton", calloutProps: { gapSpace: 0 } },
                            React.createElement(IconButton, { checked: _this.state.formats.align === 'center', onClick: function () { return _this.applyFormat('align', 'center'); }, className: styles.propertyPaneButton, "aria-describedby": "center-propertyPaneButton", iconProps: {
                                    iconName: 'AlignCenter',
                                    style: {
                                        fontSize: '20px'
                                    }
                                } })),
                        React.createElement(TooltipHost, { content: strings.AlignRight, id: "right-propertyPaneButton", calloutProps: { gapSpace: 0 } },
                            React.createElement(IconButton, { checked: _this.state.formats.align === 'right', onClick: function () { return _this.applyFormat('align', 'right'); }, className: styles.propertyPaneButton, "aria-describedby": "right-propertyPaneButton", iconProps: {
                                    iconName: 'AlignRight',
                                    style: {
                                        fontSize: '20px'
                                    }
                                } })),
                        React.createElement(TooltipHost, { content: strings.AlignJustify, id: "justify-propertyPaneButton", calloutProps: { gapSpace: 0 } },
                            React.createElement(IconButton, { checked: _this.state.formats.align === 'justify', onClick: function () { return _this.applyFormat('align', 'justify'); }, className: styles.propertyPaneButton, "aria-describedby": "justify-propertyPaneButton", iconProps: {
                                    iconName: 'AlignJustify',
                                    style: {
                                        fontSize: '20px'
                                    }
                                } })),
                        React.createElement(TooltipHost, { content: strings.IncreaseIndentTitle, id: "increaseindent-propertyPaneButton", calloutProps: { gapSpace: 0 } },
                            React.createElement(IconButton, { onClick: function () { return _this.onChangeIndent(1); }, className: styles.propertyPaneButton, "aria-describedby": "increaseindent-propertyPaneButton", iconProps: {
                                    iconName: 'IncreaseIndentText',
                                    style: {
                                        fontSize: '20px'
                                    }
                                } })),
                        React.createElement(TooltipHost, { content: strings.DecreaseIndentTitle, id: "decreaseindent-propertyPaneButton", calloutProps: { gapSpace: 0 } },
                            React.createElement(IconButton, { onClick: function () { return _this.onChangeIndent(-1); }, className: styles.propertyPaneButton, "aria-describedby": "decreaseindent-propertyPaneButton", iconProps: {
                                    iconName: 'DecreaseIndentText',
                                    style: {
                                        fontSize: '20px'
                                    }
                                } }))))));
        };
        /**
         * Render list styles group
         */
        _this.renderListStylesGroup = function () {
            return React.createElement("div", { className: styles.propertyPaneGroupField },
                React.createElement("div", { className: "ms-CustomFieldHost" },
                    React.createElement("div", { className: styles.controlsInOneRow },
                        React.createElement(TooltipHost, { content: strings.ListBullet, id: "bullet-propertyPaneButton", calloutProps: { gapSpace: 0 } },
                            React.createElement(IconButton, { checked: _this.state.formats.list === 'bullet', onClick: function () { return _this.applyFormat('list', 'bullet'); }, className: styles.propertyPaneButton, "aria-describedby": "bullet-propertyPaneButton", iconProps: {
                                    iconName: 'BulletedList',
                                    style: {
                                        fontSize: '20px'
                                    }
                                } })),
                        React.createElement(TooltipHost, { content: strings.ListNumbered, id: "ordered-propertyPaneButton", calloutProps: { gapSpace: 0 } },
                            React.createElement(IconButton, { checked: _this.state.formats.list === 'ordered', onClick: function () { return _this.applyFormat('list', 'ordered'); }, className: styles.propertyPaneButton, "aria-describedby": "ordered-propertyPaneButton", iconProps: {
                                    iconName: 'NumberedList',
                                    style: {
                                        fontSize: '20px'
                                    }
                                } })))));
        };
        /**
         * Render hyperlink styles group
         */
        _this.renderHyperlinkStylesGroup = function () {
            return (React.createElement("div", { className: styles.propertyPaneGroupField },
                React.createElement("div", { className: "ms-CustomFieldHost" },
                    React.createElement("div", { className: styles.controlsInOneRow },
                        React.createElement(TooltipHost, { content: strings.LinkTitle, id: "link-propertyPaneButton", calloutProps: { gapSpace: 0 } },
                            React.createElement(IconButton, { checked: _this.state.formats.link !== undefined, onClick: function () { return _this.props.onLink(); }, className: styles.propertyPaneButton, "aria-describedby": "link-propertyPaneButton", iconProps: {
                                    iconName: 'Link',
                                    style: {
                                        fontSize: '20px'
                                    }
                                } })),
                        React.createElement(TooltipHost, { content: strings.RemoveLinkLabel, id: "unlink-propertyPaneButton", calloutProps: { gapSpace: 0 } },
                            React.createElement(IconButton, { disabled: _this.state.formats.link === undefined, onClick: function () { return _this.applyFormat('link', false); }, className: styles.propertyPaneButton, "aria-describedby": "unlink-propertyPaneButton", iconProps: {
                                    iconName: 'RemoveLink',
                                    style: {
                                        fontSize: '20px'
                                    }
                                } }))))));
        };
        /**
         * Handle fill color change
         */
        _this.handleFillColorChanged = function (color) {
            _this.applyFormat('color', color);
        };
        /**
         * Handle the hightlight color change
         */
        _this.handleHighlightColorChanged = function (color) {
            _this.applyFormat('background', color);
        };
        /**
         * On heading change
         */
        _this.onChangeHeading = function (item) {
            var newHeadingValue = item.key === 0 ? '' : item.key.toString();
            _this.applyFormat("header", newHeadingValue);
        };
        /**
         * On indentation change.
         */
        _this.onChangeIndent = function (direction) {
            var quill = _this.props.editor;
            var current = +(quill.getFormat(quill.getSelection()).indent || 0);
            _this.applyFormat("indent", current + direction);
        };
        /**
         * On size change
         */
        _this.onChangeSize = function (item) {
            var newSizeValue = item.key === 0 ? '' : item.key.toString();
            _this.applyFormat("size", newSizeValue);
        };
        /**
         * Handle the undo action
         */
        _this.handleUndo = function () {
            var quill = _this.props.editor;
            quill.getModule("history").undo();
            setTimeout(function () {
                _this.onChangeSelection(quill.getSelection());
            }, 100);
        };
        /**
         * Handle the clear formatting action
         */
        _this.handleClearFormatting = function () {
            var quill = _this.props.editor;
            var range = quill.getSelection();
            if (range) {
                if (range.length > 0) {
                    quill.removeFormat(range.index, range.length);
                    setTimeout(function () {
                        _this.onChangeSelection(quill.getSelection());
                    }, 100);
                }
            }
        };
        /**
         * Handle the redo action
         */
        _this.handleRedo = function () {
            var quill = _this.props.editor;
            quill.getModule("history").redo();
            setTimeout(function () {
                _this.onChangeSelection(quill.getSelection());
            }, 100);
        };
        /**
         * Navigation render
         */
        _this.handleRenderNavigation = function () {
            return (React.createElement("div", { className: styles.formattingPaneTitle, "aria-hidden": "true" },
                strings.FormattingPaneTitle,
                React.createElement(IconButton, { onClick: function () { return _this.props.onClose(); }, className: styles.propertyPaneClose, iconProps: {
                        iconName: 'Cancel'
                    }, title: strings.CloseButton, ariaLabel: strings.CloseButton })));
        };
        _this.state = {
            formats: {}
        };
        return _this;
    }
    /**
     * componentDidUpdate lifecycle hook
     *
     * @param prevProps
     * @param prevState
     */
    RichTextPropertyPane.prototype.componentDidUpdate = function (prevProps, prevState) {
        // if we're just opening, sync the format choices with the current selection
        if (!prevProps.isOpen && this.props.isOpen) {
            var quill = this.props.editor;
            if (quill === undefined) {
                return;
            }
            var range = quill.getSelection();
            this.onChangeSelection(range, undefined, undefined);
        }
    };
    /**
     * Default React render method
     */
    RichTextPropertyPane.prototype.render = function () {
        return (React.createElement(Panel, { className: styles.richTextPropertyPane, isBlocking: false, isOpen: this.props.isOpen, type: PanelType.smallFixedFar, onDismiss: this.props.onClose, closeButtonAriaLabel: strings.CloseButton, onRenderNavigation: this.handleRenderNavigation, focusTrapZoneProps: {
                forceFocusInsideTrap: false,
                isClickableOutsideFocusTrap: true
            } },
            React.createElement("div", null,
                React.createElement("div", null,
                    React.createElement("div", null,
                        React.createElement("div", { className: styles.propertyPaneGroupContent },
                            this.renderActionsGroup(),
                            this.renderFontStylesGroup(),
                            this.renderFontSizesGroup(),
                            this.renderInlineStylesGroup(),
                            this.renderColorStylesGroup())),
                    React.createElement("div", { className: styles.propertyPaneGroupContent },
                        React.createElement("div", { className: styles.propertyPaneGroupHeaderNoAccordion }, strings.ParagraphSectionTitle),
                        this.renderAlignmentStylesGroup(),
                        this.renderListStylesGroup()),
                    React.createElement("div", { className: styles.propertyPaneGroupContent },
                        React.createElement("div", { className: styles.propertyPaneGroupHeaderNoAccordion }, strings.HyperlinkSectionTitle),
                        this.renderHyperlinkStylesGroup())))));
    };
    /**
     * Apply the new format
     *
     * @param name
     * @param value
     */
    RichTextPropertyPane.prototype.applyFormat = function (name, value) {
        var _this = this;
        var quill = this.props.editor;
        quill.format(name, value);
        setTimeout(function () {
            _this.onChangeSelection(quill.getSelection());
        }, 100);
    };
    return RichTextPropertyPane;
}(React.Component));
export default RichTextPropertyPane;
//# sourceMappingURL=RichTextPropertyPane.js.map