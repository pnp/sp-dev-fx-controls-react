var Token = /** @class */ (function () {
    function Token(tokenType, value) {
        this.type = tokenType;
        this.value = value;
    }
    Token.prototype.toString = function () {
        return "".concat(this.type, ": ").concat(this.value);
    };
    return Token;
}());
export { Token };
var ArrayLiteralNode = /** @class */ (function () {
    function ArrayLiteralNode(elements) {
        this.elements = elements; // Store array elements
    }
    ArrayLiteralNode.prototype.evaluate = function () {
        // Evaluate array elements and return the array
        var evaluatedElements = this.elements.map(function (element) {
            if (element instanceof ArrayLiteralNode) {
                return element.evaluate();
            }
            else {
                if (typeof element === "string" &&
                    ((element.startsWith("'") && element.endsWith("'")) ||
                        (element.startsWith('"') && element.endsWith('"')))) {
                    return element.slice(1, -1);
                }
                else {
                    return element;
                }
            }
        });
        return evaluatedElements;
    };
    return ArrayLiteralNode;
}());
export { ArrayLiteralNode };
export var ValidFuncNames = [
    "if",
    "ternary",
    "Number",
    "abs",
    "floor",
    "ceiling",
    "pow",
    "cos",
    "sin",
    "indexOf",
    "lastIndexOf",
    "toString",
    "join",
    "substring",
    "toUpperCase",
    "toLowerCase",
    "startsWith",
    "endsWith",
    "replaceAll",
    "replace",
    "padStart",
    "padEnd",
    "split",
    "toDateString",
    "toDate",
    "toLocaleString",
    "toLocaleDateString",
    "toLocaleTimeString",
    "getDate",
    "getMonth",
    "getYear",
    "addDays",
    "addMinutes",
    "getUserImage",
    "getThumbnailImage",
    "indexOf",
    "length",
    "appendTo",
    "removeFrom",
    "loopIndex"
];
//# sourceMappingURL=FormulaEvaluation.types.js.map