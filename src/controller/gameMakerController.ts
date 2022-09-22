import { createLayout2 } from '../brickLayouts/layout1';
import {
  AllowedActions,
  AllowedShapes,
  AllowedTriggerEvents,
} from '../constants';

import { EventManager } from '../model/eventManager';
import { checkCollisionEvent } from '../model/events/collision';

import { SaveCommand } from '../model/commands/saveCommand';
import { LoadCommand } from '../model/commands/loadCommand';

import { GameMakerModel } from '../model/gameMaker';
import { TriggerEvent } from '../model/interfaces/event';
import CanvasLayout from '../model/shapes/layout';
import { Sprite } from '../model/sprite';
import { createEventView } from '../view/gameMaker/createEventView';
import { CreateSpriteView } from '../view/gameMaker/createSpriteView';
import { GameMakerView } from '../view/gameMaker/gameMakerView';
import { GamePropertiesView } from '../view/gameMaker/gamePropertiesView';

export class GameMakerController {
  model: GameMakerModel;
  layout: CanvasLayout;
  gameMakerView: GameMakerView;
  sprites: Sprite[];
  gamePropertiesView: GamePropertiesView;
  createSpriteView: CreateSpriteView;
  createEventView: createEventView;

  constructor(model: GameMakerModel, layout: CanvasLayout) {
    this.model = model;
    this.layout = layout;
    this.gameMakerView = new GameMakerView(this, this.model, this.layout);
    this.gamePropertiesView = new GamePropertiesView(
      this,
      this.model,
      this.layout,
    );
    this.createSpriteView = new CreateSpriteView(this, this.model, this.layout);
    this.createEventView = new createEventView(this, this.model, this.layout);

    this.sprites = this.model.getSprites();
  }

  getGameMakerView() {
    return this.gameMakerView;
  }

  getCursorPosition(event: MouseEvent) {
    const rect = this.layout.canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    return { x, y };
  }
  isSpriteSelected(x: number, y: number) {
    this.sprites.forEach(sprite => {
      if (
        sprite.posX <= x &&
        x < sprite.posX + sprite.width &&
        sprite.posY <= y &&
        y < sprite.posY + sprite.height
      ) {
        sprite.setIsSelected(true);
      }
    });
  }
  handleMouseDown(event: MouseEvent) {
    const { x, y } = this.getCursorPosition(event);
    this.isSpriteSelected(x, y);
  }
  handleMouseUp(event: MouseEvent) {
    this.sprites.forEach(sprite => {
      sprite.setIsSelected(false);
    });
  }

  handleMouseMove(event: MouseEvent) {
    const { x, y } = this.getCursorPosition(event);
    this.sprites
      .filter(sprite => sprite.getIsSelected())
      .forEach(sprite => {
        sprite.setPositionX(x);
        sprite.setPositionY(y);
        this.gameMakerView.render();
      });
  }

  // handlePlayGame() {}

  saveGameProperties(name: string, lives: number, backgroundColor: string) {
    this.model.setLives(lives);
    this.model.setName(name);
    this.model.setColor(backgroundColor);
    this.gamePropertiesView.render();
  }
  createBrickLayout() {
    const bricks: Sprite[] = createLayout2(this.layout);
    bricks.forEach(sprite => this.model.addSprite(sprite));
    this.gameMakerView.render();
  }
  createSprite(
    name: string,
    posX: number,
    posY: number,
    height: number,
    width: number,
    color: string,
    shape: AllowedShapes,
    actions: AllowedActions[],
  ) {
    const newSprite = new Sprite(
      name,
      posX,
      posY,
      height,
      width,
      color,
      shape,
      this.layout.context,
    );
    this.createActionsOnSprite(newSprite, actions);
    this.model.addSprite(newSprite);

    this.gameMakerView.render();
  }
  createActionsOnSprite(sprite: Sprite, actions: AllowedActions[]) {
    actions.forEach(action => {
      sprite.addAction(action);
    });
  }

  createEvent(
    object1: string,
    object2: string,
    triggerEvent: string,
    targetAction: string,
  ) {
    const obj1Sprites: Sprite[] = this.model
      .getSprites()
      .filter(sprite => sprite.name == object1);
    const obj2Sprites: Sprite[] = this.model
      .getSprites()
      .filter(sprite => sprite.name == object2);
    const eventType =
      AllowedTriggerEvents[triggerEvent as keyof typeof AllowedTriggerEvents];
    // Note: an event will be attached between the objects with same name.
    // If there are two rectangles with same name. Then both these rectangles will be assigned the event.
    // Name is kind of type property.
    for (let i = 0; i < obj1Sprites.length; i++) {
      for (let j = 0; j < obj2Sprites.length; j++) {
        const obj1 = obj1Sprites[i];
        const obj2 = obj2Sprites[j];
        // Currently only collision event is supported
        let event: TriggerEvent;
        if (eventType == AllowedTriggerEvents.Collision) {
          event = new checkCollisionEvent(obj1, obj2);
        }
        const action =
          AllowedActions[targetAction as keyof typeof AllowedActions];

        const eventManager = new EventManager(obj1, obj2, event, action);
        this.model.addEvent(eventManager);
      }
    }
  }

  // handler for loading sprites from saved file
  createSpriteFromFile(sprites: Sprite[]) {
    sprites.forEach(sprite => {
      const newSprite = new Sprite(
        sprite.name,
        sprite.posX,
        sprite.posY,
        sprite.height,
        sprite.width,
        sprite.color,
        sprite.shape,
        this.layout.context,
      );

      sprite.actions.forEach(action => {
        newSprite.addAction(action);
      });

      this.model.addSprite(newSprite);
    });

    this.gameMakerView.render();
  }

  saveProgress() {
    new SaveCommand(this.model).execute();
  }

  loadFile() {
    new LoadCommand().execute();
  }
}
