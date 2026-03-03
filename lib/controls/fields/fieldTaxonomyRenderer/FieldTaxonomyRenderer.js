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
import { css } from '@fluentui/react/lib/Utilities';
import * as telemetry from '../../../common/telemetry';
import styles from './FieldTaxonomyRenderer.module.scss';
/**
 * Field Taxonomy Renderer.
 * Used for:
 *   - Taxonomy
 */
var FieldTaxonomyRenderer = /** @class */ (function (_super) {
    __extends(FieldTaxonomyRenderer, _super);
    function FieldTaxonomyRenderer(props, state) {
        var _this = _super.call(this, props, state) || this;
        telemetry.track('FieldTaxonomyRenderer', {});
        _this.state = {};
        return _this;
    }
    FieldTaxonomyRenderer.prototype.render = function () {
        var _this = this;
        var termEls = null;
        if (Array.isArray(this.props.terms)) {
            termEls = this.props.terms.map(function (term) {
                return React.createElement("div", { key: term.TermID, className: styles.term, style: _this.props.cssProps },
                    React.createElement("span", null, term.Label));
            });
        }
        else {
            termEls = React.createElement("div", { className: styles.term, style: this.props.cssProps },
                React.createElement("span", null, this.props.terms.Label));
        }
        return (React.createElement("div", { style: this.props.cssProps, className: css(this.props.className) }, termEls));
    };
    return FieldTaxonomyRenderer;
}(React.Component));
export { FieldTaxonomyRenderer };
//# sourceMappingURL=FieldTaxonomyRenderer.js.map