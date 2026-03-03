import { FormulaEvaluation } from "./FormulaEvaluation";
import { Context } from "./FormulaEvaluation.types";
import { ICustomFormattingNode } from "./ICustomFormatting";
/**
 * A class that provides helper methods for custom formatting
 * See: https://learn.microsoft.com/en-us/sharepoint/dev/declarative-customization/formatting-syntax-reference
 */
export default class CustomFormattingHelper {
    private _formulaEvaluator;
    /**
     * Custom Formatting Helper / Renderer
     * @param formulaEvaluator An instance of FormulaEvaluation used for evaluating expressions in custom formatting
     */
    constructor(formulaEvaluator: FormulaEvaluation);
    /**
     * The Formula Evaluator expects an ASTNode to be passed to it for evaluation. This method converts expressions
     * described by the interface ICustomFormattingExpressionNode to ASTNodes.
     * @param node An ICustomFormattingExpressionNode to be converted to an ASTNode
     */
    private convertCustomFormatExpressionNodes;
    /**
     * Given a single custom formatting expression, node or element, this method evaluates the expression and returns the result
     * @param content An object, expression or literal value to be evaluated
     * @param context A context object containing values / variables to be used in the evaluation
     * @returns
     */
    private evaluateCustomFormatContent;
    renderCustomFormatContent: (node: ICustomFormattingNode, context: Context, rootEl?: boolean) => JSX.Element | string | number;
}
//# sourceMappingURL=CustomFormatting.d.ts.map