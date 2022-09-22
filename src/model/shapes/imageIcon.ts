import { Shape } from './shape';

export class ImageIcon extends Shape {
  src: string;

  constructor(src: string) {
    super();
    this.src = src;
  }
  draw(
    ctx: CanvasRenderingContext2D,
    posX: number,
    posY: number,
    height: number,
    width: number,
    color: string,
  ): void {
    const image = new Image(60, 60);
    image.src = this.src;
    ctx.beginPath();
    ctx.drawImage(image, posX, posY, width, height);
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
