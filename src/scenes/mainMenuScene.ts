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
        this.initGlobalDataManager();
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
           this.scene.start("GameScene");
        }


    }

    private initGlobalDataManager(): void {
        this.registry.set("time", 400);
        this.registry.set("level", "level1");
        this.registry.set("world", "1-1");
        this.registry.set("worldTime", "WORLD TIME");
        this.registry.set("score", 0);
        this.registry.set("coins", 0);
        this.registry.set("lives", 3);
        this.registry.set("spawn", { x: 12, y: 44, dir: "down" });
        this.registry.set("marioSize", "small");
    }

}
