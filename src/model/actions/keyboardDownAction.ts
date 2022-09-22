import { stepSize } from '../../constants';
import { checkCollisionDownWall } from '../../util';
import { Action } from '../interfaces/action';
import { Sprite } from '../sprite';

export class KeyBoardDownAction implements Action {
  sprite: Sprite;
  constructor(sprite: Sprite) {
    this.sprite = sprite;
    document.addEventListener('keydown', event => {
      if (event.key == 'ArrowDown') {
        this.performAction();
      }
    });
    return this;
  }
  performAction(): void {
    if (!checkCollisionDownWall(this.sprite)) {
      this.sprite.clear();
      this.sprite.setPositionY(this.sprite.getPositionY() + stepSize);
      this.sprite.draw();
    }
  }
  registerView(): void {
    throw new Error('Method not implemented.');
  }
}
