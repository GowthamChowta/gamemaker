import { Command } from '../interfaces/command';

export class SoundCommand implements Command {
  execute(soundPath?: string): void {
    const sound = new Audio(soundPath);
    sound.play();
  }
}
