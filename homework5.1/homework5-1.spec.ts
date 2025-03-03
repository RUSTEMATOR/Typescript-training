import {expect, describe, test, beforeEach} from '@jest/globals';
import { Circle, Elips, Polygon, Rectangle, Square, Triangle } from './homework5-1';


describe('Circle', () => {
    let circle: Circle;
    beforeEach(() => {
        circle = new Circle(5);
    });
    
    test('calculateArea should return the correct area', () => {
        expect(circle.calculateArea()).toBeCloseTo(78.5398, 4);
    });
    
    test('calculatePerimeter should return the correct perimeter', () => {
        expect(circle.calculatePerimeter()).toBeCloseTo(31.4159, 4);
    });
    
    test('printDiameter should return the correct diameter', () => {
        expect(circle.printDiameter()).toBe(10);
    });
    
    test('printInfo should return the correct info string with name', () => {
        expect(circle.printInfo()).toContain('Name: Circle');
    });

    test('printInfo should return the correct info string with color', () => {
        expect(circle.printInfo()).toContain('Color: Black');
    });

    test('printInfo should return the correct info string with radius', () => {
        expect(circle.printInfo()).toContain('Radius: 5');
    });
})


describe('Elips', () => { 
    let elips: Elips

    beforeEach(() => {
        elips = new Elips(5);
    });
    
    test('calculateArea should return the correct area', () => {
        expect(elips.calculateArea()).toBeCloseTo(78.5398, 4);
    });
    
    test('calculatePerimeter should return the correct perimeter', () => {
        expect(elips.calculatePerimeter()).toBeCloseTo(31.4159, 4);
    });
    
    test('printDiameter should return the correct diameter', () => {
        expect(elips.printDiameter()).toBe(10);
    });
    
    test('printInfo should return the correct info string', () => {
        expect(elips.printInfo()).toContain('Name: Elips');
    });

    test('printInfo should return the correct info string with color', () => {
        expect(elips.printInfo()).toContain('Color: Red');
    });

    test('printInfo should return the correct info string with radius', () => {
        expect(elips.printInfo()).toContain('Radius: 5');
    });
})


describe('Square', () => {
    let square: Square

    beforeEach(() => {
        square = new Square(4, 5);
    });

    test('calculateArea should return the correct area', () => {
        expect(square.calculateArea()).toBe(25);
    });
    
    test('getNumberOfSides should return the correct number of sides', () => {
        expect(square.getNumberOfSides()).toBe(4);
    });
    
    test('printAreaFormula should return the correct area formula', () => {
        expect(square.printAreaFormula()).toBe('sideLength^2');
    });
    
    test('printInfo should return the correct info string', () => {
        expect(square.printInfo()).toContain('Name: Square');
    });

    test('printInfo should return the correct info string with color', () => {
        expect(square.printInfo()).toContain('Color: Yellow');
    });

    test('printInfo should return the correct info string with sideLength', () => {
        expect(square.printInfo()).toContain('Side Length: 5');
    });
})


describe('Rectangle', () => { 
    let rectangle: Rectangle;


    beforeEach(() => {
        rectangle = new Rectangle(4, 5);
    });

    test('calculateArea should return the correct area', () => {
        expect(rectangle.calculateArea()).toBe(25);
    });
    
    test('getNumberOfSides should return the correct number of sides', () => {
        expect(rectangle.getNumberOfSides()).toBe(4);
    });
    
    test('printAreaFormula should return the correct area formula', () => {
        expect(rectangle.printAreaFormula()).toBe('sideLength * sideLength');
    });
    
    test('printInfo should return the correct info string', () => {
        expect(rectangle.printInfo()).toContain('Name: Rectangle');
    });

    test('printInfo should return the correct info string with color', () => {
        expect(rectangle.printInfo()).toContain('Color: Green');
    });

    test('printInfo should return the correct info string with sideLength', () => {
        expect(rectangle.printInfo()).toContain('Side Length: 5');
    });
})

describe('Triangle', () => { 
    let triangle: Triangle;

    beforeEach(() => {
        triangle = new Triangle('Blue', 5, 5, 5);
    });

    test('calculatePerimeter should return the correct perimeter', () => {
        expect(triangle.calculatePerimeter()).toBe(15);
    });

    test('calculateArea should return the correct area', () => {
        expect(triangle.calculateArea()).toBeCloseTo(10.8253, 4);
    });

    test('getNumberOfSides should return the correct number of sides', () => {
        expect(triangle.getNumberOfSides()).toBe(3);
    });

    test('printAreaFormula should return the correct area formula', () => {
        expect(triangle.printAreaFormula()).toBe('Area = sqrt(s * (s - a) * (s - b) * (s - c))');
    });

    test('printTriangleType should return the correct triangle type', () => {
        expect(triangle.printTriangleType()).toBe('Equilateral');
    });

    test('printInfo should return the correct info string', () => {
        expect(triangle.printInfo()).toContain('Name: Triangle');
    });

    test('printInfo should return the correct info string with color', () => {
        expect(triangle.printInfo()).toContain('Color: Blue');
    });
})


describe('Polygon', () => {
    let polygon: Polygon;

    beforeEach(() => {
        polygon = new Polygon('biba', 'Purple', 3, 4);
    });

    test('calculatePerimeter should return the correct perimeter', () => {
        expect(polygon.calculatePerimeter()).toBe(12);
    });

    test('printInfo should return the correct info string', () => {
        expect(polygon.printInfo()).toContain('Name: biba');
    });

    test('printInfo should return the correct info string with color', () => {
        expect(polygon.printInfo()).toContain('Color: Purple');
    });

    test('printInfo should return the correct info string with side length', () => {
        expect(polygon.printInfo()).toContain('Side Length: 4');
    });
    
});