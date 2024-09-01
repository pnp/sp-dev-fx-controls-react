import { IContext } from "../Interfaces";
import { ASTNode, ArrayLiteralNode, ArrayNodeValue, Context, Token, TokenType, ValidFuncNames } from "./FormulaEvaluation.types";

const operatorTypes = ["+", "-", "*", "/", "==", "!=", "<>", ">", "<", ">=", "<=", "&&", "||", "%", "&", "|", "?", ":"];

/** Each token pattern matches a particular token type. The tokenizer looks for matches in this order. */
const patterns: [RegExp, TokenType][] = [
    [/^\[\$?[a-zA-Z_][a-zA-Z_0-9.]*\]/, "VARIABLE"],     // [$variable]
    [/^@[a-zA-Z_][a-zA-Z_0-9.]*/, "VARIABLE"],           // @variable
    [/^[0-9]+(?:\.[0-9]+)?/, "NUMBER"],                 // Numeric literals
    [/^"([^"]*)"/, "STRING"],                           // Match double-quoted strings
    [/^'([^']*)'/, "STRING"],                           // Match single-quoted strings
    [/^\[[^\]]*\]/, "ARRAY"],                           // Array literals
    [new RegExp(`^(${ValidFuncNames.join('|')})\\(`), "FUNCTION"], // Functions or other words
    [/^(true|false)/, "BOOLEAN"],                       // Boolean literals
    [/^\w+/, "WORD"],                                   // Other words, checked against valid variables
    [/^&&|^\|\||^==|^<>/, "OPERATOR"],                        // Operators and special characters (match double first)
    [/^[+\-*/<>=%!&|?:,()[\]]/, "OPERATOR"],           // Operators and special characters
];

export class FormulaEvaluation {
    private webUrl: string;
    private _meEmail: string;
    
    constructor(context?: IContext, webUrlOverride?: string) {
        if (context) {
            this._meEmail = context.pageContext.user.email;
        }
        this.webUrl = webUrlOverride || context?.pageContext.web.absoluteUrl || '';
    }

    /** Evaluates a formula expression and returns the result, with optional context object for variables */
    public evaluate(expression: string, context: Context = {}): boolean | string | number | ArrayNodeValue | object {
        context.me = this._meEmail;
        context.today = new Date();
        const tokens: Token[] = this.tokenize(expression, context);
        const postfix: Token[] = this.shuntingYard(tokens);
        const ast: ASTNode = this.buildAST(postfix);
        return this.evaluateASTNode(ast, context);
    }

    /** Tokenizes an expression into a list of tokens (primatives, operators, variables, function names, arrays etc) */
    public tokenize(expression: string, context: Context = {}): Token[] {

        const tokens: Token[] = [];
        let i = 0;

        while (i < expression.length) {
            let match: string | null = null;

            // For each pattern, try to match it from the current position in the expression
            for (const [pattern, tokenType] of patterns) {
                const regexResult = pattern.exec(expression.slice(i));

                if (regexResult) {
                    match = regexResult[1] || regexResult[0];

                    // Unary minus is a special case that we need to 
                    // capture in order to process negative numbers, or 
                    // expressions such as 5 + - 3
                    if (tokenType === "OPERATOR" && match === "-" && (tokens.length === 0 || tokens[tokens.length - 1].type === "OPERATOR")) {
                        tokens.push(new Token("UNARY_MINUS", match));
                        i += match.length + expression.slice(i).indexOf(match);
                    } else if (
                        // String literals, surrounded by single or double quotes
                        tokenType === "STRING"
                    ) {
                        tokens.push(new Token(tokenType, match));
                        i += match.length + 2;
                    } else if (tokenType === "WORD") {
                        // We only match words if they are a valid variable name
                        if (context && context[match]) {
                            tokens.push(new Token("VARIABLE", match));
                        }
                        i += match.length;
                    } else {
                        // Otherwise, just add the token to the list
                        tokens.push(new Token(tokenType, match));
                        // console.log(`Added token: ${JSON.stringify({tokenType: tokenType, value: match})}`);
                        i += match.length + expression.slice(i).indexOf(match);
                        if (tokenType === "FUNCTION") i -= 1;
                    }

                    break;
                }
            }

            if (!match) {
                // If no patterns matched, move to the next character
                // console.log(`No match found for character: ${expression[i]}`);
                i++;
            }
        }

        return tokens;
    }

    public shuntingYard(tokens: Token[]): Token[] {

        /** Stores re-ordered tokens to be returned by this algorithm / method */
        const output: Token[][] = [[]];

        /** Stores tokens temporarily pushed to a stack to help with re-ordering */
        const stack: Token[][] = [[]];

        /** Keeps track of parenthesis depth, important for nested expressions and method signatures */
        let parenDepth = 0;

        for (const token of tokens) {
            // Numbers, strings, booleans, words, variables, and arrays are added to the output
            if (token.type === "NUMBER" || token.type === "STRING" || token.type === "BOOLEAN" || token.type === "WORD" || token.type === "VARIABLE" || token.type === "ARRAY") {
                output[parenDepth].push(token);
                // Functions are pushed to the stack
            } else if (token.type === "FUNCTION") {
                stack[parenDepth].push(token);
            } else if (token.type === "OPERATOR" || token.type === "UNARY_MINUS") {
                // Left parenthesis are pushed to the stack
                if (token.value === "(") {
                    parenDepth++;
                    stack[parenDepth] = [];
                    output[parenDepth] = [];
                    stack[parenDepth].push(token);
                } else if (token.value === ")") {
                    // When Right parenthesis is found, items are popped from stack to output until left parenthesis is found
                    while (stack[parenDepth].length > 0 && stack[parenDepth][stack[parenDepth].length - 1].value !== "(") {
                        output[parenDepth].push(stack[parenDepth].pop() as Token);
                    }
                    stack[parenDepth].pop(); // pop the left parenthesis
                    // If the item on top of the stack is a function name, parens were part of method signature, 
                    // pop it to the output
                    if (stack[parenDepth].length > 0 && stack[parenDepth][stack[parenDepth].length - 1].type === "FUNCTION") {
                        output[parenDepth].push(stack[parenDepth].pop() as Token);
                    }
                    // Combine outputs
                    output[parenDepth - 1] = output[parenDepth - 1].concat(output[parenDepth]);
                    parenDepth--;
                } else if (token.value === ",") {
                    // When comma is found, items are popped from stack to output until left parenthesis is found
                    while (stack[parenDepth].length > 0 && stack[parenDepth][stack[parenDepth].length - 1].value !== "(") {
                        output[parenDepth].push(stack[parenDepth].pop() as Token);
                    }
                    // Combine outputs
                    output[parenDepth - 1] = output[parenDepth - 1].concat(output[parenDepth]);
                    output[parenDepth] = [];
                } else if (token.value === "?") {
                    while (stack[parenDepth].length > 0 && stack[parenDepth][stack[parenDepth].length - 1].value !== "(") {
                        output[parenDepth].push(stack[parenDepth].pop() as Token);
                    }
                    stack[parenDepth].push(token);
                } else {
                    // When an operator is found, items are popped from stack to output until an operator with lower precedence is found
                    const currentTokenPrecedence = this.getPrecedence(token.value.toString());

                    while (stack[parenDepth].length > 0) {
                        const topStackIsOperator = stack[parenDepth][stack[parenDepth].length - 1].type === "OPERATOR" || stack[parenDepth][stack[parenDepth].length - 1].type === "UNARY_MINUS";
                        const topStackPrecedence = this.getPrecedence(stack[parenDepth][stack[parenDepth].length - 1].value.toString());

                        if (stack[parenDepth][stack[parenDepth].length - 1].value === "(") break;
                        if (topStackIsOperator && (
                            currentTokenPrecedence.associativity === "left" ?
                                topStackPrecedence.precedence <= currentTokenPrecedence.precedence :
                                topStackPrecedence.precedence < currentTokenPrecedence.precedence
                        )) {
                            break;
                        }

                        output[parenDepth].push(stack[parenDepth].pop() as Token);
                    }

                    stack[parenDepth].push(token);
                }
            }
        }

        // When there are no more tokens to read, pop any remaining tokens from the stack to the output
        while (stack[parenDepth].length > 0) {
            output[parenDepth].push(stack[parenDepth].pop() as Token);
        }

        // Combine all outputs
        let finalOutput: Token[] = [];
        for (let i = 0; i <= parenDepth; i++) {
            finalOutput = finalOutput.concat(output[i]);
        }

        return finalOutput;
    }

    public buildAST(postfixTokens: Token[]): ASTNode {

        // Tokens are arranged on a stack/array of node objects 
        const stack: (Token | ASTNode | ArrayLiteralNode)[] = [];
        for (const token of postfixTokens) {
            if (token.type === "STRING" || token.type === "NUMBER" || token.type === "BOOLEAN" || token.type === "VARIABLE") {
                // Strings, numbers, booleans, function names, and variable names are pushed directly to the stack
                stack.push(token);
            } else if (token.type === "UNARY_MINUS") {
                // Unary minus has a single operand, we discard the minus token and push an object representing a negative number
                const operand = stack.pop() as ASTNode;
                const numericValue = parseFloat(operand.value as string);
                stack.push({ type: operand.type, value: -numericValue });
            } else if (token.type === "OPERATOR") {
                // Operators have two operands, we pop them from the stack and push an object representing the operation
                if (operatorTypes.includes(token.value as string)) {
                    if (token.value === "?") {
                        // Ternary operator has three operands, and left and right operators should be top of stack
                        const colonOperator = stack.pop() as ASTNode;
                        if (colonOperator.operands) {
                            const rightOperand = colonOperator.operands[1];
                            const leftOperand = colonOperator.operands[0];
                            const condition = stack.pop() as ASTNode;
                            stack.push({ type: "FUNCTION", value: "ternary", operands: [condition, leftOperand, rightOperand] });
                        }
                    } else {
                        const rightOperand = stack.pop() as ASTNode;
                        const leftOperand = stack.pop() as ASTNode;
                        stack.push({ type: token.type, value: token.value, operands: [leftOperand, rightOperand] });
                    }
                }
            } else if (token.type === "ARRAY") {
                // At this stage, arrays are represented by a single token with a string value ie "[1,2,3]"
                let arrayString = token.value as string;
                // Remove leading and trailing square brackets
                arrayString = arrayString.slice(1, -1);
                // Split the string by commas and trim whitespace
                const arrayElements = arrayString.split(',').map(element => element.trim());
                stack.push(new ArrayLiteralNode(arrayElements));
            } else if (token.type === "FUNCTION") {
                const arity = this._getFnArity(token.value as string);
                const operands: ASTNode[] = [];
                while (operands.length < arity) {
                    operands.push(stack.pop() as ASTNode);
                }
                stack.push({ type: token.type, value: token.value, operands: operands.reverse() });
            }
        }

        // At this stage, the stack should contain a single node representing the root of the AST
        return stack[0] as ASTNode;
    }

    public evaluateASTNode(node: ASTNode | ArrayLiteralNode | ArrayNodeValue | string | number, context: Context = {}): 
        boolean | number | string | ArrayNodeValue | object {

        if (!node) return 0;

        // If node is an object with a type and value property, it is an ASTNode and should be evaluated recursively
        // otherwise it may actually be an object value that we need to return (as is the case with custom formatting)
        if (typeof node === "object" && !(Object.prototype.hasOwnProperty.call(node, 'type') && Object.prototype.hasOwnProperty.call(node, 'value'))) {
            return node;
        }

        // Each element in an ArrayLiteralNode is evaluated recursively
        if (node instanceof ArrayLiteralNode) {
            const evaluatedElements = (node as ArrayLiteralNode).elements.map(element => this.evaluateASTNode(element, context));
            return evaluatedElements;
        }

        // If node is an actual array, it has likely already been transformed above
        if (Array.isArray(node)) {
            return node;
        }

        // Number and string literals are returned as-is
        if (typeof node === "number" || typeof node === "string") {
            return node;
        }

        // Nodes with a type of NUMBER are parsed to a number
        if (node.type === "NUMBER") {
            const numVal = Number(node.value);
            if (isNaN(numVal)) {
                throw new Error(`Invalid number: ${node.value}`);
            }
            return numVal;
        }

        // Nodes with a type of BOOLEAN are parsed to a boolean
        if (node.type === "BOOLEAN") {
            return node.value === "true" ? 1 : 0;
        }

        // WORD and STRING nodes are returned as-is
        if (node.type === "WORD" || node.type === "STRING") {
            return node.value?.toString();
        }

        // VARIABLE nodes are looked up in the context object and returned
        if (node.type === "VARIABLE") {
            return context[(node.value as string).replace(/^[[@]?\$?([a-zA-Z_][a-zA-Z_0-9.]*)\]?/, '$1')] ?? null;
        }

        // OPERATOR nodes have their OPERANDS evaluated recursively, with the operator applied to the results
        if (node.type === "OPERATOR" && operatorTypes.includes(node.value as string) && node.operands) {

            const leftValue = this.evaluateASTNode(node.operands[0], context) as string | number;
            const rightValue = this.evaluateASTNode(node.operands[1], context) as string | number;

            // These operators are valid for both string and number operands
            switch (node.value) {
                case "==": return leftValue === rightValue ? 1 : 0;
                case "!=": return leftValue !== rightValue ? 1 : 0;
                case "<>": return leftValue !== rightValue ? 1 : 0;
                case ">": return leftValue > rightValue ? 1 : 0;
                case "<": return leftValue < rightValue ? 1 : 0;
                case ">=": return leftValue >= rightValue ? 1 : 0;
                case "<=": return leftValue <= rightValue ? 1 : 0;
                case "&&": return (leftValue !== 0 && rightValue !== 0) ? 1 : 0;
                case "||": return (leftValue !== 0 || rightValue !== 0) ? 1 : 0;
            }

            if (typeof leftValue === "string" || typeof rightValue === "string") {
                // Concatenate strings if either operand is a string
                if (node.value === "+") {
                    const concatString: string = (leftValue || "").toString() + (rightValue || "").toString();
                    return concatString;
                } else {
                    // Throw an error if the operator is not valid for strings
                    throw new Error(`Invalid operation ${node.value} with string operand.`);
                }
            }

            // Both operands will be numbers at this point
            switch (node.value) {
                case "+": return leftValue + rightValue;
                case "-": return leftValue - rightValue;
                case "*": return leftValue * rightValue;
                case "/": return leftValue / rightValue;
                
                case "%": return leftValue % rightValue;
                case "&": return leftValue & rightValue;
                case "|": return leftValue | rightValue;
            }
        }

        // Evaluation of function nodes is handled here:

        if (node.type === "FUNCTION" && node.operands) {

            // Evaluate operands recursively - casting to any here to allow for any type of operand
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const funcArgs = node.operands.map(arg => this.evaluateASTNode(arg, context)) as any[];

            switch (node.value) {

                /**
                 * Logical Functions
                 */

                case 'if':
                case 'ternary': {
                    const condition = funcArgs[0];
                    if (condition !== 0) {
                        return funcArgs[1];
                    } else {
                        return funcArgs[2];
                    }
                }

                /**
                 * Math Functions
                 */

                case "Number":
                    return Number(funcArgs[0]);
                case "abs":
                    return Math.abs(funcArgs[0]);
                case 'floor':
                    return Math.floor(funcArgs[0]);
                case 'ceiling':
                    return Math.ceil(funcArgs[0]);
                case 'pow': {
                    const basePow = funcArgs[0];
                    const exponentPow = funcArgs[1];
                    return Math.pow(basePow, exponentPow);
                }
                case 'cos': {
                    const angleCos = funcArgs[0];
                    return Math.cos(angleCos);
                }
                case 'sin': {
                    const angleSin = funcArgs[0];
                    return Math.sin(angleSin);
                }

                /**
                 * String Functions
                 */

                case "toString":
                    return funcArgs[0].toString();
                case 'lastIndexOf': {
                    const mainStrLastIndexOf = funcArgs[0];
                    const searchStrLastIndexOf = funcArgs[1];
                    return mainStrLastIndexOf.lastIndexOf(searchStrLastIndexOf);
                }
                case 'join': {
                    const arrayToJoin = (node.operands[0] as ArrayLiteralNode).evaluate();
                    const separator = funcArgs[1];
                    return arrayToJoin.join(separator);
                }
                case 'substring': {
                    const mainStrSubstring = funcArgs[0] || '';
                    const start = funcArgs[1] || 0;
                    const end = funcArgs[2] || mainStrSubstring.length;
                    return mainStrSubstring.substr(start, end);
                }
                case 'toUpperCase': {
                    const strToUpper = funcArgs[0] || '';
                    return strToUpper.toUpperCase();
                }
                case 'toLowerCase': {
                    const strToLower = funcArgs[0] || '';
                    return strToLower.toLowerCase();
                }
                case 'startsWith': {
                    const mainStrStartsWith = funcArgs[0];
                    const searchStrStartsWith = funcArgs[1];
                    return mainStrStartsWith.startsWith(searchStrStartsWith);
                }
                case 'endsWith': {
                    const mainStrEndsWith = funcArgs[0];
                    const searchStrEndsWith = funcArgs[1];
                    return mainStrEndsWith.endsWith(searchStrEndsWith);
                }
                case 'replace': {
                    const mainStrReplace = funcArgs[0];
                    const searchStrReplace = funcArgs[1];
                    const replaceStr = funcArgs[2];
                    return mainStrReplace.replace(searchStrReplace, replaceStr);
                }
                case 'replaceAll': {
                    const mainStrReplaceAll = funcArgs[0];
                    const searchStrReplaceAll = funcArgs[1];
                    const replaceAllStr = funcArgs[2];
                    // Using a global regex to simulate replaceAll behavior
                    const globalRegex = new RegExp(searchStrReplaceAll, 'g');
                    return mainStrReplaceAll.replace(globalRegex, replaceAllStr);
                }
                case 'padStart': {
                    const mainStrPadStart = funcArgs[0];
                    const lengthPadStart = funcArgs[1];
                    const padStrStart = funcArgs[2];
                    return mainStrPadStart.padStart(lengthPadStart, padStrStart);
                }
                case 'padEnd': {
                    const mainStrPadEnd = funcArgs[0];
                    const lengthPadEnd = funcArgs[1];
                    const padStrEnd = funcArgs[2];
                    return mainStrPadEnd.padEnd(lengthPadEnd, padStrEnd);
                }
                case 'split': {
                    const mainStrSplit = funcArgs[0];
                    const delimiterSplit = funcArgs[1];
                    return mainStrSplit.split(delimiterSplit);
                }

                /**
                 * Date Functions
                 */

                case 'toDate': {
                    const dateStr = funcArgs[0];
                    return new Date(dateStr);
                }
                case 'toDateString': {
                    const dateToDateString = new Date(funcArgs[0]);
                    return dateToDateString.toDateString();
                }
                case "toLocaleString": {
                    const dateToLocaleString = new Date(funcArgs[0]);
                    return dateToLocaleString.toLocaleString();
                }
                case "toLocaleDateString": {
                    const dateToLocaleDateString = new Date(funcArgs[0]);
                    return dateToLocaleDateString.toLocaleDateString();
                }
                case "toLocaleTimeString": {
                    const dateToLocaleTimeString = new Date(funcArgs[0]);
                    return dateToLocaleTimeString.toLocaleTimeString();
                }
                case 'getDate': {
                    const dateStrGetDate = funcArgs[0];
                    return new Date(dateStrGetDate).getDate();
                }
                case 'getMonth': {
                    const dateStrGetMonth = funcArgs[0];
                    return new Date(dateStrGetMonth).getMonth();
                }
                case 'getYear': {
                    const dateStrGetYear = funcArgs[0];
                    return new Date(dateStrGetYear).getFullYear();
                }
                case 'addDays': {
                    const dateStrAddDays = funcArgs[0];
                    const daysToAdd = funcArgs[1];
                    const dateAddDays = new Date(dateStrAddDays);
                    dateAddDays.setDate(dateAddDays.getDate() + daysToAdd);
                    return dateAddDays;
                }
                case 'addMinutes': {
                    const dateStrAddMinutes = funcArgs[0];
                    const minutesToAdd = funcArgs[1];
                    const dateAddMinutes = new Date(dateStrAddMinutes);
                    dateAddMinutes.setMinutes(dateAddMinutes.getMinutes() + minutesToAdd);
                    return dateAddMinutes;
                }

                /**
                 * SharePoint Functions
                 */

                case 'getUserImage': {
                    const userEmail = funcArgs[0];
                    const userImage = this._getUserImageUrl(userEmail);
                    return userImage;
                }
                case 'getThumbnailImage': {
                    const imageUrl = funcArgs[0];
                    const thumbnailImage = this._getSharePointThumbnailUrl(imageUrl);
                    return thumbnailImage;
                }

                /** 
                 * Array Functions
                 */

                case "indexOf": {
                    const array = funcArgs[0];
                    const operand = funcArgs[1];
                    if (Array.isArray(array)) {
                        return array.indexOf(operand);
                    } else if (typeof array === 'string') {
                        return array.indexOf(operand);
                    }
                    return -1; // Default to -1 if not found.
                }
                case "length": {
                    const array = funcArgs[0];
                    if (array instanceof ArrayLiteralNode) {
                        // treat as array literal
                        const value = array.evaluate();
                        return value.length;
                    }
                    else {
                        // treat as char Array
                        const value = this.evaluateASTNode(array, context);
                        return value.toString().length;
                    }
                }
                case 'appendTo': {
                    const mainArrayAppend = (node.operands[0] as ArrayLiteralNode).evaluate();
                    const elementToAppend = funcArgs[1];
                    mainArrayAppend.push(elementToAppend);
                    return mainArrayAppend;
                }
                case 'removeFrom': {
                    const mainArrayRemove = (node.operands[0] as ArrayLiteralNode).evaluate();
                    const elementToRemove = funcArgs[1];
                    const indexToRemove = mainArrayRemove.indexOf(elementToRemove);
                    if (indexToRemove !== -1) {
                        mainArrayRemove.splice(indexToRemove, 1);
                    }
                    return mainArrayRemove;
                }
                case 'loopIndex':
                    return 0; // This should ideally return the current loop index in context but is not implemented yet
            }
        }

        return 0;  // Default fallback
    }

    public validate(expression: string): boolean {
        const validFunctionRegex = `(${ValidFuncNames.map(fn => `${fn}\\(`).join('|')})`;
        const pattern = new RegExp(`^(?:@\\w+|\\[\\$?[\\w+.]\\]|\\d+(?:\\.\\d+)?|"(?:[^"]*)"|'(?:[^']*)'|${validFunctionRegex}|[+\\-*/<>=%!&|?:,()\\[\\]]|\\?|:)`);
    
        /* Explanation -
        /@\\w+/ matches variables specified by the form @variableName.
        /\\[\\$?\\w+\\/] matches variables specified by the forms [variableName] and [$variableName].
        /\\d+(?:\\.\\d+)?/ matches numbers, including decimal numbers.
        /"(?:[^"]*)"/ and /'(?:[^']*)'/ match string literals in double and single quotes, respectively.
        /${validFunctionRegex}/ matches valid function names.
        /\\?/ matches the ternary operator ?.
        /:/ matches the colon :.
        /[+\\-*///<>=%!&|?:,()\\[\\]]/ matches operators.
        
        return pattern.test(expression);
    }

    /** Returns a precedence value for a token or operator */
    private getPrecedence(op: string): { precedence: number, associativity: "left" | "right" } {
        
        // If the operator is a valid function name, return a high precedence value
        if (ValidFuncNames.indexOf(op) >= 0) return { precedence: 7, associativity: "left" };
        
        // Otherwise, return the precedence value for the operator
        const precedence: { [key: string]: { precedence: number, associativity: "left" | "right" } } = {
            "+": { precedence: 4, associativity: "left" },
            "-": { precedence: 4, associativity: "left" },
            "*": { precedence: 5, associativity: "left" },
            "/": { precedence: 5, associativity: "left" },
            "%": { precedence: 5, associativity: "left" },
            ">": { precedence: 3, associativity: "left" },
            "<": { precedence: 3, associativity: "left" },
            "==": { precedence: 3, associativity: "left" },
            "!=": { precedence: 3, associativity: "left" },
            "<>": { precedence: 3, associativity: "left" },
            ">=": { precedence: 3, associativity: "left" },
            "<=": { precedence: 3, associativity: "left" },
            "&&": { precedence: 2, associativity: "left" },
            "||": { precedence: 1, associativity: "left" },
            "?": { precedence: 6, associativity: "left" },
            ":": { precedence: 6, associativity: "left" },
            ",": { precedence: 0, associativity: "left" },
        };

        return precedence[op] ?? { precedence: 8, associativity: "left" };
    }

    private _getFnArity(fnName: string): number {
        switch (fnName) {
            case "if":
            case "substring":
            case "replace":
            case "replaceAll":
            case "padStart":
            case "padEnd":
            case "ternary":
                return 3;
            case "pow":
            case "indexOf":
            case "lastIndexOf":
            case "join":
            case "startsWith":
            case "endsWith":
            case "split":
            case "addDays":
            case "addMinutes":
            case "appendTo":
            case "removeFrom":
                return 2;
            default:
                return 1;
        }
    }

    private _getSharePointThumbnailUrl(imageUrl: string): string {
        const filename = imageUrl.split('/').pop();
        const url = imageUrl.replace(filename, '');
        const [filenameNoExt, ext] = filename.split('.');
        return `${url}_t/${filenameNoExt}_${ext}.jpg`;
    }
    private _getUserImageUrl(userEmail: string): string {
        return `${this.webUrl}/_layouts/15/userphoto.aspx?size=L&accountname=${userEmail}`
    }
}


