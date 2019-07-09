import {Wheel} from "../objects/wheel";

export class GameScene extends Phaser.Scene {
    private wheel: Wheel;

    constructor() {
        super({key: "GameScene"});
    }

    init(): void {
    }

    create(): void {
        this.wheel = new Wheel(this);
        // adding the wheel in the middle of the canvas
        this.add.sprite(this.sys.canvas.width / 2, this.sys.canvas.height / 2, "wheel");
        this.add.sprite(this.sys.canvas.width / 2, this.sys.canvas.height / 2, "pin");
        // adding the text field
        this.add.text(this.sys.canvas.width / 3, this.sys.canvas.height - 40, "Spin the wheel", {
            font: "bold 32px Arial",
            align: "center",
            color: "white"
        });

        this.wheel.canSpin = false;
        this.input.on('pointerdown', this.wheel.spinWheel , this);

    }


    update(time: number): void {
    }


}
