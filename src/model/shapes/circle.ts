import { Shape } from './shape';

export class Circle extends Shape {
  draw(
    ctx: CanvasRenderingContext2D,
    posX: number,
    posY: number,
    width: number,
    height: number,
    color: string,
  ): void {
    ctx.beginPath();
    ctx.arc(posX, posY, width, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
  }

  clear(
    ctx: CanvasRenderingContext2D,
    posX: number,
    posY: number,
    width: number,
    height: number,
  ) {
    ctx.clearRect(
      posX - width - 1,
      posY - width - 1,
      width * 2 + 2,
      width * 2 + 2,
    );
  }
}
