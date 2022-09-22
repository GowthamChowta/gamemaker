import { stepSize } from '../../constants';
import {
  checkCollisionDownWall,
  checkCollisionLeftWall,
  checkCollisionRightWall,
  checkCollisionTopWall,
} from '../../util';
import { Action } from '../interfaces/action';
import { Sprite } from '../sprite';

export class MoveSelf implements Action {
  sprite: Sprite;
  constructor(sprite: Sprite) {
    this.sprite = sprite;
  }
  performAction(): void {
    if (checkCollisionLeftWall(this.sprite)) {
      this.sprite.dx = 1;
    } else if (checkCollisionRightWall(this.sprite)) {
      this.sprite.dx = -1;
    } else if (checkCollisionTopWall(this.sprite)) {
      this.sprite.dy = 1;
    } else if (checkCollisionDownWall(this.sprite)) {
      this.sprite.dy = -1;
    }
    this.sprite.clear();
    this.sprite.setPositionX(
      this.sprite.getPositionX() + (stepSize - 15) * this.sprite.dx,
    );
    this.sprite.setPositionY(
      this.sprite.getPositionY() + (stepSize - 15) * this.sprite.dy,
    );
    this.sprite.draw();
  }
}
