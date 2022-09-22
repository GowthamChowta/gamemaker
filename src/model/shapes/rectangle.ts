import { Shape } from './shape';

export class Rectangle extends Shape {
  draw(
    ctx: CanvasRenderingContext2D,
    posX: number,
    posY: number,
    height: number,
    width: number,
    color: string,
  ): void {
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.fillRect(posX, posY, width, height);
    ctx.closePath();
  }
  clear(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
  ): void {
    ctx.clearRect(x, y, width, height);
  }
}
