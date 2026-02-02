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
import { Checkbox } from '@fluentui/react/lib/Checkbox';
import styles from './TaxonomyPicker.module.scss';
import TermActionsControl from './termActions/TermActionsControl';
import { UpdateType } from './termActions';
/**
 * Term component
 * Renders a selectable term
 */
var Term = /** @class */ (function (_super) {
    __extends(Term, _super);
    function Term(props) {
        var _this = _super.call(this, props) || this;
        _this.termActionCallback = function (updateAction) {
            if (!updateAction) {
                return;
            }
            if (updateAction.updateActionType === UpdateType.updateTermLabel) {
                _this.setState({
                    termLabel: updateAction.value
                });
            }
            else if (updateAction.updateActionType === UpdateType.hideTerm) {
                _this.setState({
                    hidden: updateAction.value
                });
            }
            else if (updateAction.updateActionType === UpdateType.disableTerm) {
                _this.setState({
                    disabled: updateAction.value
                });
            }
            else if (updateAction.updateActionType === UpdateType.selectTerm) {
                // Only select the term when not disabled or hidden
                if (!_this.state.disabled && !_this.state.hidden) {
                    _this._handleChange(null, updateAction.value);
                }
            }
            else {
                _this.props.updateTaxonomyTree();
            }
        };
        // Check if current term is selected
        var active = _this.props.activeNodes.filter(function (item) { return item.key === _this.props.term.Id; });
        _this.state = {
            selected: active.length > 0,
            termLabel: _this.props.term.Name,
            hidden: false,
            disabled: false
        };
        _this._handleChange = _this._handleChange.bind(_this);
        return _this;
    }
    /**
     * Handle the checkbox change trigger
     */
    Term.prototype._handleChange = function (ev, isChecked) {
        this.setState({
            selected: isChecked
        });
        this.props.changedCallback(this.props.term, isChecked);
    };
    /**
     * Lifecycle event hook when component retrieves new properties
     * @param nextProps
     * @param nextContext
     */
    Term.prototype.UNSAFE_componentWillReceiveProps = function (nextProps, nextContext) {
        var _this = this;
        // If multi-selection is turned off, only a single term can be selected
        //if (!this.props.multiSelection) {
        var active = nextProps.activeNodes.filter(function (item) { return item.key === _this.props.term.Id; });
        this.setState({
            selected: active.length > 0,
            termLabel: this.state.termLabel
        });
        //}
    };
    /**
     * Get the right class name for the term
     */
    Term.prototype.getClassName = function () {
        if (this.props.term.IsDeprecated) {
            return styles.termDisabled;
        }
        if (!this.props.term.IsAvailableForTagging) {
            return styles.termNoTagging;
        }
        return styles.termEnabled;
    };
    /**
     * Default React render
     */
    Term.prototype.render = function () {
        var styleProps = {
            marginLeft: "".concat((this.props.term.PathDepth * 30), "px")
        };
        var checkBoxStyle = {
            display: "inline-flex"
        };
        if (this.state.hidden) {
            return null;
        }
        return (React.createElement("div", null,
            React.createElement("div", { className: "".concat(styles.listItem, " ").concat(styles.term), style: styleProps },
                React.createElement("div", null,
                    React.createElement(Checkbox, { checked: this.state.selected, styles: {
                            checkbox: checkBoxStyle
                        }, disabled: this.props.term.IsDeprecated || !this.props.term.IsAvailableForTagging || this.props.disabled || this.state.disabled, className: this.getClassName(), label: this.state.termLabel, onChange: this._handleChange })),
                this.props.termActions &&
                    React.createElement(TermActionsControl, { term: this.props.term, termActions: this.props.termActions, termActionCallback: this.termActionCallback, spTermService: this.props.spTermService }))));
    };
    return Term;
}(React.Component));
export default Term;
//# sourceMappingURL=Term.js.map