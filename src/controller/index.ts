import { GameMakerModel } from '../model/gameMaker';
import CanvasLayout from '../model/shapes/layout';
import { Sprite } from '../model/sprite';
import { GameMakerView } from '../view/gameMaker/gameMakerView';
import { GameMakerController } from './gameMakerController';
import { GamePlayController } from './gamePlayController';

export class GameController {
  model: GameMakerModel;
  layout: CanvasLayout;
  sprites: Sprite[];
  gameMakerController: GameMakerController;
  gamePlayController: GamePlayController;
  gameMakerView: GameMakerView;

  constructor() {
    this.model = new GameMakerModel();
    this.layout = new CanvasLayout('gameMaker');
    this.gameMakerController = new GameMakerController(this.model, this.layout);
    this.gamePlayController = new GamePlayController(this.model, this.layout);
  }
}

export const gameController = new GameController();
