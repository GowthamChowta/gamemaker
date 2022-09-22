import { Action } from '../interfaces/action';

export class DoNothingAction implements Action {
  performAction(): void {
    // do nothing
  }
  registerView(): void {
    throw new Error('Method not implemented.');
  }
}
