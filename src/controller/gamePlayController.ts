import { AllowedActions } from '../constants';
import { DisappearAction } from '../model/actions/disapperAction';
import { FlipDirectionY } from '../model/actions/flipDirectionY';
import { GameOverAction } from '../model/actions/gameOverAction';
import { KeyBoardDownAction } from '../model/actions/keyboardDownAction';
import { KeyBoardLeftAction } from '../model/actions/keyboardLeftAction';
import { KeyBoardRightAction } from '../model/actions/keyboardRightAction';
import { KeyBoardUpAction } from '../model/actions/keyboardUpAction';
import { MoveSelf } from '../model/actions/moveSelf';
import { GameMakerModel } from '../model/gameMaker';
import { Action } from '../model/interfaces/action';
import CanvasLayout from '../model/shapes/layout';
import { Sprite } from '../model/sprite';
import { GamePlayView } from '../view/gamePlay/gamePlayView';

export class GamePlayController {
  model: GameMakerModel;
  layout: CanvasLayout;
  gamePlayView: GamePlayView;
  actionToCreate: MoveSelf;
  testAction: Action;
  constructor(model: GameMakerModel, layout: CanvasLayout) {
    this.model = model;
    this.layout = layout;
    this.gamePlayView = new GamePlayView(this, this.model, this.layout);
    this.testAction;
  }

  setActionOnSpriteByName(sprite: Sprite, action: AllowedActions) {
    let actionToCreate: Action;

    if (action === AllowedActions.MoveDown) {
      actionToCreate = new KeyBoardDownAction(sprite);
    } else if (action === AllowedActions.MoveLeft) {
      actionToCreate = new KeyBoardLeftAction(sprite);
    } else if (action === AllowedActions.MoveRight) {
      actionToCreate = new KeyBoardRightAction(sprite);
    } else if (action === AllowedActions.MoveUp) {
      actionToCreate = new KeyBoardUpAction(sprite);
    } else if (action === AllowedActions.Disappear) {
      actionToCreate = new DisappearAction(sprite);
    } else if (action === AllowedActions.MoveSelf) {
      this.testAction = new MoveSelf(sprite);
    } else if (action == AllowedActions.FlipDirectionY) {
      actionToCreate = new FlipDirectionY(sprite);
    } else if (action == AllowedActions.GameOver) {
      actionToCreate = new GameOverAction(sprite);
    } else {
      console.log('No Action found');
    }
    return actionToCreate;
  }
  setActions() {
    this.model.getSprites().forEach(sprite =>
      sprite.actions.forEach(action => {
        this.setActionOnSpriteByName(sprite, action);
      }),
    );
  }
  // TODO: Need to find a better way to call the perform action
  performActions() {
    if (this.testAction) this.testAction.performAction();
  }

  startGameLoop() {
    this.performActions();
    this.model.getEvents().forEach(event => {
      const triggerEvent = event.triggerEvent.checkEvent();
      if (triggerEvent == true) {
        const targetAction = this.setActionOnSpriteByName(
          event.object2,
          event.targetAction,
        );
        targetAction.performAction();
      }
    });
    this.gamePlayView.render();
    requestAnimationFrame(() => this.startGameLoop());
  }
}
