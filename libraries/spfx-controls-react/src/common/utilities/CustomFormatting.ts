import * as React from "react";
import { Icon } from "@fluentui/react/lib/Icon";
import { FormulaEvaluation } from "./FormulaEvaluation";
import { ASTNode, Context } from "./FormulaEvaluation.types";
import { ICustomFormattingExpressionNode, ICustomFormattingNode } from "./ICustomFormatting";

type CustomFormatResult = string | number | boolean | JSX.Element | ICustomFormattingNode;

/**
 * A class that provides helper methods for custom formatting
 * See: https://learn.microsoft.com/en-us/sharepoint/dev/declarative-customization/formatting-syntax-reference
 */
export default class CustomFormattingHelper {

    private _formulaEvaluator: FormulaEvaluation;

    /**
     * Custom Formatting Helper / Renderer
     * @param formulaEvaluator An instance of FormulaEvaluation used for evaluating expressions in custom formatting
     */
    constructor(formulaEvaluator: FormulaEvaluation) {
        this._formulaEvaluator = formulaEvaluator;
    }

    /**
     * The Formula Evaluator expects an ASTNode to be passed to it for evaluation. This method converts expressions
     * described by the interface ICustomFormattingExpressionNode to ASTNodes.
     * @param node An ICustomFormattingExpressionNode to be converted to an ASTNode
     */
    private convertCustomFormatExpressionNodes = (node: ICustomFormattingExpressionNode | string | number | boolean): ASTNode => {
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
        const operator = node.operator;
        const operands = node.operands.map(o => this.convertCustomFormatExpressionNodes(o));
        return { type: "operator", value: operator, operands };
    }

    /**
     * Given a single custom formatting expression, node or element, this method evaluates the expression and returns the result
     * @param content An object, expression or literal value to be evaluated
     * @param context A context object containing values / variables to be used in the evaluation
     * @returns 
     */
    private evaluateCustomFormatContent = (content: ICustomFormattingExpressionNode | ICustomFormattingNode | string | number | boolean, context: Context): CustomFormatResult => {
        
        // If content is a string or number, it is a literal value and should be returned as-is
        if ((typeof content === "string" && content.charAt(0) !== "=") || typeof content === "number") return content;
        
        // If content is a string beginning with '=' it is a formula/expression, and should be evaluated
        if (typeof content === "string" && content.charAt(0) === "=") {
            const result = this._formulaEvaluator.evaluate(content.substring(1), context);
            return result as CustomFormatResult;
        }
        
        // If content is an object, it is either further custom formatting described by an ICustomFormattingNode,
        // or an expression to be evaluated - as described by an ICustomFormattingExpressionNode

        if (typeof content === "object") {

            if (Object.prototype.hasOwnProperty.call(content, "elmType")) {
                
                // Custom Formatting Content
                return this.renderCustomFormatContent(content as ICustomFormattingNode, context);
    
            } else if (Object.prototype.hasOwnProperty.call(content, "operator")) {
                
                // Expression to be evaluated
                const astNode = this.convertCustomFormatExpressionNodes(content as ICustomFormattingExpressionNode);
                const result = this._formulaEvaluator.evaluateASTNode(astNode, context);
                if (typeof result === "object" && Object.prototype.hasOwnProperty.call(result, "elmType")) {
                    return this.renderCustomFormatContent(result as ICustomFormattingNode, context);
                }
                return result as CustomFormatResult;
    
            }
        } 
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public renderCustomFormatContent = (node: ICustomFormattingNode, context: Context, rootEl: boolean = false): JSX.Element | string | number => {

        // We don't want attempts to render custom format content to kill the component or web part, 
        // so we wrap the entire method in a try/catch block, log errors and return null if an error occurs
        try {

            // If node is a string or number, it is a literal value and should be returned as-is
            if (typeof node === "string" || typeof node === "number") return node;
            
            // Custom formatting nodes / elements may have a txtContent property, which represents the inner
            // content of a HTML element. This can be a string literal, or another expression to be evaluated:
            let textContent: CustomFormatResult | undefined;
            if (node.txtContent) {
                textContent = this.evaluateCustomFormatContent(node.txtContent, context);
            }

            // Custom formatting nodes / elements may have a style property, which contains the style rules
            // to be applied to the resulting HTML element. Rule values can be string literals or another expression
            // to be evaluated:
            const styleProperties: React.CSSProperties = {};
            if (node.style) {
                for (const styleAttribute in node.style) {
                    if (node.style[styleAttribute]) {
                        styleProperties[styleAttribute] = this.evaluateCustomFormatContent(node.style[styleAttribute], context) as string;
                    }
                }
            }

            // Custom formatting nodes / elements may have an attributes property, which represents the HTML attributes
            // to be applied to the resulting HTML element. Attribute values can be string literals or another expression
            // to be evaluated:
            const attributes = {} as Record<string, string>;
            if (node.attributes) {
                for (const attribute in node.attributes) {
                    if (node.attributes[attribute]) {
                        let attributeName = attribute;

                        // Because we're using React to render the HTML content, we need to rename the 'class' attribute
                        if (attributeName === "class") attributeName = "className";

                        // Evaluation
                        attributes[attributeName] = this.evaluateCustomFormatContent(node.attributes[attribute], context) as string;

                        // Add the 'sp-field-customFormatter' class to the root element
                        if (attributeName === "className" && rootEl) {
                            attributes[attributeName] = `${attributes[attributeName]} sp-field-customFormatter`;
                        }
                    }
                }
            }
            
            // Custom formatting nodes / elements may have children. These are likely to be further custom formatting
            let children: (CustomFormatResult)[] = [];
            
            // If the node has an iconName property, we'll render an Icon component as the first child.
            // SharePoint uses CSS to apply the icon in a ::before rule, but we can't count on the global selector for iconName
            // being present on the page, so we'll add it as a child instead:
            if (attributes.iconName) {
                const icon = React.createElement(Icon, { iconName: attributes.iconName });
                children.push(icon);
            }

            // Each child object is evaluated recursively and added to the children array
            if (node.children) {
                children = node.children.map(c => this.evaluateCustomFormatContent(c, context));
            }
            
            // The resulting HTML element is returned to the callee using React.createElement
            const el = React.createElement(node.elmType, { style: styleProperties, ...attributes }, textContent, ...children);
            return el;
        } catch (error) {
            console.error('Unable to render custom formatted content', error);
            return null;
        }
    }
}