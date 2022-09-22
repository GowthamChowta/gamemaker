import { stepSize } from '../../constants';
import { Action } from '../interfaces/action';
import { Sprite } from '../sprite';
import { checkCollisionLeftWall } from '../../util';

export class KeyBoardLeftAction implements Action {
  sprite: Sprite;
  constructor(sprite: Sprite) {
    this.sprite = sprite;
    document.addEventListener('keydown', event => {
      if (event.key == 'ArrowLeft') {
        this.performAction();
      }
    });
  }

  performAction(): void {
    if (!checkCollisionLeftWall(this.sprite)) {
      this.sprite.clear();
      this.sprite.setPositionX(this.sprite.getPositionX() - stepSize);
      this.sprite.draw();
    }
  }
  registerView(): void {
    throw new Error('Method not implemented.');
  }
}
