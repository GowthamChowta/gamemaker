import { Action } from '../interfaces/action';
import { Sprite } from '../sprite';

export class FlipDirectionY implements Action {
  sprite: Sprite;
  constructor(sprite: Sprite) {
    this.sprite = sprite;
  }
  performAction(): void {
    this.sprite.dy = -1 * this.sprite.dy;
  }
}
