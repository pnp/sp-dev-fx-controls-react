export type TokenType = "FUNCTION" | "STRING" | "NUMBER" | "UNARY_MINUS" | "BOOLEAN" | "WORD" | "OPERATOR" | "ARRAY" | "VARIABLE";

export class Token {
    type: TokenType;
    value: string | number;

    constructor(tokenType: TokenType, value: string | number) {
        this.type = tokenType;
        this.value = value;
    }

    toString(): string {
        return `${this.type}: ${this.value}`;
    }
}

export type ArrayNodeValue = (string | number | ArrayNodeValue)[];
export class ArrayLiteralNode {
    elements: ArrayNodeValue;

    constructor(elements: ArrayNodeValue) {
        this.elements = elements; // Store array elements
    }

    evaluate(): ArrayNodeValue {
        // Evaluate array elements and return the array
        const evaluatedElements = this.elements.map((element) => {
            if (element instanceof ArrayLiteralNode) {
                return element.evaluate();
            } else {
                if (
                    typeof element === "string" &&
                    (
                        (element.startsWith("'") && element.endsWith("'")) ||  
                        (element.startsWith('"') && element.endsWith('"'))
                    )
                ) {
                    return element.slice(1, -1);
                } else {
                    return element;
                }
            }
        });
        return evaluatedElements;
    }
}

export type ASTNode = {
    type: string;
    value?: string | number;
    operands?: (ASTNode | ArrayLiteralNode)[];
};

export type Context = { [key: string]: boolean | number | object | string | undefined };

export const ValidFuncNames = [
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