interface IBaseGeometricFigure {
    name: string;
    color: string;

    calculateArea(): number;
    calculatePerimeter(): number;
    printInfo(): string;
}

export default abstract class BaseGeometricFigure implements IBaseGeometricFigure {
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

export default abstract class ElipticalFigureBase extends BaseGeometricFigure implements IBaseGeometricFigure {

  constructor(name: string, color: string){
      super(name, color)
  }

  abstract printDiameter(): number 
}