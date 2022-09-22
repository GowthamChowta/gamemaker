import {
  createEventButton,
  createEventModal,
  createEventModalButton,
  object1DropDown,
  object2DropDown,
  targetActionDropDown,
  triggerEventDropDown,
} from '../../constants';
import { GameMakerController } from '../../controller/gameMakerController';
import { GameMakerModel } from '../../model/gameMaker';
import CanvasLayout from '../../model/shapes/layout';
import { setDropDownOptions } from '../../util';

export class createEventView {
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
    createEventButton.addEventListener('click', () => {
      this.toggleCreateEventModalDisplay();
    });
    createEventModalButton.addEventListener('click', () => {
      this.handleCreateEventModalButtonClicked();
    });
  }

  handleCreateEventModalButtonClicked() {
    const { object1, object2, triggerEvent, targetAction } =
      this.getEventProperties();
    this.controller.createEvent(object1, object2, triggerEvent, targetAction);
    this.toggleCreateEventModalDisplay();
  }

  getEventProperties() {
    return {
      object1: object1DropDown.options[object1DropDown.selectedIndex].text,
      object2: object2DropDown.options[object2DropDown.selectedIndex].text,
      triggerEvent:
        triggerEventDropDown.options[triggerEventDropDown.selectedIndex].text,
      targetAction:
        targetActionDropDown.options[targetActionDropDown.selectedIndex].text,
    };
  }

  toggleCreateEventModalDisplay() {
    const spriteNames = Array.from(new Set(this.model.getSpriteNames()));
    console.log('sprite names are', spriteNames);
    setDropDownOptions(spriteNames, object1DropDown);
    setDropDownOptions(spriteNames, object2DropDown);
    createEventModal.style.display =
      createEventModal.style.display === 'block' ? 'none' : 'block';
  }
}
