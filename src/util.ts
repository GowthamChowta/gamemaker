import {
  AllowedActions,
  allowedActionsDropDown,
  AllowedShapes,
  allowedShapesDropDown,
  AllowedTriggerEvents,
  canvasHeight,
  canvasWidth,
  clickSoundPath,
  stepSize,
  targetActionDropDown,
  triggerEventDropDown,
} from './constants';
import { SoundCommand } from './model/commands/soundCommand';
import { Sprite } from './model/sprite';

export const checkCollisionLeftWall = (sprite: Sprite) => {
  if (sprite.getPositionX() - stepSize - sprite.getWidth() / 2 >= 0) {
    return false;
  }
  return true;
};

export const checkCollisionRightWall = (sprite: Sprite) => {
  if (sprite.getPositionX() + sprite.getWidth() + stepSize <= canvasWidth) {
    return false;
  }
  return true;
};

export const checkCollisionTopWall = (sprite: Sprite) => {
  if (sprite.getPositionY() - stepSize - sprite.getHeight() / 2 >= 0) {
    return false;
  }
  return true;
};

export const checkCollisionDownWall = (sprite: Sprite) => {
  if (sprite.getPositionY() + sprite.getHeight() + stepSize <= canvasHeight) {
    return false;
  }
  return true;
};

export const setDropDownOptions = (
  options: string[],
  dropDownElement: HTMLSelectElement,
) => {
  // Remove the current options
  const L = dropDownElement.options.length - 1;
  for (let i = L; i >= 0; i--) {
    dropDownElement.remove(i);
  }
  // Add all the options again.
  for (const item of options.filter(v => isNaN(Number(v)))) {
    const dropDownOption = document.createElement('option');
    dropDownOption.setAttribute('id', 'multi-select');

    dropDownOption.value = item;
    dropDownOption.text = item;
    dropDownElement.appendChild(dropDownOption);
  }
};

setDropDownOptions(Object.keys(AllowedShapes), allowedShapesDropDown);
setDropDownOptions(Object.keys(AllowedActions), allowedActionsDropDown);
setDropDownOptions(Object.keys(AllowedTriggerEvents), triggerEventDropDown);
setDropDownOptions(Object.keys(AllowedActions), targetActionDropDown);

// Add sounds to all the buttons
const buttons = document.querySelectorAll('button');
buttons.forEach(button => {
  button.addEventListener('click', () => {
    new SoundCommand().execute(clickSoundPath);
  });
});
