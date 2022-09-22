import { stepSize } from '../../constants';
import { checkCollisionRightWall } from '../../util';
import { Action } from '../interfaces/action';
import { Sprite } from '../sprite';

export class KeyBoardRightAction implements Action {
  sprite: Sprite;
  constructor(sprite: Sprite) {
    this.sprite = sprite;
    document.addEventListener('keydown', event => {
      if (event.key == 'ArrowRight') {
        this.performAction();
      }
    });
  }
  performAction(): void {
    if (!checkCollisionRightWall(this.sprite)) {
      this.sprite.clear();
      this.sprite.setPositionX(this.sprite.getPositionX() + stepSize);
      this.sprite.draw();
    }
  }
  registerView(): void {
    throw new Error('Method not implemented.');
  }
}
