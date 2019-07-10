import {Wheel} from "../objects/wheel";

export class GameScene extends Phaser.Scene {
    private wheel: Wheel;

    constructor() {
        super({key: "GameScene"});
    }

    init(): void {
        this.wheel = new Wheel(this);
        this.wheel.canSpin = true;
    }

    preload(): void {
        this.load.image('wheel','./src/assets/images/wheel.png');
        this.load.image('pin','./src/assets/images/pin.png');
    }

    create(): void {
        // adding the wheel in the middle of the canvas
        this.add.sprite(this.sys.canvas.width / 2, this.sys.canvas.height / 2, "wheel");
        this.add.sprite(this.sys.canvas.width / 2, this.sys.canvas.height / 2, "pin");
        this.wheel.prizeText = this.add.text(this.sys.canvas.width / 3, this.sys.canvas.height - 35, "Spin the wheel", {
            font: "bold 32px Arial",
            align: "center",
            color: "white"
        });
        this.input.on('pointerdown', this.spinW , this);
    }

    public spinW() {
        console.log('canSpin ', this.wheel.canSpin);

        // can we spin the wheel?
        if (this.wheel.canSpin) {

            // resetting text field
            this.wheel.prizeText.setText("");

            // the this.wheel will spin round from 2 to 4 times. This is just coreography
            var rounds = Phaser.Math.Between(2, 4);

            // then will rotate by a random number from 0 to 360 degrees. This is the actual spin
            var degrees = Phaser.Math.Between(0, 360);

            // before the this.wheel ends spinning, we already know the prize according to "degrees" rotation and the number of slices
            var prize = this.wheel.slices - 1 - Math.floor(degrees / (360 / this.wheel.slices));

            // now the this.wheel cannot spin because it's already spinning
            this.wheel.canSpin = false;


            // animation tweeen for the spin: duration 3s, will rotate by (360 * rounds + degrees) degrees
            // the quadratic easing will simulate friction
            let that = this;
            this.tweens.add({
                // adding the this.wheel to tween targets
                targets: [this.wheel],
                // angle destination
                angle: 360 * rounds + degrees,
                // tween duration
                duration: this.wheel.rotationTime,
                // tween easing
                ease: "Cubic.easeOut",
                // callback scope
                callbackScope: this,
                // function to be executed once the tween has been completed
                onComplete: function (tween) {
                    // displaying prize text
                    that.wheel.prizeText.setText(that.wheel.slicePrizes[prize]);
                    // player can spin again
                    that.wheel.canSpin = true;
                }
            });
        }

    }

}
