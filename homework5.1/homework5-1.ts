import { ElipticalFigureBase, PolygonalFigureBase } from "./AbstractClasses/AbstractClasses"


class Circle extends ElipticalFigureBase  {
    public radius: number

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

const elips = new Elips(5)

console.log(elips.printInfo())

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

class Square extends PolygonalFigureBase {
    constructor(sides: number, sideLength: number) {
        super('Square', 'Yellow', sides, sideLength)
    }

    calculateArea(): number {
        return Math.pow(this.sideLength, 2)
    }

    getNumberOfSides(): number {
        return this.sides
    }

    printAreaFormula(): string {
        return 'sideLength^2'
    }

    printInfo(): string {
        return `Name: ${this.name}, Color: ${this.color}, Side Length: ${this.sideLength}, 
                Area: ${this.calculateArea()}, Perimeter: ${this.calculatePerimeter()}, Number of Sides: ${this.getNumberOfSides()}, Area Formula: ${this.printAreaFormula()}`
    }
}


const square = new Square(4, 5)

console.log(square.printInfo())


class Rectangle extends PolygonalFigureBase {
    constructor(sides: number, sideLength: number) {
        super('Rectangle', 'Green', sides, sideLength)
    }

    calculateArea(): number {
        return this.sideLength * this.sideLength
    }

    getNumberOfSides(): number {
        return this.sides
    }

    printAreaFormula(): string {
        return 'sideLength * sideLength'
    }

    printInfo(): string {
        return `Name: ${this.name}, Color: ${this.color}, Side Length: ${this.sideLength}, 
                Area: ${this.calculateArea()}, Perimeter: ${this.calculatePerimeter()}, Number of Sides: ${this.getNumberOfSides()}, Area Formula: ${this.printAreaFormula()}`
    }
}

const rectangle = new Rectangle(4, 5)
console.log(rectangle.printInfo())


class Triangle extends PolygonalFigureBase {
    sideA: number;
    sideB: number;
    sideC: number;

    constructor(color: string, sideA: number, sideB: number, sideC: number) {
        super('Triangle', color, 3, sideA);
        this.sideA = sideA;
        this.sideB = sideB;
        this.sideC = sideC;
    }

    calculatePerimeter(): number {
        return this.sideA + this.sideB + this.sideC;
    }

    calculateArea(): number {
        const s = this.calculatePerimeter() / 2;
        return Math.sqrt(s * (s - this.sideA) * (s - this.sideB) * (s - this.sideC));
    }

    getNumberOfSides(): number {
        return this.sides;
    }

    printAreaFormula(): string {
        return 'Area = sqrt(s * (s - a) * (s - b) * (s - c))';
    }

    printTriangleType(): string {
        if (this.sideA === this.sideB && this.sideB === this.sideC) {
            return 'Equilateral';
        } else if (this.sideA === this.sideB || this.sideB === this.sideC || this.sideA === this.sideC) {
            return 'Isosceles';
        } else {
            return 'Scalene';
        }
    }

    calcHeight(): number {
        return (2 * this.calculateArea()) / this.sideA;
    }

    printInfo(): string {
        return `Name: ${this.name}, Color: ${this.color}, Sides: [${this.sideA}, ${this.sideB}, ${this.sideC}],
                Area: ${this.calculateArea()}, Perimeter: ${this.calculatePerimeter()}, 
                Triangle Type: ${this.printTriangleType()}, Height: ${this.calcHeight()}`;
    }
}

const triangle = new Triangle('Blue', 5, 5, 5);
console.log(triangle.printInfo());

const triangle2 = new Triangle('Blue', 5, 4, 3);
console.log(triangle2.printInfo());



class Polygon {
    name: string;
    color: string;
    sides: number;
    sideLength: number;

    constructor(name: string, color: string, sides: number, sideLength: number) {
        this.name = name;
        this.color = color;
        this.sides = sides;
        this.sideLength = sideLength;
    }

    calculatePerimeter(): number {
        return this.sides * this.sideLength;
    }

    printInfo(): string {
        return `Name: ${this.name}, Color: ${this.color}, Sides: ${this.sides}, Side Length: ${this.sideLength}, Perimeter: ${this.calculatePerimeter()}`;
    }
}

const polygon = new Polygon('Polygon', 'Purple', 5, 5);
console.log(polygon.printInfo());