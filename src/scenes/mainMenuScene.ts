import {CONST} from "../objects/const";

export class MainMenuScene extends Phaser.Scene {
    private startKey: Phaser.Input.Keyboard.Key;
    private bitmapTexts: Phaser.GameObjects.BitmapText[] = [];

    constructor() {
        super({key:"MainMenuScene"});

    }


    init(): void {
        this.startKey = this.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.ENTER
        );

        if (CONST.SCORE > CONST.HIGHSCORE) {
            CONST.HIGHSCORE = CONST.SCORE;
        }
        CONST.SCORE = 0;
    }

    preload(): void {
        this.load.bitmapFont(
            "snakeFont",
            "./src/assets/snakeFont.png",
            "./src/assets/snakeFont.fnt"
        );
    }

    create(): void{
        this.bitmapTexts.push(
            this.add.bitmapText(
                this.sys.canvas.width / 2 - 46,
                this.sys.canvas.height / 2 - 10,
                "snakeFont",
                "Enter: PLAY",
                8
            )
        );

        this.bitmapTexts.push(
            this.add.bitmapText(
                this.sys.canvas.width / 2 - 70,
                this.sys.canvas.height / 2 - 60,
                "snakeFont",
                "S N A K E",
                16
            )
        );

        this.bitmapTexts.push(
            this.add.bitmapText(
                this.sys.canvas.width / 2 - 45,
                this.sys.canvas.height / 2 + 30,
                "snakeFont",
                "HIGHSCORE: " + CONST.HIGHSCORE,
                8
            )
        );


    }


    update(): void {
        if (this.startKey.isDown) {
            this.scene.start("GameScene");
        }
    }

}