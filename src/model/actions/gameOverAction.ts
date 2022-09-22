import { Action } from '../interfaces/action';
import { Sprite } from '../sprite';

export class GameOverAction implements Action {
  sprite: Sprite;
  constructor(sprite: Sprite) {
    this.sprite = sprite;
  }
  performAction(): void {
    document.location.reload();
    alert('Sorry, game is over');
  }
}
