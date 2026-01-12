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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import * as React from 'react';
import * as strings from 'ControlStrings';
import 'react-quill/dist/quill.snow.css';
import RichTextPropertyPane from './RichTextPropertyPane';
import ReactQuill, { Quill as ReactQuillInstance } from 'react-quill';
import styles from './RichText.module.scss';
import { Guid } from '@microsoft/sp-core-library';
import * as telemetry from '../../common/telemetry';
import isEqual from 'lodash/isEqual';
import { IconButton } from '@fluentui/react/lib/Button';
import { TooltipHost } from '@fluentui/react/lib/Tooltip';
import { Dialog, DialogType, DialogFooter } from '@fluentui/react/lib/Dialog';
import { TextField } from '@fluentui/react/lib/TextField';
import { Link } from '@fluentui/react/lib/Link';
import { PrimaryButton, DefaultButton } from '@fluentui/react/lib/Button';
import { Dropdown } from '@fluentui/react/lib/Dropdown';
import { Icon } from '@fluentui/react/lib/Icon';
import { css, elementContains } from '@fluentui/react/lib/Utilities';
import { initializeIcons } from '@fluentui/react/lib/Icons';
import { Label } from '@fluentui/react/lib/Label';
var TOOLBARPADDING = 28;
var CONTAINER_CLASS = 'pnp-richtext-quill-container';
/**
 * Creates a rich text editing control that mimics the out-of-the-box
 * SharePoint Rich Text control.
 * NOTE:
 * Quill.js has a few quirks that we can't work around
 * - Block quotes only work on single lines. This is a frequently-requested feature with Quill that isn't available yet.
 * - Tables aren't supported yet. I'll gladly add table formatting support if users request it.
 */
initializeIcons();
var RichText = /** @class */ (function (_super) {
    __extends(RichText, _super);
    function RichText(props) {
        var _a;
        var _this = _super.call(this, props) || this;
        _this._quillElem = undefined;
        _this._wrapperRef = undefined;
        _this._propertyPaneRef = undefined;
        _this._toolbarId = undefined;
        _this._richTextId = undefined;
        _this.ddStyleOpts = [
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
        _this.ddAlignOpts = [
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
        _this.ddListOpts = [
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
         * Returns a handle to the Quill editor
         */
        _this.getEditor = function () {
            try {
                return _this._quillElem.getEditor();
            }
            catch (_a) {
                return undefined;
            }
        };
        /**
         * Renders the "Insert Link" dialog
         */
        _this.renderLinkDialog = function () {
            return (React.createElement(Dialog, { hidden: _this.state.hideDialog, onDismiss: _this.closeDialog, dialogContentProps: {
                    type: DialogType.normal,
                    title: strings.InsertLinkTitle,
                }, modalProps: {
                    className: styles.insertLinkDialog,
                    isBlocking: true,
                    containerClassName: 'ms-dialogMainOverride',
                } },
                React.createElement(TextField, { label: strings.AddressFieldLabel, placeholder: "https://", value: _this.state.insertUrl !== undefined ? _this.state.insertUrl : '', onChange: function (e, newValue) {
                        _this.setState({
                            insertUrl: newValue,
                        });
                    } }),
                React.createElement(TextField, { label: strings.TextToDisplayLabel, value: _this.state.insertUrlText, onChange: function (e, newValue) {
                        if (newValue !== _this.state.insertUrlText) {
                            _this.setState({
                                insertUrlText: newValue,
                            });
                        }
                    } }),
                React.createElement(DialogFooter, { className: styles.actions },
                    React.createElement("div", { className: "ms-Dialog-actionsRight ".concat(styles.actionsRight) },
                        _this.state.selectedUrl && (React.createElement(Link, { className: "".concat(styles.action, " ").concat(styles.unlinkButton), onClick: _this.handleRemoveLink }, strings.RemoveLinkLabel)),
                        React.createElement(PrimaryButton, { className: styles.action, onClick: _this.handleCreateLink, text: strings.SaveButtonLabel, disabled: _this.checkLinkUrl() }),
                        React.createElement(DefaultButton, { className: styles.action, onClick: _this.closeDialog, text: strings.CancelButtonLabel })))));
        };
        /**
         * Renders the "Insert Image" dialog
         */
        _this.renderImageDialog = function () {
            return (React.createElement(Dialog, { hidden: _this.state.hideImageDialog, onDismiss: _this.closeImageDialog, dialogContentProps: {
                    type: DialogType.normal,
                    title: strings.InsertImageTitle,
                }, modalProps: {
                    className: styles.insertLinkDialog,
                    isBlocking: true,
                    containerClassName: 'ms-dialogMainOverride',
                } },
                React.createElement(TextField, { label: strings.AddressFieldLabel, value: _this.state.insertImageUrl !== undefined
                        ? _this.state.insertImageUrl
                        : '', onChange: function (e, newValue) {
                        _this.setState({
                            insertImageUrl: newValue,
                        });
                    } }),
                React.createElement(DialogFooter, { className: styles.actions },
                    React.createElement("div", { className: "ms-Dialog-actionsRight ".concat(styles.actionsRight) },
                        React.createElement(PrimaryButton, { className: styles.action, onClick: _this.handleInsertImage, text: strings.SaveButtonLabel, disabled: _this.checkImageLinkUrl() }),
                        React.createElement(DefaultButton, { className: styles.action, onClick: _this.closeImageDialog, text: strings.CancelButtonLabel })))));
        };
        /**
         * Style trigger events
         */
        _this.onChangeBold = function () {
            var newBoldValue = !_this.state.formats.bold;
            _this.applyFormat('bold', newBoldValue);
        };
        _this.onChangeItalic = function () {
            var newValue = !_this.state.formats.italic;
            _this.applyFormat('italic', newValue);
        };
        _this.onChangeUnderline = function () {
            var newValue = !_this.state.formats.underline;
            _this.applyFormat('underline', newValue);
        };
        _this.onChangeHeading = function (_event, item, _index) {
            var newHeadingValue = item.key === 0 ? '' : item.key.toString();
            _this.applyFormat('header', newHeadingValue);
        };
        _this.onChangeAlign = function (_event, item, _index) {
            var newAlignValue = item.key === 'left' ? false : item.key.toString();
            _this.applyFormat('align', newAlignValue);
        };
        _this.onChangeList = function (_event, item, _index) {
            // if we're already in list mode, toggle off
            var key = item.key;
            var newAlignValue = (key === 'bullet' && _this.state.formats.list === 'bullet') ||
                (key === 'ordered' && _this.state.formats.list === 'ordered')
                ? false
                : key;
            _this.applyFormat('list', newAlignValue);
        };
        /**
         * Displays the insert link dialog
         */
        _this.showInsertLinkDialog = function () {
            var quill = _this.getEditor();
            var range = quill.getSelection();
            var linkText = _this.state.selectedText;
            if (_this.state.selectedUrl !== undefined &&
                _this.state.selectedText === '') {
                var text = _this.state.text;
                var urlStartIndex = text.indexOf(_this.state.selectedUrl);
                var startTextIndex = text.indexOf('>', urlStartIndex) + 1;
                var endTextIndex = text.indexOf('<', startTextIndex);
                var realLength = endTextIndex - startTextIndex;
                linkText = text.substr(startTextIndex, realLength);
                //Find where the link text starts and select that
                var editorText = quill.getText();
                var linkStart = editorText.indexOf(linkText);
                range.index = linkStart;
                range.length = linkText.length;
            }
            _this.setState({
                hideDialog: false,
                insertUrlText: linkText,
                insertUrl: _this.state.selectedUrl,
                selectedRange: range,
            });
        };
        /**
         * Hides the insert link dialog
         */
        _this.closeDialog = function () {
            _this.setState({ hideDialog: true });
        };
        /**
         * Displays the insert link dialog
         */
        _this.showInsertImageDialog = function () {
            var quill = _this.getEditor();
            var range = quill.getSelection();
            _this.setState({
                hideImageDialog: false,
                selectedRange: range,
            });
        };
        /**
         * Hides the insert image dialog
         */
        _this.closeImageDialog = function () {
            _this.setState({
                hideImageDialog: true,
                insertImageUrl: undefined,
            });
        };
        /**
         * When user enters the richtext editor, displays the border
         */
        _this.handleOnFocus = function (range, source, editor) {
            if (!_this.state.editing) {
                _this.setState({ editing: true });
            }
        };
        /**
         * Called when user removes the link
         */
        _this.handleRemoveLink = function () {
            var quill = _this.getEditor();
            quill.format('link', false);
            _this.closeDialog();
        };
        /**
         * Called when user creates a new link
         */
        _this.handleCreateLink = function () {
            var quill = _this.getEditor();
            var range = _this.state.selectedRange;
            var cursorPosition = range.index;
            if (range.length > 0) {
                quill.deleteText(range.index, range.length);
            }
            if (cursorPosition > -1) {
                var textToInsert = _this.state.insertUrlText !== undefined &&
                    _this.state.insertUrlText !== ''
                    ? _this.state.insertUrlText
                    : _this.state.insertUrl;
                var urlToInsert = _this.state.insertUrl;
                quill.insertText(cursorPosition, textToInsert);
                quill.setSelection(cursorPosition, textToInsert.length);
                quill.formatText(cursorPosition, textToInsert.length, 'link', urlToInsert);
            }
            _this.setState({
                hideDialog: true,
                insertUrl: undefined,
                insertUrlText: undefined,
            });
        };
        /**
         * Called when user insert an image
         */
        _this.handleInsertImage = function () {
            var _a = _this.state, insertImageUrl = _a.insertImageUrl, selectedRange = _a.selectedRange;
            try {
                var quill = _this.getEditor();
                var cursorPosition = selectedRange.index;
                quill.insertEmbed(cursorPosition, 'image', insertImageUrl, 'user');
                _this.setState({
                    insertImageUrl: undefined,
                    hideImageDialog: true,
                });
            }
            catch (_b) {
                //Close the image dialog if something went wrong
                _this.setState({
                    insertImageUrl: undefined,
                    hideImageDialog: true,
                });
            }
        };
        /**
         * Disable Save-button if hyperlink is undefined or empty
         * This prevents the user of adding an empty hyperlink
         */
        _this.checkLinkUrl = function () {
            if (_this.state.insertUrl !== undefined && _this.state.insertUrl !== '') {
                return false;
            }
            return true;
        };
        /**
         * Disable Save-button if hyperlink for the imported image is undefined or empty
         * This prevents the user of adding an empty image
         */
        _this.checkImageLinkUrl = function () {
            if (_this.state.insertImageUrl !== undefined &&
                _this.state.insertImageUrl !== '') {
                return false;
            }
            return true;
        };
        /**
         * Called when richtext selection changes
         */
        _this.handleChangeSelection = function (range, oldRange, source) {
            var quill = _this.getEditor();
            try {
                if (quill) {
                    // Get the selected text
                    var selectedText = quill.getText(range);
                    // Get the current format
                    var formats = quill.getFormat(range);
                    // Get the currently selected url
                    var selectedUrl = formats.link ? formats.link : undefined;
                    _this.setState({
                        selectedText: selectedText,
                        selectedUrl: selectedUrl,
                        formats: formats,
                    });
                    if (_this._propertyPaneRef && _this.state.morePaneVisible) {
                        _this._propertyPaneRef.onChangeSelection(range, oldRange, source);
                    }
                }
            }
            catch (_a) {
                // no-op;
            }
        };
        /**
         * Called when user clicks on the close icon
         */
        _this.handleClosePanel = function () {
            _this.closePanel();
        };
        /**
         * Closes the panel
         */
        _this.closePanel = function () {
            _this.setState({ morePaneVisible: false });
        };
        /**
         * Called when user clicks on the more button
         */
        _this.handleShowMore = function () {
            _this.setState({
                morePaneVisible: !_this.state.morePaneVisible,
            }, function () {
                _this.getEditor().focus();
            });
        };
        /**
         * Called when user changes the text of the editor
         */
        _this.handleChange = function (value) {
            var onChange = _this.props.onChange;
            var newState = {}; // eslint-disable-line @typescript-eslint/no-explicit-any
            var quill = _this.getEditor();
            if (quill) {
                var range = quill.getSelection();
                if (range) {
                    var formats = quill.getFormat(range);
                    if (!isEqual(formats, _this.state.formats)) {
                        console.log("current format: ".concat(formats.list));
                        newState.formats = formats;
                    }
                }
            }
            // do we need to pass this to a handler?
            if (onChange) {
                // yes, get the changed text from the handler
                var newText = onChange(value);
                newState.text = newText;
            }
            else {
                // no, write the text to the state
                newState.text = value;
            }
            _this.setState(__assign({}, newState));
        };
        /**
         * Keeps track of whether we clicked outside the element
         */
        _this.handleClickOutside = function (event) {
            var outside = !elementContains(_this._wrapperRef, event.target);
            // Did we click outside?
            if (outside) {
                // If we are currently editing, stop editing
                // -- unless we're using the property pane or the dialog
                if (_this.state.editing) {
                    _this.setState({
                        editing: false,
                    });
                }
            }
            else {
                // We clicked inside
                if (!_this.state.editing) {
                    // if we aren't currently editing, start editing
                    _this.setState({ editing: true });
                }
            }
        };
        /**
         * Links to the quill reference
         */
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        _this.linkQuill = function (e) {
            _this._quillElem = e;
        };
        /**
         * Links to the property pane element
         */
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        _this.linkPropertyPane = function (e) {
            _this._propertyPaneRef = e;
        };
        /**
         * Renders the label above the rich text (if specified)
         */
        _this.onRenderLabel = function () {
            var label = _this.props.label;
            if (label) {
                return React.createElement(Label, { htmlFor: _this._richTextId }, label);
            }
            return null;
        };
        telemetry.track('ReactRichText', {
            className: !!props.className,
        });
        _this.state = {
            text: _this.props.value,
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
        _this._toolbarId = 'toolbar_' + Guid.newGuid().toString();
        // Get a unique rich text id if not provided by props
        _this._richTextId = (_a = props.id) !== null && _a !== void 0 ? _a : 'richText_' + Guid.newGuid().toString();
        return _this;
    }
    /**
     * Attaches to mouse down events to determine if we clicked outside
     */
    RichText.prototype.componentDidMount = function () {
        // If we're in edit mode, attach the mouse down event
        if (this.props.isEditMode) {
            document.addEventListener('click', this.handleClickOutside);
            document.addEventListener('focus', this.handleClickOutside);
            var domRect = this._wrapperRef.getBoundingClientRect();
            var parentDomRect = this._wrapperRef.parentElement.getBoundingClientRect();
            var toolbarTop = domRect.top - parentDomRect.top - TOOLBARPADDING;
            this.setState({
                wrapperTop: toolbarTop,
            });
        }
    };
    /**
     * Removes the mouse down event
     */
    RichText.prototype.componentWillUnmount = function () {
        // If we were in edit mode, remove the mouse down handler
        if (this.props.isEditMode) {
            document.removeEventListener('click', this.handleClickOutside);
            document.removeEventListener('focus', this.handleClickOutside);
        }
    };
    /**
     * If we're switching from non-edit mode to edit mode, attach mouse down event
     * If we're going from edit mode to non-edit mode, remove mouse down event
     * @param prevProps
     * @param prevState
     */
    RichText.prototype.componentDidUpdate = function (prevProps, prevState) {
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
    };
    /**
     * shouldComponentUpdate lifecycle hook
     *
     * @param nextProps
     * @param nextState
     */
    RichText.prototype.shouldComponentUpdate = function (nextProps, nextState) {
        // Checks if the value coming in is the same
        if (isEqual(nextState, this.state) && isEqual(nextProps, this.props)) {
            return false;
        }
        return true;
    };
    RichText.prototype.UNSAFE_componentWillReceiveProps = function (nextProps) {
        if (nextProps.value !== this.props.value &&
            nextProps.value !== this.state.text) {
            this.setState({
                text: nextProps.value,
            });
        }
    };
    /**
     * Render style option
     *
     * @param option
     */
    RichText.prototype.onRenderStyleOption = function (option) {
        var _a;
        return (React.createElement(TooltipHost, { content: option.text, id: "".concat(option.text, "-toolbarButton"), calloutProps: { gapSpace: 0 } },
            React.createElement("div", { className: "".concat(styles.toolbarDropDownOption, " ").concat(((_a = option.data) === null || _a === void 0 ? void 0 : _a.className) ? option.data.className : ''), "aria-describedby": "".concat(option.text, "-toolbarButton") },
                React.createElement("span", null, option.text))));
    };
    /**
     * Render the title of the style dropdown
     *
     * @param options
     */
    RichText.prototype.onRenderStyleTitle = function (options) {
        var option = options[0];
        return (React.createElement(TooltipHost, { content: option.text, id: "".concat(option.text, "-dropDownTitle"), calloutProps: { gapSpace: 0 } },
            React.createElement("div", { className: styles.toolbarSubmenuDisplayButton, "aria-describedby": "".concat(option.text, "-dropDownTitle") },
                React.createElement("span", null, option.text))));
    };
    /**
     * Render align option
     *
     * @param option
     */
    RichText.prototype.onRenderAlignOption = function (option) {
        var _a;
        return (React.createElement(TooltipHost, { content: option.text, id: "".concat(option.text, "-toolbarButton"), calloutProps: { gapSpace: 0 } },
            React.createElement("div", { className: "".concat(styles.toolbarDropDownOption, " ").concat(((_a = option.data) === null || _a === void 0 ? void 0 : _a.className) ? option.data.className : ''), "aria-describedby": "".concat(option.text, "-toolbarButton") },
                React.createElement(Icon, { className: styles.toolbarDropDownIcon, iconName: option.data.icon, "aria-hidden": "true" }))));
    };
    /**
     * Render the list dropdown title
     *
     * @param options
     */
    RichText.prototype.onRenderListTitle = function (options) {
        var option = options[0];
        return (React.createElement(TooltipHost, { content: option.text, id: "".concat(option.text, "-dropDownTitle"), calloutProps: { gapSpace: 0 } },
            React.createElement("div", { className: styles.toolbarSubmenuDisplayButton, "aria-describedby": "".concat(option.text, "-dropDownTitle") },
                React.createElement(Icon, { className: styles.toolbarDropDownTitleIcon, iconName: option.data.icon, "aria-hidden": "true" }))));
    };
    /**
     * Render the title of the align dropdown
     *
     * @param options
     */
    RichText.prototype.onRenderAlignTitle = function (options) {
        var option = options[0];
        return (React.createElement(TooltipHost, { content: option.text, id: "".concat(option.text, "-dropDownTitle"), calloutProps: { gapSpace: 0 } },
            React.createElement("div", { className: styles.toolbarSubmenuDisplayButton, "aria-describedby": "".concat(option.text, "-dropDownTitle") },
                React.createElement(Icon, { className: styles.toolbarDropDownTitleIcon, iconName: option.data.icon, "aria-hidden": "true" }))));
    };
    /**
     * Render list dropdown option
     *
     * @param option
     */
    RichText.prototype.onRenderListOption = function (option) {
        var _a;
        return (React.createElement(TooltipHost, { content: option.text, id: "".concat(option.text, "-toolbarButton"), calloutProps: { gapSpace: 0 } },
            React.createElement("div", { className: "".concat(styles.toolbarDropDownOption, " ").concat(((_a = option.data) === null || _a === void 0 ? void 0 : _a.className) ? option.data.className : ''), "aria-describedby": "".concat(option.text, "-toolbarButton") },
                React.createElement(Icon, { className: styles.toolbarDropDownIcon, iconName: option.data.icon, "aria-hidden": "true" }))));
    };
    /**
     * Render the list dropdown placeholder
     */
    RichText.prototype.onRenderListPlaceholder = function () {
        return (React.createElement(TooltipHost, { content: 'Placeholder', id: "Placeholder-dropDownTitle", calloutProps: { gapSpace: 0 } },
            React.createElement("div", { className: styles.toolbarSubmenuDisplayButton, "aria-describedby": "Placeholder-dropDownTitle" },
                React.createElement(Icon, { className: styles.toolbarDropDownTitleIcon, iconName: 'BulletedList', "aria-hidden": "true" }))));
    };
    /**
     * Renders the Rich Text Editor
     */
    RichText.prototype.render = function () {
        var _this = this;
        var _a, _b;
        var text = this.state.text;
        var isEditMode = this.props.isEditMode;
        var renderLabel = (_a = (this.props.onRenderLabel && this.props.onRenderLabel(this.props))) !== null && _a !== void 0 ? _a : this.onRenderLabel();
        // If we're not in edit mode, display read-only version of the html
        if (!isEditMode) {
            return (React.createElement(React.Fragment, null,
                renderLabel,
                React.createElement("div", { id: this._richTextId, className: css('ql-editor', styles.richtext, this.props.className || null), dangerouslySetInnerHTML: { __html: text } })));
        }
        // Okay, we're in edit mode.
        var _c = this.props, placeholder = _c.placeholder, style = _c.style, _d = _c.styleOptions, showStyles = _d.showStyles, showBold = _d.showBold, showItalic = _d.showItalic, showUnderline = _d.showUnderline, showAlign = _d.showAlign, showList = _d.showList, showLink = _d.showLink, showMore = _d.showMore, showImage = _d.showImage;
        // Get a unique id for the toolbar
        var modules = {
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
        var font = ReactQuillInstance.import('formats/font');
        font.whitelist = ['Segoe UI'];
        ReactQuillInstance.register(font, true);
        // Set headers and add blockquote capability
        var header = ReactQuillInstance.import('formats/header');
        header.tagName = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'blockquote'];
        ReactQuillInstance.register(header, true);
        // Add the SharePoint font sizes
        var sizeClass = ReactQuillInstance.import('formats/size');
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
        return (React.createElement("div", { className: css(CONTAINER_CLASS) },
            React.createElement("div", { ref: function (ref) {
                    _this._wrapperRef = ref;
                }, className: css(styles.richtext && this.state.editing ? 'ql-active' : null, this.props.className || null) || null, style: style },
                renderLabel,
                React.createElement("div", { id: this._toolbarId, style: { top: this.state.wrapperTop } },
                    showStyles && (React.createElement(Dropdown, { id: "DropDownStyles", className: "".concat(styles.headerDropDown, " ").concat(styles.toolbarDropDown), onRenderCaretDown: function () { return (React.createElement(Icon, { className: styles.toolbarSubmenuCaret, iconName: "CaretDownSolid8" })); }, selectedKey: this.state.formats.header || 0, options: this.ddStyleOpts, onChange: this.onChangeHeading, onRenderOption: this.onRenderStyleOption, onRenderTitle: this.onRenderStyleTitle })),
                    showBold && (React.createElement(TooltipHost, { content: strings.BoldTitle, id: "bold-richtextbutton", calloutProps: { gapSpace: 0 } },
                        React.createElement(IconButton, { iconProps: { iconName: 'Bold' }, "aria-describedby": "bold-richtextbutton", checked: this.state.formats.bold, onClick: this.onChangeBold }))),
                    showItalic && (React.createElement(TooltipHost, { content: strings.ItalicTitle, id: "italic-richtextbutton", calloutProps: { gapSpace: 0 } },
                        React.createElement(IconButton, { iconProps: { iconName: 'Italic' }, "aria-describedby": "italic-richtextbutton", checked: this.state.formats.italic, onClick: this.onChangeItalic }))),
                    showUnderline && (React.createElement(TooltipHost, { content: strings.UnderlineTitle, id: "underline-richtextbutton", calloutProps: { gapSpace: 0 } },
                        React.createElement(IconButton, { iconProps: { iconName: 'Underline' }, "aria-describedby": "underline-richtextbutton", checked: this.state.formats.underline, onClick: this.onChangeUnderline }))),
                    showAlign && (React.createElement(Dropdown, { className: "".concat(styles.toolbarDropDown), id: "DropDownAlign", onRenderCaretDown: function () { return (React.createElement(Icon, { className: styles.toolbarSubmenuCaret, iconName: "CaretDownSolid8" })); }, selectedKey: this.state.formats.align || 'left', options: this.ddAlignOpts, onChange: this.onChangeAlign, onRenderOption: this.onRenderAlignOption, onRenderTitle: this.onRenderAlignTitle })),
                    showList && (React.createElement(Dropdown, { className: styles.toolbarDropDown, id: "DropDownLists", onRenderCaretDown: function () { return (React.createElement(Icon, { className: styles.toolbarSubmenuCaret, iconName: "CaretDownSolid8" })); }, selectedKey: this.state.formats.list, options: this.ddListOpts, 
                        // this option is not available yet
                        notifyOnReselect: true, onChange: this.onChangeList, onRenderOption: this.onRenderListOption, onRenderTitle: this.onRenderListTitle, onRenderPlaceholder: this.onRenderListPlaceholder })),
                    showLink && (React.createElement(TooltipHost, { content: strings.LinkTitle, id: "link-richtextbutton", calloutProps: { gapSpace: 0 } },
                        React.createElement(IconButton, { checked: ((_b = this.state.formats) === null || _b === void 0 ? void 0 : _b.link) !== undefined, onClick: this.showInsertLinkDialog, "aria-describedby": "link-richtextbutton", iconProps: {
                                iconName: 'Link',
                            } }))),
                    showImage && (React.createElement(TooltipHost, { content: strings.ImageTitle, id: "image-richtextbutton", calloutProps: { gapSpace: 0 } },
                        React.createElement(IconButton //checked={this.state.formats!.link !== undefined}
                        , { onClick: this.showInsertImageDialog, "aria-describedby": "image-richtextbutton", iconProps: {
                                iconName: 'PictureFill',
                            } }))),
                    showMore && (React.createElement(TooltipHost, { content: strings.MoreTitle, id: "more-richtextbutton", calloutProps: { gapSpace: 0 } },
                        React.createElement(IconButton, { iconProps: { iconName: 'More' }, "aria-describedby": "more-richtextbutton", onClick: this.handleShowMore })))),
                React.createElement(ReactQuill, { ref: this.linkQuill, id: this._richTextId, placeholder: placeholder, modules: modules, value: text || '', onChange: this.handleChange, onChangeSelection: this.handleChangeSelection, onFocus: this.handleOnFocus }),
                React.createElement(RichTextPropertyPane, { ref: this.linkPropertyPane, editor: this.getEditor(), isOpen: this.state.morePaneVisible, onClose: this.handleClosePanel, onLink: this.showInsertLinkDialog, customColors: this.props.customColors }),
                this.renderLinkDialog(),
                this.renderImageDialog())));
    };
    /**
     * Applies a format to the selection
     * @param name format name
     * @param value format value, or false to unset format
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    RichText.prototype.applyFormat = function (name, value) {
        var _this = this;
        var quill = this.getEditor();
        quill.format(name, value);
        // We use a timeout to ensure that format has been applied and buttons are updated
        setTimeout(function () {
            _this.handleChangeSelection(quill.getSelection(), undefined, undefined);
        }, 100);
    };
    /**
     * Sets default properties
     */
    RichText.defaultProps = {
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
    return RichText;
}(React.Component));
export { RichText };
//# sourceMappingURL=RichText.js.map