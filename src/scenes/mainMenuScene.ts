export class MenuScene extends Phaser.Scene {
    private startKey: Phaser.Input.Keyboard.Key;
    private bitmapTexts: Phaser.GameObjects.BitmapText[] = [];

    constructor() {
        super({key: "MenuScene"});
    }

    init(): void {
        this.startKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    }

    create(): void {
        this.bitmapTexts.push(
            this.add.bitmapText(this.sys.canvas.width / 2 - 240,this.sys.canvas.height / 2 - 100,"font","TS-Games",100),
            this.add.bitmapText(this.sys.canvas.width/ 2 - 110,this.sys.canvas.height/2,"font","Press: ENTER",30),
        );

    }

    update(): void {
        if (this.startKey.isDown){
            this.scene.start("GameScene");
        }
    }
}
