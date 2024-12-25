"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var readline = require("readline");
var Calculator = /** @class */ (function () {
    function Calculator() {
    }
    Calculator.prototype.add = function (a, b) {
        return a + b;
    };
    Calculator.prototype.substract = function (a, b) {
        return a - b;
    };
    Calculator.prototype.multiply = function (a, b) {
        return a * b;
    };
    Calculator.prototype.divide = function (a, b) {
        if (b === 0) {
            throw new Error("Division by zero is not allowed");
        }
        return a / b;
    };
    Calculator.prototype.percentage = function (a, b) {
        return (a / b) * 100;
    };
    Calculator.prototype.operationChoice = function (operation, a, b) {
        var numA = typeof a === 'string' ? parseFloat(a.trim()) : a;
        var numB = typeof b === 'string' ? parseFloat(b.trim()) : b;
        console.log("a: ".concat(a, ", b: ").concat(b));
        console.log("numA: ".concat(numA, ", numB: ").concat(numB));
        if (isNaN(numA) || isNaN(numB)) {
            throw new Error("Invalid input. Please enter a number.");
        }
        switch (operation) {
            case 'add':
                return this.add(numA, numB);
            case 'substract':
                return this.substract(numA, numB);
            case 'multiply':
                return this.multiply(numA, numB);
            case 'divide':
                return this.divide(numA, numB);
            case 'percentage':
                return this.percentage(numA, numB);
            default:
                throw new Error("Unknown operation: ".concat(operation));
        }
    };
    return Calculator;
}());
var calculator = new Calculator();
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
var operations = ['add', 'substract', 'multiply', 'divide', 'percentage'];
rl.question("Choose an operation to perform: \n".concat(operations, "\n"), function (operation) {
    rl.question('Enter the first number:', function (num1) {
        rl.question('Enter the second number:', function (num2) {
            var a = parseFloat(num1.trim());
            var b = parseFloat(num2.trim());
            try {
                var result = calculator.operationChoice(operation, a, b);
                console.log("Result: ".concat(result));
            }
            catch (error) {
                if (error) {
                    console.error(error.message);
                }
                else {
                    console.error('An unknown error occurred');
                }
                rl.close();
            }
            rl.close();
        });
    });
});
