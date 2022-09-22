import {
  saveProgressButton,
  loadFileButton,
  buildGameGameMakerView,
} from '../../constants';

import { GameMakerController } from '../../controller/gameMakerController';
import { GameMakerModel } from '../../model/gameMaker';
import CanvasLayout from '../../model/shapes/layout';

export class GameMakerView {
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
    saveProgressButton.addEventListener('click', () =>
      this.handleSaveProgressClicked(),
    );

    loadFileButton.addEventListener('click', () =>
      this.handleLoadFileClicked(),
    );

    this.handleMouseDownOnCanvas();
    this.handleMouseUpOnCanvas();
    this.handleMouseMoveOnCanvas();
    this.handlePlayGameButtonClicked();
  }

  handleSaveProgressClicked() {
    this.controller.saveProgress();
  }

  handleLoadFileClicked() {
    this.controller.loadFile();
  }

  handleMouseDownOnCanvas() {
    this.layout.canvas.addEventListener('mousedown', e => {
      this.controller.handleMouseDown(e);
    });
  }

  handleMouseUpOnCanvas() {
    this.layout.canvas.addEventListener('mouseup', e => {
      this.controller.handleMouseUp(e);
    });
  }

  handleMouseMoveOnCanvas() {
    this.layout.canvas.addEventListener('mousemove', e => {
      this.controller.handleMouseMove(e);
    });
  }
  // Remove all the mouse event listeners on play button clicked
  handlePlayGameButtonClicked() {
    buildGameGameMakerView.addEventListener('click', () => {
      this.removeMouseEventListeners();
    });
  }
  removeMouseEventListeners() {
    this.layout.canvas.removeEventListener(
      'mousedown',
      this.controller.handleMouseDown,
    );

    this.layout.canvas.removeEventListener(
      'mouseup',
      this.controller.handleMouseUp,
    );
    this.layout.canvas.removeEventListener(
      'mousemove',
      this.controller.handleMouseMove,
    );
  }

  render() {
    this.layout.clearScreen();
    this.model.getSprites().forEach(sprite => sprite.draw());
  }
}
