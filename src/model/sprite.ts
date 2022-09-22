import {
  AllowedActions,
  AllowedShapes,
  bombImagePath,
  wizardImagePath,
} from '../constants';
import { ImageIcon } from './shapes/imageIcon';
import { Circle } from './shapes/circle';
import { Rectangle } from './shapes/rectangle';
import { Shape } from './shapes/shape';

export class Sprite {
  name: string;
  posX: number;
  posY: number;
  shape: AllowedShapes;
  actions: AllowedActions[];
  isVisible: boolean;
  canvasElement: Shape;
  isSelected: boolean;
  layout: CanvasRenderingContext2D;
  height: number;
  width: number;
  color: string;
  dx: number;
  dy: number;

  constructor(
    name: string,
    posX: number,
    posY: number,
    height: number,
    width: number,
    color: string,
    shape: AllowedShapes,
    layout: CanvasRenderingContext2D,
  ) {
    this.name = name;
    this.posX = posX;
    this.posY = posY;
    this.height = height;
    this.width = width;
    this.color = color;
    this.shape = shape;
    this.actions = [];
    this.layout = layout;
    this.isSelected = false;
    this.createCanvasElement();
    this.isVisible = true;
    this.dx = -1;
    this.dy = -1;
  }

  setName(name: string) {
    this.name = name;
  }

  getName() {
    return this.name;
  }

  setPositionX(x: number) {
    this.posX = x;
  }

  getPositionX() {
    return this.posX;
  }
  setPositionY(y: number) {
    this.posY = y;
  }
  getPositionY() {
    return this.posY;
  }

  addAction(action: AllowedActions) {
    this.actions.push(action);
  }
  setIsVisible(isVisible: boolean) {
    this.isVisible = isVisible;
  }
  getIsVisible() {
    return this.isVisible;
  }
  setIsSelected(isSelected: boolean) {
    this.isSelected = isSelected;
  }
  getIsSelected() {
    return this.isSelected;
  }
  getActions() {
    return this.actions;
  }

  createCanvasElement() {
    if (this.shape == AllowedShapes.Rectangle) {
      this.canvasElement = new Rectangle();
    } else if (this.shape == AllowedShapes.Circle) {
      this.canvasElement = new Circle();
    } else if (this.shape == AllowedShapes.Wizard) {
      this.canvasElement = new ImageIcon(wizardImagePath);
    } else if (this.shape == AllowedShapes.Bomb) {
      this.canvasElement = new ImageIcon(bombImagePath);
    }
  }

  draw() {
    this.canvasElement.draw(
      this.layout,
      this.posX,
      this.posY,
      this.height,
      this.width,
      this.color,
    );
  }
  clear() {
    this.canvasElement.clear(
      this.layout,
      this.posX,
      this.posY,
      this.width,
      this.height,
    );
  }

  getWidth() {
    return this.width;
  }
  getHeight() {
    return this.height;
  }
  setXSpeed(dx: number) {
    this.dx = dx;
  }
  setYSpeed(dy: number) {
    this.dy = dy;
  }
}
