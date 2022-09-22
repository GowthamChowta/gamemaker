import {
  buildGameGameMakerView,
  gameProperties,
  createSpriteButton,
  createEventButton,
  startGamePlayView,
  saveProgressButton,
  loadFileButton,
} from '../../constants';
import { GamePlayController } from '../../controller/gamePlayController';
import { GameMakerModel } from '../../model/gameMaker';
import CanvasLayout from '../../model/shapes/layout';

export class GamePlayView {
  controller: GamePlayController;
  model: GameMakerModel;
  layout: CanvasLayout;
  constructor(
    controller: GamePlayController,
    model: GameMakerModel,
    layout: CanvasLayout,
  ) {
    this.controller = controller;
    this.model = model;
    this.layout = layout;
    this.addEventListenersToButtons();
  }
  addEventListenersToButtons() {
    this.handlePlayGameButtonGameMaker();
    this.handleStartGameButton();
  }

  handlePlayGameButtonGameMaker() {
    buildGameGameMakerView.addEventListener('click', () => {
      this.removeGameMakerButtons();
    });
  }
  handleStartGameButton() {
    startGamePlayView.addEventListener('click', () => {
      this.controller.setActions();
      this.controller.startGameLoop();
      startGamePlayView.setAttribute('disabled', 'true');
    });
  }

  removeGameMakerButtons() {
    gameProperties.style.display = 'none';
    createSpriteButton.style.display = 'none';
    createEventButton.style.display = 'none';
    buildGameGameMakerView.style.display = 'none';
    saveProgressButton.style.display = 'none';
    loadFileButton.style.display = 'none';
    startGamePlayView.style.display = 'block';
  }

  render() {
    this.layout.clearScreen();
    // TODO: Change to the below line
    this.model.filterSprites();
    this.model
      .getSprites()
      .filter(sprite => sprite.isVisible)
      .forEach(sprite => sprite.draw());
  }
}
