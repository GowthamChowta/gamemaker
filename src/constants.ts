import { SoundCommand } from './model/commands/soundCommand';

// Canvas properties
export const canvasWidth = parseInt(
  document.getElementById('gameMaker').getAttribute('width'),
  10,
);
export const canvasHeight = parseInt(
  document.getElementById('gameMaker').getAttribute('height'),
  10,
);

export const stepSize = 18;

// HTML Elements
export const createSpriteButton: HTMLButtonElement = document.getElementById(
  'createSprite',
) as HTMLButtonElement;

export const createEventButton: HTMLButtonElement = document.getElementById(
  'createEvent',
) as HTMLButtonElement;

export const saveProgressButton: HTMLButtonElement = document.getElementById(
  'saveProgress',
) as HTMLButtonElement;

export const loadFileButton: HTMLButtonElement = document.getElementById(
  'loadGameMaker',
) as HTMLButtonElement;

export const gameProperties: HTMLButtonElement = document.getElementById(
  'gameProperties',
) as HTMLButtonElement;

export const saveGameProperties: HTMLButtonElement = document.getElementById(
  'saveGameProperties',
) as HTMLButtonElement;

export const gamePropertiesModal: HTMLButtonElement = document.getElementById(
  'gamePropertiesModal',
) as HTMLButtonElement;
export const createSpriteModal: HTMLButtonElement = document.getElementById(
  'createSpriteModal',
) as HTMLButtonElement;
export const createEventModal: HTMLButtonElement = document.getElementById(
  'createEventModal',
) as HTMLButtonElement;
export const createSpriteModalButton: HTMLButtonElement =
  document.getElementById('createSpriteButton') as HTMLButtonElement;

export const buildGameGameMakerView: HTMLButtonElement =
  document.getElementById('buildGame') as HTMLButtonElement;
export const startGamePlayView: HTMLButtonElement = document.getElementById(
  'startGame',
) as HTMLButtonElement;

// Game properties
export const gameNameInput: HTMLInputElement = document.getElementById(
  'gameName',
) as HTMLInputElement;
export const gameLivesInput: HTMLInputElement = document.getElementById(
  'gameLives',
) as HTMLInputElement;
export const gameBackgroundColorInput: HTMLInputElement =
  document.getElementById('backgroundColor') as HTMLInputElement;

export const gameNameTitle: HTMLHeadingElement = document.getElementById(
  'gameNameTitle',
) as HTMLHeadingElement;

export const spriteNameInput: HTMLInputElement = document.getElementById(
  'spriteName',
) as HTMLInputElement;

export const spritePosXInput: HTMLInputElement = document.getElementById(
  'posX',
) as HTMLInputElement;
export const spritePosYInput: HTMLInputElement = document.getElementById(
  'posY',
) as HTMLInputElement;

export const spriteHeightInput: HTMLInputElement = document.getElementById(
  'height',
) as HTMLInputElement;

export const spriteWidthInput: HTMLInputElement = document.getElementById(
  'width',
) as HTMLInputElement;

export const spriteColorInput: HTMLInputElement = document.getElementById(
  'spriteColor',
) as HTMLInputElement;

export const allowedShapesDropDown: HTMLSelectElement = document.getElementById(
  'allowedShapes',
) as HTMLSelectElement;

export const object1DropDown: HTMLSelectElement = document.getElementById(
  'obj1',
) as HTMLSelectElement;

export const object2DropDown: HTMLSelectElement = document.getElementById(
  'obj2',
) as HTMLSelectElement;

export const triggerEventDropDown: HTMLSelectElement = document.getElementById(
  'triggerEvent',
) as HTMLSelectElement;

export const targetActionDropDown: HTMLSelectElement = document.getElementById(
  'targetAction',
) as HTMLSelectElement;

export const createEventModalButton: HTMLButtonElement =
  document.getElementById('createEventButton') as HTMLButtonElement;

export const allowedActionsDropDown: HTMLSelectElement =
  document.getElementById('allowedActions') as HTMLSelectElement;

export const gameClock: HTMLElement = document.getElementById(
  'gameClock',
) as HTMLElement;
// Icon paths
export const wizardImagePath = './assets/wizard.png';
export const bombImagePath = './assets/bomb.png';
export const collisionSoundPath = './assets/collision.wav';
export const clickSoundPath = './assets/click2.wav';
export const notifcationSoundPath = './assets/notification.wav';
export const backgroundMusicPath = './assets/background.mp3';

export enum AllowedShapes {
  'Circle',
  'Rectangle',
  'Wizard',
  'Bomb',
}

export enum AllowedActions {
  'Disappear',
  'MoveLeft',
  'MoveRight',
  'MoveUp',
  'MoveDown',
  'MoveSelf',
  'FlipDirectionY',
  'GameOver',
}

export enum AllowedTriggerEvents {
  'InVicinity',
  'Collision',
}

let currentTime = 0;
const incrementTime = () => {
  currentTime += 1;
  gameClock.innerHTML = 'Time Elapsed: ' + currentTime;
};

startGamePlayView.addEventListener('click', () => {
  new SoundCommand().execute(backgroundMusicPath);
  setInterval(incrementTime, 1000);
});
