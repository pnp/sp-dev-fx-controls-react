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
import * as React from "react";
import { PrimaryButton, DefaultButton } from '@fluentui/react/lib/Button';
import styles from "./Pagination.module.scss";
import isEqual from "lodash/isEqual";
import * as telemetry from '../../common/telemetry';
import { Stack } from "@fluentui/react/lib/Stack";
var Pagination = /** @class */ (function (_super) {
    __extends(Pagination, _super);
    function Pagination(props) {
        var _this = _super.call(this, props) || this;
        _this.preparePaginationElements = function (totalPages) {
            var paginationElementsArray = [];
            for (var i = 0; i < totalPages; i++) {
                paginationElementsArray.push(i + 1);
            }
            return paginationElementsArray;
        };
        _this.onClick = function (page) {
            _this.setState({ currentPage: page });
            _this.props.onChange(page);
        };
        telemetry.track('ReactPagination');
        var paginationElements = _this.preparePaginationElements(props.totalPages);
        _this.state = {
            currentPage: props.currentPage,
            paginationElements: paginationElements,
            limiter: props.limiter ? props.limiter : 3,
        };
        return _this;
    }
    Pagination.prototype.componentDidUpdate = function (prevProps) {
        var _a = this.state, currentPage = _a.currentPage, paginationElements = _a.paginationElements;
        if (prevProps.totalPages !== this.props.totalPages) {
            paginationElements = this.preparePaginationElements(this.props.totalPages);
            currentPage = this.state.currentPage > this.props.totalPages ? this.props.totalPages : this.state.currentPage;
        }
        if (this.props.currentPage !== prevProps.currentPage) {
            currentPage = this.props.currentPage > this.props.totalPages ? this.props.totalPages : this.props.currentPage;
        }
        if (!isEqual(this.state.currentPage, currentPage) || !isEqual(this.state.paginationElements, paginationElements)) {
            this.setState({
                paginationElements: paginationElements,
                currentPage: currentPage
            });
        }
    };
    Pagination.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: "".concat(styles.pagination, " pagination-container") },
            React.createElement(Stack, { horizontal: true, horizontalAlign: "center", verticalAlign: "center", tokens: { childrenGap: 1 }, wrap: true },
                !this.props.hideFirstPageJump &&
                    React.createElement(DefaultButton, { className: "".concat(styles.buttonStyle, " pagination-button pagination-button_first"), onClick: function () { return _this.onClick(1); }, iconProps: { iconName: "DoubleChevronLeft" } }),
                this.state.paginationElements.map(function (pageNumber) { return _this.renderPageNumber(pageNumber); }),
                !this.props.hideLastPageJump &&
                    React.createElement(DefaultButton, { className: "".concat(styles.buttonStyle, " pagination-button pagination-button_last"), onClick: function () { return _this.onClick(_this.props.totalPages); }, iconProps: { iconName: "DoubleChevronRight" } }))));
    };
    Pagination.prototype.renderPageNumber = function (pageNumber) {
        var _this = this;
        var limiterIcon = this.props.limiterIcon;
        var _a = this.state, currentPage = _a.currentPage, limiter = _a.limiter;
        if (pageNumber === currentPage) {
            return (React.createElement(PrimaryButton, { className: styles.buttonStyle, onClick: function () { return _this.onClick(pageNumber); }, text: pageNumber }));
        }
        else {
            if (!(pageNumber < currentPage - limiter || pageNumber > currentPage + limiter)) {
                return (React.createElement(DefaultButton, { className: styles.buttonStyle, onClick: function () { return _this.onClick(pageNumber); }, text: pageNumber }));
            }
            else if (!(pageNumber < currentPage - limiter - 1 || pageNumber > currentPage + limiter + 1)) {
                if (limiterIcon) {
                    return (React.createElement(DefaultButton, { className: styles.buttonStyle, onClick: function () { return _this.onClick(pageNumber); }, iconProps: { iconName: limiterIcon ? limiterIcon : "More" } }));
                }
                else {
                    return (React.createElement(DefaultButton, { className: styles.buttonStyle, onClick: function () { return _this.onClick(pageNumber); }, iconProps: { iconName: limiterIcon ? limiterIcon : "More" } }));
                }
            }
            else {
                return;
            }
        }
    };
    return Pagination;
}(React.Component));
export { Pagination };
//# sourceMappingURL=Pagination.js.map