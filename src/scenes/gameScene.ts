import {Snake} from "../objects/snake";
import {Apple} from "../objects/apple";
import {CONST} from "../objects/const";

export class GameScene extends Phaser.Scene {

    private background: Phaser.GameObjects.TileSprite;
    private scoreText: Phaser.GameObjects.BitmapText;
    private timer: Phaser.Time.TimerEvent;

    constructor() {
        super({key: "GameScene"});
    }

    init(): void {
        this.registry.set("score", -1);
    }

    create(): void {
        // objects
        this.background = this.add.tileSprite(0, 0, 590, 600, "background").setOrigin(0, 0);
        this.scoreText = this.add.bitmapText(this.sys.canvas.width / 2 - 14, 30, "font", this.registry.values.score).setDepth(2);

    }


    update(time: number): void {

    }

}
