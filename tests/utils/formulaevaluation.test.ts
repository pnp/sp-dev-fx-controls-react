///<reference types="jest" />

import { assert } from "chai";
import { FormulaEvaluation } from "../../src/common/utilities/FormulaEvaluation";
import { ASTNode, Token } from "../../src/common/utilities/FormulaEvaluation.types";

const formulaEvaluation = new FormulaEvaluation();
const validate = formulaEvaluation.validate.bind(formulaEvaluation);
const tokenize = formulaEvaluation.tokenize.bind(formulaEvaluation);
const shuntingYard = formulaEvaluation.shuntingYard.bind(formulaEvaluation);
const buildAST = formulaEvaluation.buildAST.bind(formulaEvaluation);
const evaluateAST = formulaEvaluation.evaluateASTNode.bind(formulaEvaluation);
const evaluate = formulaEvaluation.evaluate.bind(formulaEvaluation);

describe('SharePoint Functionality', () => {
    it('Should get a user image URL from an email address', () => {
        const result = evaluate(`getUserImage('user@contoso.com')`);
        assert.equal(result, `/_layouts/15/userphoto.aspx?size=L&accountname=user@contoso.com`);
    });
    it('Should get a thumbnail image URL from an image file URL', () => {
        const result = evaluate(`getThumbnailImage('https://merseycarenhsuk.sharepoint.com/sites/IM/SiteAssets/CyberAwareness.png')`);
        assert.equal(result, `https://merseycarenhsuk.sharepoint.com/sites/IM/SiteAssets/_t/CyberAwareness_png.jpg`);
    });
});

describe('Validation', () => {
    it('should validate possible expressions', () => {
        assert.isTrue(validate("1 + 2"));
        assert.isTrue(validate("1 + 2 > 3"));
        assert.isTrue(validate("1 + 2 > 3 ? true : false"));
        assert.isTrue(validate("if(1 + 2 > 3, true, false)"));
        assert.isTrue(validate("toDateString(toDate('2023-09-01'))"));
        assert.isFalse(validate("test(abcdef"));
    });
});

describe('Algorithms', () => {
    
    describe('Tokenization', () => {
        it('should tokenize basic expressions', () => {
            const result = tokenize("1 + 2");
            assert.deepEqual(result, [
                new Token("NUMBER", "1"),
                new Token("OPERATOR", "+"),
                new Token("NUMBER", "2")
            ]);
        });
    });

    describe('Shunting Yard', () => {
        it('should convert basic expressions to postfix', () => {
            const result = shuntingYard(tokenize("1 + 2 > 3"));
            assert.deepEqual(result, [
                new Token("NUMBER", "1"),
                new Token("NUMBER", "2"),
                new Token("OPERATOR", "+"),
                new Token("NUMBER", "3"),
                new Token("OPERATOR", ">"),
            ]);
        });
    });

    describe('AST Generation', () => {
        it('should generate AST for basic expressions', () => {
            const tokens = [
                new Token("NUMBER", "1"),
                new Token("NUMBER", "2"),
                new Token("OPERATOR", "+")
            ];
            const ast = buildAST(tokens);
            assert.deepEqual(ast, {
                type: "OPERATOR",
                value: "+",
                operands: [
                    new Token("NUMBER", "1"),
                    new Token("NUMBER", "2")
                ]
            } as ASTNode);
        });
    });

    describe('Evaluation', () => {
        it('should evaluate basic expressions', () => {
            const context = {};
            const ast: ASTNode = {
                type: "OPERATOR",
                value: "+",
                operands: [
                    new Token("NUMBER", "1"),
                    new Token("NUMBER", "2")
                ]
            };
            const result = evaluateAST(ast, context);
            assert.equal(result, 3);
        });
    });
});

describe('Basic Expression Evaluation', () => {
    it('should evaluate a basic expression correctly obeying BODMAS/PEMDAS', () => {
        const result = evaluate("1 + 2 * 3");
        assert.equal(result, 7);
    });
});

describe('Advanced Expression Evaluation', () => {
    it('should evaluate an if expression with basic arithmetic', () => {
        const result = evaluate("if(1 + 2 > 3, true, false)");
        assert.equal(result, false);
    });
    it('should evaluate an if expression with basic arithmetic and variables', () => {
        const context = { x: 2, y: 2, z: 3 };
        const result = evaluate("if([x] + [y] > [z], true, false)", context);
        assert.equal(result, true);
    });
    it('should evaluate a ternary expression with basic arithmetic', () => {
        const result = evaluate("1 + 2 > 3 ? true : false");
        assert.equal(result, false);
    });
    it('should evaluate a complex nested expression (1)', () => {
        const result = evaluate('((1 + 2 * 3) + 3 > 8 ? 5 : 0) == 5 ? 1 : 0');
        assert.equal(result, 1);
    });
    it('should evaluate a complex nested expression (2)', () => {
        const result = evaluate('(cos(1 + 2 * 3) + 3 > 0.5 ? sin(5) : 0) < 0 ? 1 : 0');
        assert.equal(result, 1);
    });
});

describe('Math Expression Evaluation', () => {
    it('Should floor a number', () => {
        const result = evaluate("floor(1.5)");
        assert.equal(result, 1);
    });
    it('Should ceil a number', () => {
        const result = evaluate("ceiling(1.5)");
        assert.equal(result, 2);
    });
    it('Should raise a number to the power of another', () => {
        const result = evaluate("pow(2, 3)");
        assert.equal(result, 8);
    });
    it('Should return the cosine of a number', () => {
        const result = evaluate("cos(0.5)");
        assert.approximately(result, 0.87758, 0.00001);
    });
    it('Should return the sine of a number', () => {
        const result = evaluate("sin(0.5)");
        assert.approximately(result, 0.47942, 0.00001);
    });
});

describe('String Expression Evaluation', () => {
    it('Should return the index of a substring', () => {
        const result = evaluate("indexOf('Hello World', 'World')");
        assert.equal(result, 6);
    });
    it('Should return the last index of a substring', () => {
        const result = evaluate("lastIndexOf('Hello World', 'l')");
        assert.equal(result, 9);
    });
    it('Should join an array of strings', () => {
        const result = evaluate("join(['Hello', 'World'], ', ')");
        assert.equal(result, 'Hello, World');
    });
    it('Should return a substring', () => {
        const result = evaluate("substring('Hello World', 6, 5)");
        assert.equal(result, 'World');
    });
    it('Should return a string in uppercase', () => {
        const result = evaluate("toUpperCase('Hello World')");
        assert.equal(result, 'HELLO WORLD');
    });
    it('Should return a string in lowercase', () => {
        const result = evaluate("toLowerCase('Hello World')");
        assert.equal(result, 'hello world');
    });
    it('Should determine if a string starts with a substring', () => {
        const result = evaluate("startsWith('Hello World', 'Hello')");
        assert.isTrue(result);
    });
    it('Should determine if a string ends with a substring', () => {
        const result = evaluate("endsWith('Hello World', 'World')");
        assert.isTrue(result);
    });
    it('Should replace a substring', () => {
        const result = evaluate("replace('Hello World', 'World', 'Earth')");
        assert.equal(result, 'Hello Earth');
    });
    it('Should replace all instances of a substring', () => {
        const result = evaluate("replaceAll('Hello World', 'l', 'L')");
        assert.equal(result, 'HeLLo WorLd');
    });
    it('Should pad the start of a string with a substring', () => {
        const result = evaluate("padStart('Hello World', 15, 'x')"); 
        assert.equal(result, 'xxxxHello World');
    });
    it('Should pad the end of a string with a substring', () => {
        const result = evaluate("padEnd('Hello World', 15, 'x')"); 
        assert.equal(result, 'Hello Worldxxxx');
    });
    it('Should split a string and return an array', () => {
        const result = evaluate("split('Hello World', ' ')"); 
        assert.deepEqual(result, ['Hello', 'World']);
    });
});

describe('Date Expression Evaluation', () => {
    it('Should convert a string to a date', () => {
        const result = evaluate("toDate('2023-09-01')"); 
        assert.equal(result.toISOString(), '2023-09-01T00:00:00.000Z');
    });
    it('Should convert a date to a date string', () => {
        const result = evaluate("toDateString(toDate('2023-09-01'))"); 
        assert.equal(result, 'Fri Sep 01 2023');
    });
    it('Should get the date component of a date', () => {  
        const result = evaluate("getDate(toDate('2023-09-01'))"); 
        assert.equal(result, 1);
    });
    it('Should get the month component of a date', () => {
        const result = evaluate("getMonth(toDate('2023-09-01'))");
        assert.equal(result, 8);
    });
    it('Should get the year component of a date', () => {
        const result = evaluate("getYear(toDate('2023-09-01'))");
        assert.equal(result, 2023);
    });
    it('Should add days to a date', () => {
        const result = evaluate("addDays(toDate('2023-09-01'), 1)");
        assert.equal(result.toISOString(), '2023-09-02T00:00:00.000Z');
    });
    it('Should add minutes to a date', () => {
        const result = evaluate("addMinutes(toDate('2023-09-01'), 1)");
        assert.equal(result.toISOString(), '2023-09-01T00:01:00.000Z');
    });
});

describe('Array Expression Evaluation', () => {
    it('Should append an item to an array', () => {
        const result = evaluate("appendTo(['Hello', 'World'], 'Earth')");
        assert.deepEqual(result, ['Hello', 'World', 'Earth']);
    });
    it('Should remove an item from an array', () => {
        const result = evaluate("removeFrom(['Hello', 'World'], 'World')");
        assert.deepEqual(result, ['Hello']);
    });
});