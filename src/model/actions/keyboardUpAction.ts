import { stepSize } from '../../constants';
import { checkCollisionTopWall } from '../../util';
import { Action } from '../interfaces/action';
import { Sprite } from '../sprite';

export class KeyBoardUpAction implements Action {
  sprite: Sprite;
  constructor(sprite: Sprite) {
    this.sprite = sprite;
    document.addEventListener('keydown', event => {
      if (event.key == 'ArrowUp') {
        this.performAction();
      }
    });
  }
  performAction(): void {
    if (!checkCollisionTopWall(this.sprite)) {
      this.sprite.clear();
      this.sprite.setPositionY(this.sprite.getPositionY() - stepSize);
      this.sprite.draw();
    }
  }
  registerView(): void {
    throw new Error('Method not implemented.');
  }
}
