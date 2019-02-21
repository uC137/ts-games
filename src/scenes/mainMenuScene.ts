export class MainMenuScene extends Phaser.Scene {
    private startKey: Phaser.Input.Keyboard.Key;
    private bitmapTexts: Phaser.GameObjects.BitmapText[] = [];

    constructor() {
        super({key: "MainMenuScene"});

    }


    init(): void {
        this.startKey = this.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.ENTER
        );

        this.startKey.isDown = false;

    }

    create(): void {
        this.add.image(0, 0, "title").setOrigin(0, 0);

        this.bitmapTexts.push(
            this.add.bitmapText(
                this.sys.canvas.width / 2 - 22,
                105,
                "font",
                "START",
                8
            )
        );
    }


    update(): void {
        if (this.startKey.isDown) {
            // Load scene
           //this.scene.start("GameScene");
        }


    }

}
