import ElipticalFigureBase from "./AbstractClasses/AbstractClasses"


class Circle extends ElipticalFigureBase  {
    private radius: number

    constructor(radius: number) {
        super('Circle', 'Black')
        this.radius = radius
    }


    calculateArea(): number {
        return Math.PI * Math.pow(this.radius, 2)   
    }

    calculatePerimeter(): number {
        return 2 * Math.PI * this.radius
    }

    printDiameter(): number {
        return 2 * this.radius
    }

    printInfo(): string {
        return `Name: ${this.name}, Color: ${this.color}, Radius: ${this.radius}, 
                Area: ${this.calculateArea()}, Perimeter: ${this.calculatePerimeter()}, Diameter: ${this.printDiameter()}`
    }
}

const circle = new Circle(5)

console.log(circle.printInfo())

class Elips extends ElipticalFigureBase {
    radius: number

    constructor(radius: number){
        super('Elips', 'Red')
        this.radius = radius
    }

    calculateArea(): number {
        return Math.PI * Math.pow(this.radius, 2)   
    }

    calculatePerimeter(): number {
        return 2 * Math.PI * Math.sqrt((Math.pow(this.a, 2) + Math.pow(this.b, 2)) / 2)
    }

    printDiameter(): number {
        return 2 * Math.sqrt((Math.pow(this.a, 2) + Math.pow(this.b, 2)) / 2)
    }

    printInfo(): string {
        return `Name: ${this.name}, Color: ${this.color}, A: ${this.a}, B: ${this.b}, 
                Area: ${this.calculateArea()}, Perimeter: ${this.calculatePerimeter()}, Diameter: ${this.printDiameter()}`
    }
}



