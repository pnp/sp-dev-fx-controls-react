import * as React from "react";
import { Icon } from "office-ui-fabric-react";
import { FormulaEvaluation } from "./FormulaEvaluation";
import { ASTNode } from "./FormulaEvaluation.types";
import { ICustomFormattingExpressionNode, ICustomFormattingNode } from "./ICustomFormatting";

/**
 * A class that provides helper methods for custom formatting
 * See: https://learn.microsoft.com/en-us/sharepoint/dev/declarative-customization/formatting-syntax-reference
 */
export default class CustomFormattingHelper {

    private _formulaEvaluator: FormulaEvaluation;

    /**
     * 
     * @param formulaEvaluator An instance of FormulaEvaluation used for evaluating expressions in custom formatting
     */
    constructor(formulaEvaluator: FormulaEvaluation) {
        this._formulaEvaluator = formulaEvaluator;
    }

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

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private evaluateCustomFormatContent = (content: ICustomFormattingExpressionNode | ICustomFormattingNode | string | number | boolean, context: any): string | number | boolean => {
        if ((typeof content === "string" && content.charAt(0) !== "=") || typeof content === "number") return content;
        if (typeof content === "string" && content.charAt(0) === "=") {
            const result = this._formulaEvaluator.evaluate(content.substring(1), context);
            return result;
        }
        if (typeof content === "object" && (Object.prototype.hasOwnProperty.call(content, "elmType"))) {
            return this.renderCustomFormatContent(content as ICustomFormattingNode, context);
        } else if (typeof content === "object" && (Object.prototype.hasOwnProperty.call(content, "operator"))) {
            const astNode = this.convertCustomFormatExpressionNodes(content as ICustomFormattingExpressionNode);
            const result = this._formulaEvaluator.evaluateASTNode(astNode, context);
            if (typeof result === "object" && Object.prototype.hasOwnProperty.call(result, "elmType")) {
                return this.renderCustomFormatContent(result, context);
            }
            return result;
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public renderCustomFormatContent = (node: ICustomFormattingNode, context: any, rootEl: boolean = false): any => {
        try {
            if (typeof node === "string" || typeof node === "number") return node;
            // txtContent
            let textContent: JSX.Element | string | undefined;
            if (node.txtContent) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                textContent = this.evaluateCustomFormatContent(node.txtContent, context) as any;
            }
            // style 
            const styleProperties = {} as React.CSSProperties;
            if (node.style) {
                for (const styleAttribute in node.style) {
                    if (node.style[styleAttribute]) {
                        styleProperties[styleAttribute] = this.evaluateCustomFormatContent(node.style[styleAttribute], context) as string;
                    }
                }
            }
            // attributes
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const attributes = {} as any;
            if (node.attributes) {
                for (const attribute in node.attributes) {
                    if (node.attributes[attribute]) {
                        let attributeName = attribute;
                        if (attributeName === "class") attributeName = "className";
                        attributes[attributeName] = this.evaluateCustomFormatContent(node.attributes[attribute], context) as string;
                        if (attributeName === "className" && rootEl) {
                            attributes[attributeName] = `${attributes[attributeName]} sp-field-customFormatter`;
                        }
                    }
                }
            }
            // children 
            let children: (JSX.Element | string | number | boolean | undefined)[] = [];
            if (attributes.iconName) {
                const icon = React.createElement(Icon, { iconName: attributes.iconName });
                children.push(icon);
            }
            if (node.children) {
                children = node.children.map(c => this.evaluateCustomFormatContent(c, context));
            }
            // render
            const el = React.createElement(node.elmType, { style: styleProperties, ...attributes }, textContent, ...children);
            return el;
        } catch (error) {
            console.error('Unable to render custom formatted content', error);
            return null;
        }
    }
}