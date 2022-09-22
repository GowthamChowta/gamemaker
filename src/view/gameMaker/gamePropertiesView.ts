import {
  gameBackgroundColorInput,
  gameLivesInput,
  gameNameInput,
  gameNameTitle,
  gameProperties,
  gamePropertiesModal,
  saveGameProperties,
} from '../../constants';
import { GameMakerController } from '../../controller/gameMakerController';
import { GameMakerModel } from '../../model/gameMaker';
import CanvasLayout from '../../model/shapes/layout';

export class GamePropertiesView {
  layout: CanvasLayout;
  controller: GameMakerController;
  model: GameMakerModel;
  context: CanvasRenderingContext2D;

  constructor(
    controller: GameMakerController,
    model: GameMakerModel,
    layout: CanvasLayout,
  ) {
    this.layout = layout;
    this.context = this.layout.context;
    this.controller = controller;
    this.model = model;
    this.addEventListenersToButtons();
  }

  addEventListenersToButtons() {
    gameProperties.addEventListener('click', () =>
      this.handleGamePropertiesClicked(),
    );
    saveGameProperties.addEventListener('click', () =>
      this.handleSaveGamePropertiesModalClicked(),
    );
  }

  handleGamePropertiesClicked() {
    this.toggleGamePropertiesDisplay();
  }

  handleSaveGamePropertiesModalClicked() {
    const [input, lives, color] = this.getGameProperties();
    this.controller.saveGameProperties(
      input as string,
      lives as number,
      color as string,
    );
    this.toggleGamePropertiesDisplay();
  }

  getGameProperties() {
    return [
      gameNameInput.value,
      parseInt(gameLivesInput.value, 10),
      gameBackgroundColorInput.value,
    ];
  }

  toggleGamePropertiesDisplay() {
    gamePropertiesModal.style.display =
      gamePropertiesModal.style.display === 'block' ? 'none' : 'block';
  }

  render() {
    this.layout.canvas.style.background = this.model.getColor();
    gameNameTitle.innerText =
      this.model.getName() === undefined || this.model.getName().length == 0
        ? '<Game name goes here>'
        : this.model.getName();
  }
}
