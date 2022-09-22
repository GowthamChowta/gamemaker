import { EventManager } from './eventManager';
import { TriggerEvent } from './interfaces/event';
import CanvasLayout from './shapes/layout';
import { Sprite } from './sprite';

export class GameMakerModel {
  name: string;
  lives: number;
  sprites: Sprite[];
  events: EventManager[];
  color: string;

  constructor() {
    this.lives = 3;
    this.sprites = [];
    this.events = [];
  }

  getName(): string {
    return this.name;
  }
  setName(name: string): void {
    this.name = name;
  }
  getLives(): number {
    return this.lives;
  }
  setLives(lives: number): void {
    this.lives = lives;
  }
  addSprite(newSprite: Sprite): void {
    this.sprites.push(newSprite);
  }
  getSprites(): Sprite[] {
    return this.sprites;
  }
  setSprites(sprites: Sprite[]) {
    this.sprites = sprites;
  }
  filterSprites() {
    this.sprites = this.sprites.filter(sprite => sprite.isVisible == true);
  }
  addEvent(newEvent: EventManager) {
    this.events.push(newEvent);
  }
  getEvents() {
    return this.events;
  }
  setColor(color: string) {
    this.color = color;
  }
  getColor() {
    return this.color;
  }

  getSpriteNames() {
    return this.sprites.map(sprite => sprite.name);
  }
}
