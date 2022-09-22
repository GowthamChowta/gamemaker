import { Action } from '../interfaces/action';
import { Sprite } from '../sprite';

export class DisappearAction implements Action {
  sprite: Sprite;
  constructor(sprite: Sprite) {
    this.sprite = sprite;
  }
  performAction(): void {
    this.sprite.setIsVisible(false);
  }
}
