import { IContext } from "../Interfaces";
import { ASTNode, ArrayLiteralNode, ArrayNodeValue, Context, Token } from "./FormulaEvaluation.types";
export declare class FormulaEvaluation {
    private webUrl;
    private _meEmail;
    constructor(context?: IContext, webUrlOverride?: string);
    /** Evaluates a formula expression and returns the result, with optional context object for variables */
    evaluate(expression: string, context?: Context): boolean | string | number | ArrayNodeValue | object;
    /** Tokenizes an expression into a list of tokens (primatives, operators, variables, function names, arrays etc) */
    tokenize(expression: string, context?: Context): Token[];
    shuntingYard(tokens: Token[]): Token[];
    buildAST(postfixTokens: Token[]): ASTNode;
    evaluateASTNode(node: ASTNode | ArrayLiteralNode | ArrayNodeValue | string | number, context?: Context): boolean | number | string | ArrayNodeValue | object;
    validate(expression: string): boolean;
    /** Returns a precedence value for a token or operator */
    private getPrecedence;
    private _getFnArity;
    private _getSharePointThumbnailUrl;
    private _getUserImageUrl;
}
//# sourceMappingURL=FormulaEvaluation.d.ts.map