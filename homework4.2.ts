import * as readline from 'readline'

interface ICalculator {
    add(a: number, b: number): number
    substract(a: number, b: number): number
    multiply(a: number, b: number): number
    divide(a: number, b: number): number
    percentage(a: number, b: number): number
}

class Calculator implements ICalculator {
    add(a: number, b: number): number {
        return a + b
    }

    substract(a: number, b: number): number {
        return a - b
    }

    multiply(a: number, b: number): number {
        return a * b
    }

    divide(a: number, b: number): number {
        if (b === 0) {
            throw new Error("Division by zero is not allowed")
        }
        return a / b
    }

    percentage(a: number, b: number): number {
        return (a / b) * 100
    }

    operationChoice(operation: string, a: number, b: number): number
    operationChoice(operation: string, a: string, b: string): number

    operationChoice(operation: string, a: number | string, b: number | string): number {
        const numA = typeof a === 'string' ? parseFloat(a) : a
        const numB = typeof b === 'string' ? parseFloat(b) : b
        console.log(`a: ${a}, b: ${b}`)
        console.log(`numA: ${numA}, numB: ${numB}`)
        if (isNaN(numA) || isNaN(numB)) {
            throw new Error("Invalid input. Please enter a number.")
        }

        switch(operation){
            case 'add':
                return this.add(numA, numB)
            case'substract':
                return this.substract(numA, numB)
            case'multiply':
                return this.multiply(numA, numB)
            case 'divide':
                return this.divide(numA, numB)
            case 'percentage':
                return this.percentage(numA, numB)
            default:
                throw new Error(`Unknown operation: ${operation}`)
            
        }
    }
}

let calculator = new Calculator()

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const operations = ['add', 'substract', 'multiply', 'divide', 'percentage']

rl.question(`Choose an operation to perform: \n${operations}\n`, (operation) => {
    rl.question('Enter the first number:', (num1) => {
        rl.question('Enter the second number:', (num2) => {
            const a = parseFloat(num1.trim())
            const b = parseFloat(num2.trim())

            try{
                const result = calculator.operationChoice(operation, a, b)
                console.log(`Result: ${result}`)
            } catch(error) {
                if (error) {
                    console.error(error.message)
                } else {
                    console.error('An unknown error occurred')
                }
                rl.close()
            }

            rl.close()
        })
    })
})