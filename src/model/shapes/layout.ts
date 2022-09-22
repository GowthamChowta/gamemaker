export default class CanvasLayout {
  canvasId: string;
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;

  constructor(canvasId: string) {
    this.canvasId = canvasId;
    this.canvas = <HTMLCanvasElement>document.getElementById(this.canvasId);
    this.context = <CanvasRenderingContext2D>this.canvas.getContext('2d');
  }

  getCanvasWidth(): number {
    return this.canvas.width;
  }

  getCanvasHeight(): number {
    return this.canvas.height;
  }

  getContext(): CanvasRenderingContext2D {
    return this.context;
  }

  clearScreen(): void {
    this.getContext().clearRect(
      0,
      0,
      this.getCanvasWidth(),
      this.getCanvasHeight(),
    );
  }
}