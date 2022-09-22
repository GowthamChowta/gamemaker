import { collisionSoundPath } from '../../constants';
import { SoundCommand } from '../commands/soundCommand';
import { TriggerEvent } from '../interfaces/event';
import { Circle } from '../shapes/circle';
import { Sprite } from '../sprite';

export class checkCollisionEvent implements TriggerEvent {
  obj1: Sprite;
  obj2: Sprite;
  constructor(obj1: Sprite, obj2: Sprite) {
    this.obj1 = obj1;
    this.obj2 = obj2;
  }

  checkEvent(): boolean {
    const obj1PosX = this.obj1.getPositionX();
    const obj1PosY = this.obj1.getPositionY();
    const obj1Width = this.obj1.getWidth();
    const obj1Height = this.obj1.getHeight();

    const obj2PosX = this.obj2.getPositionX();
    const obj2PosY = this.obj2.getPositionY();
    const obj2Width = this.obj2.getWidth();
    const obj2Height = this.obj2.getHeight();

    if (
      !(
        this.obj1.canvasElement instanceof Circle ||
        this.obj2.canvasElement instanceof Circle
      )
    ) {
      return this.checkCollisionBetweenRectAndRect(
        obj1PosX,
        obj1PosY,
        obj1Height,
        obj1Width,
        obj2PosX,
        obj2PosY,
        obj2Height,
        obj2Width,
      );
    } else {
      return this.checkCollisionBetweenCircleAndRect(
        obj1PosX,
        obj1PosY,
        obj1Height,
        obj1Width,
        obj2PosX,
        obj2PosY,
        obj2Height,
        obj2Width,
      );
    }
  }

  checkCollisionBetweenRectAndRect(
    obj1PosX: number,
    obj1PosY: number,
    obj1Height: number,
    obj1Width: number,
    obj2PosX: number,
    obj2PosY: number,
    obj2Height: number,
    obj2Width: number,
  ) {
    if (
      ((obj2PosY > obj1PosY && obj2PosY < obj1PosY + obj1Height) ||
        (obj2PosY < obj1PosY && obj1PosY < obj2PosY + obj2Height)) &&
      ((obj1PosX + obj1Width > obj2PosX && obj1PosX < obj2PosX + obj2Width) ||
        (obj2PosX + obj2Width > obj1PosX && obj2PosX < obj1PosX + obj1Width))
    ) {
      new SoundCommand().execute(collisionSoundPath);
      return true;
    }
    return false;
  }
  checkCollisionBetweenCircleAndRect(
    obj1PosX: number,
    obj1PosY: number,
    obj1Height: number,
    obj1Width: number,
    obj2PosX: number,
    obj2PosY: number,
    obj2Height: number,
    obj2Width: number,
  ) {
    if (
      obj2PosX + obj2Width + obj1Width > obj1PosX &&
      obj2PosX < obj1PosX + obj1Width &&
      obj2PosY + obj2Height + obj1Width > obj1PosY &&
      obj2PosY < obj1PosY + obj1Width
    ) {
      new SoundCommand().execute(collisionSoundPath);
      return true;
    }

    return false;
  }
}
