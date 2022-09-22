export abstract class Shape {
  height: number;
  width: number;
  color: string;
  constructor() {
    this.color = 'black';
    this.height = 20;
    this.width = 65;
  }
  abstract draw(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    color: string,
  ): void;
  abstract clear(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
  ): void;
}
