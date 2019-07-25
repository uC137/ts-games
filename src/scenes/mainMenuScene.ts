export class MainMenuScene extends Phaser.Scene {
    private startKey: Phaser.Input.Keyboard.Key;
    private bitmapTexts: Phaser.GameObjects.BitmapText[] = [];

    constructor() {
        super({key: "MainMenuScene"});
    }


    init(): void {
        this.startKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        this.startKey.isDown = false;
    }

    create(): void {
        this.bitmapTexts.push(
            this.add.bitmapText(this.sys.canvas.width / 2 - 120,this.sys.canvas.height / 2,"font","PRESS ENTER TO PLAY",15),
            this.add.bitmapText(this.sys.canvas.width / 2 - 220,this.sys.canvas.height / 2 - 100,"font","ADVENTURER",50),
        );

    }


    update(): void {
        if (this.startKey.isDown) {
            console.log("start");
            //this.scene.start("GameScene");
        }
    }

}
