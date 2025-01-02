interface IBaseGeometricFigure {
    name: string;
    color: string;

    calculateArea(): number;
    calculatePerimeter(): number;
    printInfo(): string;
}

export abstract class BaseGeometricFigure implements IBaseGeometricFigure {
    public name: string
    public color: string

  constructor(name: string, color: string) {
      this.name = name;
      this.color = color;
  }

  abstract calculateArea(): number 

  abstract calculatePerimeter(): number

  abstract printInfo(): string 

} 

export abstract class ElipticalFigureBase extends BaseGeometricFigure implements IBaseGeometricFigure {

  constructor(name: string, color: string){
      super(name, color)
  }

  abstract printDiameter(): number 
}


export abstract class PolygonalFigureBase extends BaseGeometricFigure implements IBaseGeometricFigure {
    public sides: number
    public sideLength: number

    constructor(name: string, color: string, sides: number, sideLength: number) {
        super(name, color)
        this.sides = sides
        this.sideLength = sideLength
    }

    abstract getNumberOfSides(): number
    abstract printAreaFormula(): string

    calculatePerimeter(): number {
        return this.sideLength * this.sides;
    }
}