import { AllowedActions } from '../constants';
import { TriggerEvent } from './interfaces/event';
import { Sprite } from './sprite';

export class EventManager {
  object1: Sprite;
  object2: Sprite;
  triggerEvent: TriggerEvent;
  targetAction: AllowedActions;

  constructor(
    object1: Sprite,
    object2: Sprite,
    triggerEvent: TriggerEvent,
    targetAction: AllowedActions,
  ) {
    this.object1 = object1;
    this.object2 = object2;
    this.triggerEvent = triggerEvent;
    this.targetAction = targetAction;
  }
}
