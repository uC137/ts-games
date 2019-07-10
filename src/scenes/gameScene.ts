import {Wheel} from "../objects/wheel";

export class GameScene extends Phaser.Scene {
    private wheel: Wheel;
    private wheelImg: Phaser.GameObjects.Sprite;

    constructor() {
        super({key: "GameScene"});
    }


    create(): void {
        this.wheel = new Wheel(this);
        this.wheel.canSpin = true;
        // adding the wheel in the middle of the canvas
        this.wheelImg = this.add.sprite(this.sys.canvas.width / 2, this.sys.canvas.height / 2, "wheel");
        this.add.sprite(this.sys.canvas.width / 2, this.sys.canvas.height / 2, "pin");
        this.wheel.prizeText = this.add.text(this.sys.canvas.width / 3, this.sys.canvas.height - 35, "Spin the wheel", {
            font: "bold 32px Arial",
            align: "center",
            color: "black"
        });
        this.input.on('pointerdown', () => this.wheel.spin(this.wheelImg), this);
    }

}
