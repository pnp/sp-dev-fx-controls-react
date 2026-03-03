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
import { cloneDeep } from '@microsoft/sp-lodash-subset';
import { Dropdown } from '@fluentui/react/lib/Dropdown';
import { Spinner, SpinnerSize } from '@fluentui/react/lib/Spinner';
import * as React from 'react';
import * as telemetry from '../../common/telemetry';
import { SPServiceFactory } from '../../services/SPServiceFactory';
import styles from './ListPicker.module.scss';
/**
* Empty list value, to be checked for single list selection
*/
var EMPTY_LIST_KEY = 'NO_LIST_SELECTED';
/**
* Renders the controls for the ListPicker component
*/
var ListPicker = /** @class */ (function (_super) {
    __extends(ListPicker, _super);
    /**
    * Constructor method
    */
    function ListPicker(props) {
        var _this = _super.call(this, props) || this;
        _this._selectedList = null;
        /**
        * Raises when a list has been selected
        * @param option the new selection
        * @param index the index of the selection
        */
        _this.onChanged = function (option, index) {
            var _a = _this.props, multiSelect = _a.multiSelect, onSelectionChanged = _a.onSelectionChanged;
            if (multiSelect === true) {
                // Check if option was selected
                var selectedLists = _this._selectedList ? cloneDeep(_this._selectedList) : [];
                if (option.selected) {
                    selectedLists.push(option.key);
                }
                else {
                    // Filter out the unselected list
                    selectedLists = selectedLists.filter(function (list) { return list !== option.key; });
                }
                _this._selectedList = selectedLists;
            }
            else {
                _this._selectedList = option.key;
            }
            if (onSelectionChanged) {
                onSelectionChanged(cloneDeep(_this._selectedList));
            }
        };
        telemetry.track('ReactListPicker');
        _this.state = {
            options: [],
            loading: false
        };
        return _this;
    }
    /**
    * Lifecycle hook when component is mounted
    */
    ListPicker.prototype.componentDidMount = function () {
        this.loadLists();
    };
    /**
     * componentDidUpdate lifecycle hook
     * @param prevProps
     * @param prevState
     */
    ListPicker.prototype.componentDidUpdate = function (prevProps, prevState) {
        if (prevProps.baseTemplate !== this.props.baseTemplate ||
            prevProps.includeHidden !== this.props.includeHidden ||
            prevProps.orderBy !== this.props.orderBy ||
            prevProps.webAbsoluteUrl !== this.props.webAbsoluteUrl ||
            prevProps.refreshToggle !== this.props.refreshToggle) {
            this.loadLists();
        }
        if (prevProps.selectedList !== this.props.selectedList) {
            this.setSelectedLists();
        }
    };
    /**
    * Loads the list from SharePoint current web site
    */
    ListPicker.prototype.loadLists = function () {
        var _this = this;
        var _a = this.props, context = _a.context, baseTemplate = _a.baseTemplate, includeHidden = _a.includeHidden, orderBy = _a.orderBy, multiSelect = _a.multiSelect, filter = _a.filter, webAbsoluteUrl = _a.webAbsoluteUrl, contentTypeId = _a.contentTypeId;
        // Show the loading indicator and disable the dropdown
        this.setState({ loading: true });
        var service = SPServiceFactory.createService(context, true, 5000, webAbsoluteUrl);
        service.getLibs({
            baseTemplate: baseTemplate,
            includeHidden: includeHidden,
            orderBy: orderBy,
            filter: filter,
            contentTypeId: contentTypeId
        }).then(function (results) {
            var options = [];
            // Start mapping the lists to the dropdown option
            options = results.value.map(function (list) { return ({
                key: list.Id,
                text: list.Title
            }); });
            if (multiSelect !== true) {
                // Add option to unselct list
                options.unshift({
                    key: EMPTY_LIST_KEY,
                    text: ''
                });
            }
            _this.setSelectedLists();
            // Hide the loading indicator and set the dropdown options and enable the dropdown
            _this.setState({
                loading: false,
                options: options
            });
        })
            .catch(function () {
            // no-op;
        });
    };
    /**
     * Set the currently selected list
     */
    ListPicker.prototype.setSelectedLists = function () {
        this._selectedList = cloneDeep(this.props.selectedList);
        this.setState({
            selectedList: this._selectedList
        });
    };
    /**
    * Renders the ListPicker controls with Office UI Fabric
    */
    ListPicker.prototype.render = function () {
        var _a = this.state, loading = _a.loading, options = _a.options, selectedList = _a.selectedList;
        var _b = this.props, className = _b.className, disabled = _b.disabled, multiSelect = _b.multiSelect, label = _b.label, placeHolder = _b.placeHolder, placeholder = _b.placeholder;
        var dropdownOptions = {
            className: className,
            options: options,
            disabled: (loading || disabled),
            label: label,
            placeHolder: placeholder || placeHolder,
            onChanged: this.onChanged
        };
        if (multiSelect === true) {
            dropdownOptions.multiSelect = true;
            dropdownOptions.selectedKeys = selectedList;
        }
        else {
            dropdownOptions.selectedKey = selectedList;
        }
        return (React.createElement("div", { className: styles.listPicker },
            loading && React.createElement(Spinner, { className: styles.spinner, size: SpinnerSize.xSmall }),
            React.createElement(Dropdown, __assign({}, dropdownOptions))));
    };
    return ListPicker;
}(React.Component));
export { ListPicker };
//# sourceMappingURL=ListPicker.js.map