import { GameMakerModel } from '../gameMaker';
import { Command } from '../interfaces/command';

export class SaveCommand implements Command {
  currentState: GameMakerModel;

  constructor(currentState: GameMakerModel) {
    this.currentState = currentState;
  }

  execute(): void {
    const serializedState = JSON.stringify(
      { state: this.currentState },
      null,
      4,
    );
    const file = new Blob([serializedState], { type: 'json' });
    const fileRoute = window.URL.createObjectURL(file);
    const a = document.createElement('a');
    a.setAttribute('href', fileRoute);
    a.setAttribute('download', `game_maker_${this.getFormattedTime()}.json`);
    document.getElementById('saveProgress').appendChild(a);
    a.click();
    document.getElementById('saveProgress').removeChild(a);
  }

  private getFormattedTime(): string {
    const now = new Date();
    return `${now.getMinutes()}_${now.getSeconds()}`;
  }
}
