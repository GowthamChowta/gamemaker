import { AllowedShapes } from '../constants';
import CanvasLayout from '../model/shapes/layout';
import { Sprite } from '../model/sprite';

export function createLayout1(context: CanvasRenderingContext2D): Sprite[] {
  const coordinates = [
    [1, 2],
    [100, 200],
    [200, 300],
    [300, 350],
  ];
  const bricks: Sprite[] = [];
  for (let i = 0; i < coordinates.length; i++) {
    bricks.push(
      new Sprite(
        'brick',
        coordinates[i][0],
        coordinates[i][1],
        65,
        20,
        'blue',
        AllowedShapes.Rectangle,
        context,
      ),
    );
  }
  return bricks;
}

export function createLayout2(layout: CanvasLayout): Sprite[] {
  const bricks: Sprite[] = [];
  const canvasWidth = layout.getCanvasWidth();
  const canvasHeight = layout.getCanvasHeight();

  for (let y = 420; y >= 300; y -= 25) {
    for (let x = 15; x <= 700; x += 70) {
      bricks.push(
        new Sprite(
          'brick',
          x,
          canvasHeight - y,
          65,
          20,
          'pink',
          AllowedShapes.Rectangle,
          layout.context,
        ),
      );
    }
  }
  return bricks;
}