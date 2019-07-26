export class MainMenuScene extends Phaser.Scene {
    private startKey: Phaser.Input.Keyboard.Key;
    private bitmapTexts: Phaser.GameObjects.BitmapText[] = [];

    constructor() {
        super({key: "MainMenuScene"});
    }


    init(): void {
        this.startKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        this.startKey.isDown = false;
        this.initGlobalData();
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


    private initGlobalData(): void {
        this.registry.set("time", 500);
        this.registry.set("level", "level1");
        this.registry.set("world", "1-1");
        this.registry.set("worldTime", "WORLD TIME");
        this.registry.set("score", 0);
        this.registry.set("lives", 2);
        this.registry.set("liveBar", 100);
        this.registry.set("spawn", { x: 12, y: 44, dir: "down" });
    }

}
