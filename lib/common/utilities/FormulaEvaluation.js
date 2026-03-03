import { ArrayLiteralNode, Token, ValidFuncNames } from "./FormulaEvaluation.types";
var operatorTypes = ["+", "-", "*", "/", "==", "!=", "<>", ">", "<", ">=", "<=", "&&", "||", "%", "&", "|", "?", ":"];
/** Each token pattern matches a particular token type. The tokenizer looks for matches in this order. */
var patterns = [
    [/^\[\$?[a-zA-Z_][a-zA-Z_0-9.]*\]/, "VARIABLE"], // [$variable]
    [/^@[a-zA-Z_][a-zA-Z_0-9.]*/, "VARIABLE"], // @variable
    [/^[0-9]+(?:\.[0-9]+)?/, "NUMBER"], // Numeric literals
    [/^"([^"]*)"/, "STRING"], // Match double-quoted strings
    [/^'([^']*)'/, "STRING"], // Match single-quoted strings
    [/^\[[^\]]*\]/, "ARRAY"], // Array literals
    [new RegExp("^(".concat(ValidFuncNames.join('|'), ")\\(")), "FUNCTION"], // Functions or other words
    [/^(true|false)/, "BOOLEAN"], // Boolean literals
    [/^\w+/, "WORD"], // Other words, checked against valid variables
    [/^&&|^\|\||^==|^<>/, "OPERATOR"], // Operators and special characters (match double first)
    [/^[+\-*/<>=%!&|?:,()[\]]/, "OPERATOR"], // Operators and special characters
];
var FormulaEvaluation = /** @class */ (function () {
    function FormulaEvaluation(context, webUrlOverride) {
        if (context) {
            this._meEmail = context.pageContext.user.email;
        }
        this.webUrl = webUrlOverride || (context === null || context === void 0 ? void 0 : context.pageContext.web.absoluteUrl) || '';
    }
    /** Evaluates a formula expression and returns the result, with optional context object for variables */
    FormulaEvaluation.prototype.evaluate = function (expression, context) {
        if (context === void 0) { context = {}; }
        context.me = this._meEmail;
        context.today = new Date();
        var tokens = this.tokenize(expression, context);
        var postfix = this.shuntingYard(tokens);
        var ast = this.buildAST(postfix);
        return this.evaluateASTNode(ast, context);
    };
    /** Tokenizes an expression into a list of tokens (primatives, operators, variables, function names, arrays etc) */
    FormulaEvaluation.prototype.tokenize = function (expression, context) {
        if (context === void 0) { context = {}; }
        var tokens = [];
        var i = 0;
        while (i < expression.length) {
            var match = null;
            // For each pattern, try to match it from the current position in the expression
            for (var _i = 0, patterns_1 = patterns; _i < patterns_1.length; _i++) {
                var _a = patterns_1[_i], pattern = _a[0], tokenType = _a[1];
                var regexResult = pattern.exec(expression.slice(i));
                if (regexResult) {
                    match = regexResult[1] || regexResult[0];
                    // Unary minus is a special case that we need to 
                    // capture in order to process negative numbers, or 
                    // expressions such as 5 + - 3
                    if (tokenType === "OPERATOR" && match === "-" && (tokens.length === 0 || tokens[tokens.length - 1].type === "OPERATOR")) {
                        tokens.push(new Token("UNARY_MINUS", match));
                        i += match.length + expression.slice(i).indexOf(match);
                    }
                    else if (
                    // String literals, surrounded by single or double quotes
                    tokenType === "STRING") {
                        tokens.push(new Token(tokenType, match));
                        i += match.length + 2;
                    }
                    else if (tokenType === "WORD") {
                        // We only match words if they are a valid variable name
                        if (context && context[match]) {
                            tokens.push(new Token("VARIABLE", match));
                        }
                        i += match.length;
                    }
                    else {
                        // Otherwise, just add the token to the list
                        tokens.push(new Token(tokenType, match));
                        // console.log(`Added token: ${JSON.stringify({tokenType: tokenType, value: match})}`);
                        i += match.length + expression.slice(i).indexOf(match);
                        if (tokenType === "FUNCTION")
                            i -= 1;
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
    };
    FormulaEvaluation.prototype.shuntingYard = function (tokens) {
        /** Stores re-ordered tokens to be returned by this algorithm / method */
        var output = [[]];
        /** Stores tokens temporarily pushed to a stack to help with re-ordering */
        var stack = [[]];
        /** Keeps track of parenthesis depth, important for nested expressions and method signatures */
        var parenDepth = 0;
        for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
            var token = tokens_1[_i];
            // Numbers, strings, booleans, words, variables, and arrays are added to the output
            if (token.type === "NUMBER" || token.type === "STRING" || token.type === "BOOLEAN" || token.type === "WORD" || token.type === "VARIABLE" || token.type === "ARRAY") {
                output[parenDepth].push(token);
                // Functions are pushed to the stack
            }
            else if (token.type === "FUNCTION") {
                stack[parenDepth].push(token);
            }
            else if (token.type === "OPERATOR" || token.type === "UNARY_MINUS") {
                // Left parenthesis are pushed to the stack
                if (token.value === "(") {
                    parenDepth++;
                    stack[parenDepth] = [];
                    output[parenDepth] = [];
                    stack[parenDepth].push(token);
                }
                else if (token.value === ")") {
                    // When Right parenthesis is found, items are popped from stack to output until left parenthesis is found
                    while (stack[parenDepth].length > 0 && stack[parenDepth][stack[parenDepth].length - 1].value !== "(") {
                        output[parenDepth].push(stack[parenDepth].pop());
                    }
                    stack[parenDepth].pop(); // pop the left parenthesis
                    // If the item on top of the stack is a function name, parens were part of method signature, 
                    // pop it to the output
                    if (stack[parenDepth].length > 0 && stack[parenDepth][stack[parenDepth].length - 1].type === "FUNCTION") {
                        output[parenDepth].push(stack[parenDepth].pop());
                    }
                    // Combine outputs
                    output[parenDepth - 1] = output[parenDepth - 1].concat(output[parenDepth]);
                    parenDepth--;
                }
                else if (token.value === ",") {
                    // When comma is found, items are popped from stack to output until left parenthesis is found
                    while (stack[parenDepth].length > 0 && stack[parenDepth][stack[parenDepth].length - 1].value !== "(") {
                        output[parenDepth].push(stack[parenDepth].pop());
                    }
                    // Combine outputs
                    output[parenDepth - 1] = output[parenDepth - 1].concat(output[parenDepth]);
                    output[parenDepth] = [];
                }
                else if (token.value === "?") {
                    while (stack[parenDepth].length > 0 && stack[parenDepth][stack[parenDepth].length - 1].value !== "(") {
                        output[parenDepth].push(stack[parenDepth].pop());
                    }
                    stack[parenDepth].push(token);
                }
                else {
                    // When an operator is found, items are popped from stack to output until an operator with lower precedence is found
                    var currentTokenPrecedence = this.getPrecedence(token.value.toString());
                    while (stack[parenDepth].length > 0) {
                        var topStackIsOperator = stack[parenDepth][stack[parenDepth].length - 1].type === "OPERATOR" || stack[parenDepth][stack[parenDepth].length - 1].type === "UNARY_MINUS";
                        var topStackPrecedence = this.getPrecedence(stack[parenDepth][stack[parenDepth].length - 1].value.toString());
                        if (stack[parenDepth][stack[parenDepth].length - 1].value === "(")
                            break;
                        if (topStackIsOperator && (currentTokenPrecedence.associativity === "left" ?
                            topStackPrecedence.precedence <= currentTokenPrecedence.precedence :
                            topStackPrecedence.precedence < currentTokenPrecedence.precedence)) {
                            break;
                        }
                        output[parenDepth].push(stack[parenDepth].pop());
                    }
                    stack[parenDepth].push(token);
                }
            }
        }
        // When there are no more tokens to read, pop any remaining tokens from the stack to the output
        while (stack[parenDepth].length > 0) {
            output[parenDepth].push(stack[parenDepth].pop());
        }
        // Combine all outputs
        var finalOutput = [];
        for (var i = 0; i <= parenDepth; i++) {
            finalOutput = finalOutput.concat(output[i]);
        }
        return finalOutput;
    };
    FormulaEvaluation.prototype.buildAST = function (postfixTokens) {
        // Tokens are arranged on a stack/array of node objects 
        var stack = [];
        for (var _i = 0, postfixTokens_1 = postfixTokens; _i < postfixTokens_1.length; _i++) {
            var token = postfixTokens_1[_i];
            if (token.type === "STRING" || token.type === "NUMBER" || token.type === "BOOLEAN" || token.type === "VARIABLE") {
                // Strings, numbers, booleans, function names, and variable names are pushed directly to the stack
                stack.push(token);
            }
            else if (token.type === "UNARY_MINUS") {
                // Unary minus has a single operand, we discard the minus token and push an object representing a negative number
                var operand = stack.pop();
                var numericValue = parseFloat(operand.value);
                stack.push({ type: operand.type, value: -numericValue });
            }
            else if (token.type === "OPERATOR") {
                // Operators have two operands, we pop them from the stack and push an object representing the operation
                if (operatorTypes.includes(token.value)) {
                    if (token.value === "?") {
                        // Ternary operator has three operands, and left and right operators should be top of stack
                        var colonOperator = stack.pop();
                        if (colonOperator.operands) {
                            var rightOperand = colonOperator.operands[1];
                            var leftOperand = colonOperator.operands[0];
                            var condition = stack.pop();
                            stack.push({ type: "FUNCTION", value: "ternary", operands: [condition, leftOperand, rightOperand] });
                        }
                    }
                    else {
                        var rightOperand = stack.pop();
                        var leftOperand = stack.pop();
                        stack.push({ type: token.type, value: token.value, operands: [leftOperand, rightOperand] });
                    }
                }
            }
            else if (token.type === "ARRAY") {
                // At this stage, arrays are represented by a single token with a string value ie "[1,2,3]"
                var arrayString = token.value;
                // Remove leading and trailing square brackets
                arrayString = arrayString.slice(1, -1);
                // Split the string by commas and trim whitespace
                var arrayElements = arrayString.split(',').map(function (element) { return element.trim(); });
                stack.push(new ArrayLiteralNode(arrayElements));
            }
            else if (token.type === "FUNCTION") {
                var arity = this._getFnArity(token.value);
                var operands = [];
                while (operands.length < arity) {
                    operands.push(stack.pop());
                }
                stack.push({ type: token.type, value: token.value, operands: operands.reverse() });
            }
        }
        // At this stage, the stack should contain a single node representing the root of the AST
        return stack[0];
    };
    FormulaEvaluation.prototype.evaluateASTNode = function (node, context) {
        var _this = this;
        var _a, _b;
        if (context === void 0) { context = {}; }
        if (!node)
            return 0;
        // If node is an object with a type and value property, it is an ASTNode and should be evaluated recursively
        // otherwise it may actually be an object value that we need to return (as is the case with custom formatting)
        if (typeof node === "object" && !(Object.prototype.hasOwnProperty.call(node, 'type') && Object.prototype.hasOwnProperty.call(node, 'value'))) {
            return node;
        }
        // Each element in an ArrayLiteralNode is evaluated recursively
        if (node instanceof ArrayLiteralNode) {
            var evaluatedElements = node.elements.map(function (element) { return _this.evaluateASTNode(element, context); });
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
            var numVal = Number(node.value);
            if (isNaN(numVal)) {
                throw new Error("Invalid number: ".concat(node.value));
            }
            return numVal;
        }
        // Nodes with a type of BOOLEAN are parsed to a boolean
        if (node.type === "BOOLEAN") {
            return node.value === "true" ? 1 : 0;
        }
        // WORD and STRING nodes are returned as-is
        if (node.type === "WORD" || node.type === "STRING") {
            return (_a = node.value) === null || _a === void 0 ? void 0 : _a.toString();
        }
        // VARIABLE nodes are looked up in the context object and returned
        if (node.type === "VARIABLE") {
            return (_b = context[node.value.replace(/^[[@]?\$?([a-zA-Z_][a-zA-Z_0-9.]*)\]?/, '$1')]) !== null && _b !== void 0 ? _b : null;
        }
        // OPERATOR nodes have their OPERANDS evaluated recursively, with the operator applied to the results
        if (node.type === "OPERATOR" && operatorTypes.includes(node.value) && node.operands) {
            var leftValue = this.evaluateASTNode(node.operands[0], context);
            var rightValue = this.evaluateASTNode(node.operands[1], context);
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
                    var concatString = (leftValue || "").toString() + (rightValue || "").toString();
                    return concatString;
                }
                else {
                    // Throw an error if the operator is not valid for strings
                    throw new Error("Invalid operation ".concat(node.value, " with string operand."));
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
            var funcArgs = node.operands.map(function (arg) { return _this.evaluateASTNode(arg, context); });
            switch (node.value) {
                /**
                 * Logical Functions
                 */
                case 'if':
                case 'ternary': {
                    var condition = funcArgs[0];
                    if (condition !== 0) {
                        return funcArgs[1];
                    }
                    else {
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
                    var basePow = funcArgs[0];
                    var exponentPow = funcArgs[1];
                    return Math.pow(basePow, exponentPow);
                }
                case 'cos': {
                    var angleCos = funcArgs[0];
                    return Math.cos(angleCos);
                }
                case 'sin': {
                    var angleSin = funcArgs[0];
                    return Math.sin(angleSin);
                }
                /**
                 * String Functions
                 */
                case "toString":
                    return funcArgs[0].toString();
                case 'lastIndexOf': {
                    var mainStrLastIndexOf = funcArgs[0];
                    var searchStrLastIndexOf = funcArgs[1];
                    return mainStrLastIndexOf.lastIndexOf(searchStrLastIndexOf);
                }
                case 'join': {
                    var arrayToJoin = node.operands[0].evaluate();
                    var separator = funcArgs[1];
                    return arrayToJoin.join(separator);
                }
                case 'substring': {
                    var mainStrSubstring = funcArgs[0] || '';
                    var start = funcArgs[1] || 0;
                    var end = funcArgs[2] || mainStrSubstring.length;
                    return mainStrSubstring.substr(start, end);
                }
                case 'toUpperCase': {
                    var strToUpper = funcArgs[0] || '';
                    return strToUpper.toUpperCase();
                }
                case 'toLowerCase': {
                    var strToLower = funcArgs[0] || '';
                    return strToLower.toLowerCase();
                }
                case 'startsWith': {
                    var mainStrStartsWith = funcArgs[0];
                    var searchStrStartsWith = funcArgs[1];
                    return mainStrStartsWith.startsWith(searchStrStartsWith);
                }
                case 'endsWith': {
                    var mainStrEndsWith = funcArgs[0];
                    var searchStrEndsWith = funcArgs[1];
                    return mainStrEndsWith.endsWith(searchStrEndsWith);
                }
                case 'replace': {
                    var mainStrReplace = funcArgs[0];
                    var searchStrReplace = funcArgs[1];
                    var replaceStr = funcArgs[2];
                    return mainStrReplace.replace(searchStrReplace, replaceStr);
                }
                case 'replaceAll': {
                    var mainStrReplaceAll = funcArgs[0];
                    var searchStrReplaceAll = funcArgs[1];
                    var replaceAllStr = funcArgs[2];
                    // Using a global regex to simulate replaceAll behavior
                    var globalRegex = new RegExp(searchStrReplaceAll, 'g');
                    return mainStrReplaceAll.replace(globalRegex, replaceAllStr);
                }
                case 'padStart': {
                    var mainStrPadStart = funcArgs[0];
                    var lengthPadStart = funcArgs[1];
                    var padStrStart = funcArgs[2];
                    return mainStrPadStart.padStart(lengthPadStart, padStrStart);
                }
                case 'padEnd': {
                    var mainStrPadEnd = funcArgs[0];
                    var lengthPadEnd = funcArgs[1];
                    var padStrEnd = funcArgs[2];
                    return mainStrPadEnd.padEnd(lengthPadEnd, padStrEnd);
                }
                case 'split': {
                    var mainStrSplit = funcArgs[0];
                    var delimiterSplit = funcArgs[1];
                    return mainStrSplit.split(delimiterSplit);
                }
                /**
                 * Date Functions
                 */
                case 'toDate': {
                    var dateStr = funcArgs[0];
                    return new Date(dateStr);
                }
                case 'toDateString': {
                    var dateToDateString = new Date(funcArgs[0]);
                    return dateToDateString.toDateString();
                }
                case "toLocaleString": {
                    var dateToLocaleString = new Date(funcArgs[0]);
                    return dateToLocaleString.toLocaleString();
                }
                case "toLocaleDateString": {
                    var dateToLocaleDateString = new Date(funcArgs[0]);
                    return dateToLocaleDateString.toLocaleDateString();
                }
                case "toLocaleTimeString": {
                    var dateToLocaleTimeString = new Date(funcArgs[0]);
                    return dateToLocaleTimeString.toLocaleTimeString();
                }
                case 'getDate': {
                    var dateStrGetDate = funcArgs[0];
                    return new Date(dateStrGetDate).getDate();
                }
                case 'getMonth': {
                    var dateStrGetMonth = funcArgs[0];
                    return new Date(dateStrGetMonth).getMonth();
                }
                case 'getYear': {
                    var dateStrGetYear = funcArgs[0];
                    return new Date(dateStrGetYear).getFullYear();
                }
                case 'addDays': {
                    var dateStrAddDays = funcArgs[0];
                    var daysToAdd = funcArgs[1];
                    var dateAddDays = new Date(dateStrAddDays);
                    dateAddDays.setDate(dateAddDays.getDate() + daysToAdd);
                    return dateAddDays;
                }
                case 'addMinutes': {
                    var dateStrAddMinutes = funcArgs[0];
                    var minutesToAdd = funcArgs[1];
                    var dateAddMinutes = new Date(dateStrAddMinutes);
                    dateAddMinutes.setMinutes(dateAddMinutes.getMinutes() + minutesToAdd);
                    return dateAddMinutes;
                }
                /**
                 * SharePoint Functions
                 */
                case 'getUserImage': {
                    var userEmail = funcArgs[0];
                    var userImage = this._getUserImageUrl(userEmail);
                    return userImage;
                }
                case 'getThumbnailImage': {
                    var imageUrl = funcArgs[0];
                    var thumbnailImage = this._getSharePointThumbnailUrl(imageUrl);
                    return thumbnailImage;
                }
                /**
                 * Array Functions
                 */
                case "indexOf": {
                    var array = funcArgs[0];
                    var operand = funcArgs[1];
                    if (Array.isArray(array)) {
                        return array.indexOf(operand);
                    }
                    else if (typeof array === 'string') {
                        return array.indexOf(operand);
                    }
                    return -1; // Default to -1 if not found.
                }
                case "length": {
                    var array = funcArgs[0];
                    if (array instanceof ArrayLiteralNode) {
                        // treat as array literal
                        var value = array.evaluate();
                        return value.length;
                    }
                    else {
                        // treat as char Array
                        var value = this.evaluateASTNode(array, context);
                        return value.toString().length;
                    }
                }
                case 'appendTo': {
                    var mainArrayAppend = node.operands[0].evaluate();
                    var elementToAppend = funcArgs[1];
                    mainArrayAppend.push(elementToAppend);
                    return mainArrayAppend;
                }
                case 'removeFrom': {
                    var mainArrayRemove = node.operands[0].evaluate();
                    var elementToRemove = funcArgs[1];
                    var indexToRemove = mainArrayRemove.indexOf(elementToRemove);
                    if (indexToRemove !== -1) {
                        mainArrayRemove.splice(indexToRemove, 1);
                    }
                    return mainArrayRemove;
                }
                case 'loopIndex':
                    return 0; // This should ideally return the current loop index in context but is not implemented yet
            }
        }
        return 0; // Default fallback
    };
    FormulaEvaluation.prototype.validate = function (expression) {
        var validFunctionRegex = "(".concat(ValidFuncNames.map(function (fn) { return "".concat(fn, "\\("); }).join('|'), ")");
        var pattern = new RegExp("^(?:@\\w+|\\[\\$?[\\w+.]\\]|\\d+(?:\\.\\d+)?|\"(?:[^\"]*)\"|'(?:[^']*)'|".concat(validFunctionRegex, "|[+\\-*/<>=%!&|?:,()\\[\\]]|\\?|:)"));
        /* Explanation -
        /@\\w+/ matches variables specified by the form @variableName.
        /\\[\\$?\\w+\\/] matches variables specified by the forms [variableName] and [$variableName].
        /\\d+(?:\\.\\d+)?/ matches numbers, including decimal numbers.
        /"(?:[^"]*)"/ and /'(?:[^']*)'/ match string literals in double and single quotes, respectively.
        /${validFunctionRegex}/ matches valid function names.
        /\\?/ matches the ternary operator ?.
        /:/ matches the colon :.
        /[+\\-*/ //<>=%!&|?:,()\\[\\]]/ matches operators.
        return pattern.test(expression);
    };
    /** Returns a precedence value for a token or operator */
    FormulaEvaluation.prototype.getPrecedence = function (op) {
        var _a;
        // If the operator is a valid function name, return a high precedence value
        if (ValidFuncNames.indexOf(op) >= 0)
            return { precedence: 7, associativity: "left" };
        // Otherwise, return the precedence value for the operator
        var precedence = {
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
        return (_a = precedence[op]) !== null && _a !== void 0 ? _a : { precedence: 8, associativity: "left" };
    };
    FormulaEvaluation.prototype._getFnArity = function (fnName) {
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
    };
    FormulaEvaluation.prototype._getSharePointThumbnailUrl = function (imageUrl) {
        var filename = imageUrl.split('/').pop();
        var url = imageUrl.replace(filename, '');
        var _a = filename.split('.'), filenameNoExt = _a[0], ext = _a[1];
        return "".concat(url, "_t/").concat(filenameNoExt, "_").concat(ext, ".jpg");
    };
    FormulaEvaluation.prototype._getUserImageUrl = function (userEmail) {
        return "".concat(this.webUrl, "/_layouts/15/userphoto.aspx?size=L&accountname=").concat(userEmail);
    };
    return FormulaEvaluation;
}());
export { FormulaEvaluation };
//# sourceMappingURL=FormulaEvaluation.js.map