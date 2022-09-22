import {
  AllowedActions,
  allowedActionsDropDown,
  AllowedShapes,
  allowedShapesDropDown,
  createSpriteButton,
  createSpriteModal,
  createSpriteModalButton,
  spriteColorInput,
  spriteHeightInput,
  spriteNameInput,
  spritePosXInput,
  spritePosYInput,
  spriteWidthInput,
} from '../../constants';
import { GameMakerController } from '../../controller/gameMakerController';
import { GameMakerModel } from '../../model/gameMaker';
import CanvasLayout from '../../model/shapes/layout';

export class CreateSpriteView {
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
    createSpriteButton.addEventListener('click', () =>
      this.handleCreateSpriteClicked(),
    );
    createSpriteModalButton.addEventListener('click', () => {
      this.handleCreateSpriteModalButtonClicked();
    });
  }

  handleCreateSpriteClicked() {
    this.toggleCreateSpriteModalDisplay();
  }

  handleCreateSpriteModalButtonClicked() {
    const { name, posX, posY, height, width, color, shape, actions } =
      this.getSpriteProperties();
    this.controller.createSprite(
      name,
      posX,
      posY,
      height,
      width,
      color,
      AllowedShapes[shape as keyof typeof AllowedShapes],
      actions.map(
        action => AllowedActions[action as keyof typeof AllowedActions],
      ),
    );
    this.toggleCreateSpriteModalDisplay();
    this.resetSelectedOptions();
  }

  getSpriteProperties() {
    return {
      name: spriteNameInput.value,
      posX: parseInt(spritePosXInput.value, 10),
      posY: parseInt(spritePosYInput.value, 10),
      height: parseInt(spriteHeightInput.value, 10),
      width: parseInt(spriteWidthInput.value, 10),
      color: spriteColorInput.value,
      shape:
        allowedShapesDropDown.options[allowedShapesDropDown.selectedIndex].text,
      actions: [...allowedActionsDropDown.selectedOptions].map(
        item => item.value,
      ),
    };
  }
  resetSelectedOptions() {
    allowedActionsDropDown.selectedIndex = -1;
  }

  toggleCreateSpriteModalDisplay() {
    createSpriteModal.style.display =
      createSpriteModal.style.display === 'block' ? 'none' : 'block';
  }
}
