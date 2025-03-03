import { describe, test, expect } from '@jest/globals';
import Calculator  from './homework4.2';


describe('Calculator test', () => {
    let calculator: Calculator

    beforeEach(() => {
        calculator = new Calculator();
    })

    test('Check if "add" method adds two numbers', () => {
        expect(calculator.add(5, 3)).toBe(8)
    })

    test('Check if "substract" method subtracts two numbers', () => {
        expect(calculator.substract(5, 3)).toBe(2)
    })

    test('Check if "multiply" method multiplies two numbers', () => {
        expect(calculator.multiply(5, 3)).toBe(15)
    })

    test('Check if "divide" method divides two numbers', () => {
        expect(calculator.divide(5, 3)).toBe(1.6666666666666667)
    })


    test('Check if "percentage" method calculates percentage', () => {
        expect(calculator.percentage(5, 10)).toBe(50)
    })

    test('Check if "operationChoice" method throws error for unknown operation', () => {
        expect(() => calculator.operationChoice('unknown', 5, 3)).toThrow('Unknown operation: unknown')
    })

    test('Check if "operationChoice" method throws error for invalid input', () => {
        expect(() => calculator.operationChoice('add', Number('five'), 3)).toThrow('Invalid input. Please enter a number.')
    })

    test('Check if "operationChoice" method returns result for valid operation', () => {
        expect(calculator.operationChoice('add', 5, 3)).toBe(8)
    })

    test('Check if "operationChoice" method returns result for valid operation with string inputs', () => {
        expect(calculator.operationChoice('add', '5', '3')).toBe(8)
    })

    test('Check if "operationChoice" method returns result for valid operation with float inputs', () => {
        expect(calculator.operationChoice('divide', 10, 2)).toBe(5)
    })

    test('Check if "operationChoice" method returns result for valid operation with negative numbers', () => {
        expect(calculator.operationChoice('substract', 5, 3)).toBe(2)
    })

    test('Check if "operationChoice" method returns result for valid operation with percentage', () => {
        expect(calculator.operationChoice('percentage', 5, 10)).toBe(50)
    })

    test('Check if "operationChoice" method returns result for valid operation with string percentage', () => {
        expect(calculator.operationChoice('percentage', '5', '10')).toBe(50)
    })
})
