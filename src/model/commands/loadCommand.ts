import { Command } from "../interfaces/command";
import { gameController } from "../../controller/index";
import { GameMakerModel } from "../gameMaker";

export class LoadCommand implements Command {

    constructor() {}

    execute(): void {
        let input = <HTMLInputElement>document.createElement('input');
        input.type = 'file';
        input.onchange = async () => {
            let contents = await input.files[0].text();
            let savedGameMakerModel = JSON.parse(contents).state as GameMakerModel;

            gameController.gameMakerController.saveGameProperties(savedGameMakerModel.name, savedGameMakerModel.lives, savedGameMakerModel.color);
            gameController.gameMakerController.createSpriteFromFile(savedGameMakerModel.sprites);
        }
        input.click()
    }

}
