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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import * as React from "react";
import { Icon } from "@fluentui/react/lib/Icon";
/**
 * A class that provides helper methods for custom formatting
 * See: https://learn.microsoft.com/en-us/sharepoint/dev/declarative-customization/formatting-syntax-reference
 */
var CustomFormattingHelper = /** @class */ (function () {
    /**
     * Custom Formatting Helper / Renderer
     * @param formulaEvaluator An instance of FormulaEvaluation used for evaluating expressions in custom formatting
     */
    function CustomFormattingHelper(formulaEvaluator) {
        var _this = this;
        /**
         * The Formula Evaluator expects an ASTNode to be passed to it for evaluation. This method converts expressions
         * described by the interface ICustomFormattingExpressionNode to ASTNodes.
         * @param node An ICustomFormattingExpressionNode to be converted to an ASTNode
         */
        this.convertCustomFormatExpressionNodes = function (node) {
            if (typeof node !== "object") {
                switch (typeof node) {
                    case "string":
                        return { type: "string", value: node };
                    case "number":
                        return { type: "number", value: node };
                    case "boolean":
                        return { type: "booelan", value: node ? 1 : 0 };
                }
            }
            var operator = node.operator;
            var operands = node.operands.map(function (o) { return _this.convertCustomFormatExpressionNodes(o); });
            return { type: "operator", value: operator, operands: operands };
        };
        /**
         * Given a single custom formatting expression, node or element, this method evaluates the expression and returns the result
         * @param content An object, expression or literal value to be evaluated
         * @param context A context object containing values / variables to be used in the evaluation
         * @returns
         */
        this.evaluateCustomFormatContent = function (content, context) {
            // If content is a string or number, it is a literal value and should be returned as-is
            if ((typeof content === "string" && content.charAt(0) !== "=") || typeof content === "number")
                return content;
            // If content is a string beginning with '=' it is a formula/expression, and should be evaluated
            if (typeof content === "string" && content.charAt(0) === "=") {
                var result = _this._formulaEvaluator.evaluate(content.substring(1), context);
                return result;
            }
            // If content is an object, it is either further custom formatting described by an ICustomFormattingNode,
            // or an expression to be evaluated - as described by an ICustomFormattingExpressionNode
            if (typeof content === "object") {
                if (Object.prototype.hasOwnProperty.call(content, "elmType")) {
                    // Custom Formatting Content
                    return _this.renderCustomFormatContent(content, context);
                }
                else if (Object.prototype.hasOwnProperty.call(content, "operator")) {
                    // Expression to be evaluated
                    var astNode = _this.convertCustomFormatExpressionNodes(content);
                    var result = _this._formulaEvaluator.evaluateASTNode(astNode, context);
                    if (typeof result === "object" && Object.prototype.hasOwnProperty.call(result, "elmType")) {
                        return _this.renderCustomFormatContent(result, context);
                    }
                    return result;
                }
            }
        };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.renderCustomFormatContent = function (node, context, rootEl) {
            if (rootEl === void 0) { rootEl = false; }
            // We don't want attempts to render custom format content to kill the component or web part, 
            // so we wrap the entire method in a try/catch block, log errors and return null if an error occurs
            try {
                // If node is a string or number, it is a literal value and should be returned as-is
                if (typeof node === "string" || typeof node === "number")
                    return node;
                // Custom formatting nodes / elements may have a txtContent property, which represents the inner
                // content of a HTML element. This can be a string literal, or another expression to be evaluated:
                var textContent = void 0;
                if (node.txtContent) {
                    textContent = _this.evaluateCustomFormatContent(node.txtContent, context);
                }
                // Custom formatting nodes / elements may have a style property, which contains the style rules
                // to be applied to the resulting HTML element. Rule values can be string literals or another expression
                // to be evaluated:
                var styleProperties = {};
                if (node.style) {
                    for (var styleAttribute in node.style) {
                        if (node.style[styleAttribute]) {
                            styleProperties[styleAttribute] = _this.evaluateCustomFormatContent(node.style[styleAttribute], context);
                        }
                    }
                }
                // Custom formatting nodes / elements may have an attributes property, which represents the HTML attributes
                // to be applied to the resulting HTML element. Attribute values can be string literals or another expression
                // to be evaluated:
                var attributes = {};
                if (node.attributes) {
                    for (var attribute in node.attributes) {
                        if (node.attributes[attribute]) {
                            var attributeName = attribute;
                            // Because we're using React to render the HTML content, we need to rename the 'class' attribute
                            if (attributeName === "class")
                                attributeName = "className";
                            // Evaluation
                            attributes[attributeName] = _this.evaluateCustomFormatContent(node.attributes[attribute], context);
                            // Add the 'sp-field-customFormatter' class to the root element
                            if (attributeName === "className" && rootEl) {
                                attributes[attributeName] = "".concat(attributes[attributeName], " sp-field-customFormatter");
                            }
                        }
                    }
                }
                // Custom formatting nodes / elements may have children. These are likely to be further custom formatting
                var children = [];
                // If the node has an iconName property, we'll render an Icon component as the first child.
                // SharePoint uses CSS to apply the icon in a ::before rule, but we can't count on the global selector for iconName
                // being present on the page, so we'll add it as a child instead:
                if (attributes.iconName) {
                    var icon = React.createElement(Icon, { iconName: attributes.iconName });
                    children.push(icon);
                }
                // Each child object is evaluated recursively and added to the children array
                if (node.children) {
                    children = node.children.map(function (c) { return _this.evaluateCustomFormatContent(c, context); });
                }
                // The resulting HTML element is returned to the callee using React.createElement
                var el = React.createElement.apply(React, __spreadArray([node.elmType, __assign({ style: styleProperties }, attributes), textContent], children, false));
                return el;
            }
            catch (error) {
                console.error('Unable to render custom formatted content', error);
                return null;
            }
        };
        this._formulaEvaluator = formulaEvaluator;
    }
    return CustomFormattingHelper;
}());
export default CustomFormattingHelper;
//# sourceMappingURL=CustomFormatting.js.map