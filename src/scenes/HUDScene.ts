export class HUDScene extends Phaser.Scene {
    private textElements: Map<string, Phaser.GameObjects.BitmapText>;
    private timer: Phaser.Time.TimerEvent;


    constructor() {
        super({key: "HUDScene"});
    }


    create(): void {
        this.textElements = new Map([
            ["LIVES", this.addText(0, 0, `TATE ${this.registry.get("lives")}`)],
            ["WORLDTIME", this.addText(80, 0, `${this.registry.get("worldTime")}`)],
            ["SCORE", this.addText(40, 8, `${this.registry.get("score")}`)],
            ["COINS", this.addText(80, 8, `${this.registry.get("coins")}`)],
            ["WORLD", this.addText(96, 8, `${this.registry.get("world")}`)],
            ["TIME", this.addText(136, 8, `${this.registry.get("time")}`)]
        ]);

        // create events
        const level = this.scene.get("GameScene");
        level.events.on("coinsChanged", this.updateCoins, this);
        level.events.on("livesChanged", this.updateLives, this);
        level.events.on("scoreChanged", this.updateScore, this);

    }

    private addText(x: number, y: number, value: string): Phaser.GameObjects.BitmapText {
        return this.add.bitmapText(x, y, "font", value, 8);
    }

    private updateCoins() {
        this.textElements.get("COINS").setText(`${this.registry.get("coins")}`).setX(80 - 8 * (this.registry.get("coins").toString().length - 1));
    }

    private updateLives() {
        this.textElements.get("LIVES").setText(`Lives: ${this.registry.get("lives")}`);
    }

    private updateScore() {
        this.textElements.get("SCORE").setText(`${this.registry.get("score")}`).setX(40 - 8 * (this.registry.get("score").toString().length - 1));
    }
}
