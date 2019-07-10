import {GameScene} from "../scenes/gameScene";

export class Wheel {
    private scene: any;
    public canSpin: boolean;
    public slices = 8;
    public rotationTime = 3000;
    public slicePrizes = ["A KEY!!!", "50 STARS", "500 STARS", "BAD LUCK!!!", "200 STARS", "100 STARS", "150 STARS", "BAD LUCK!!!"];
    public prizeText: Phaser.GameObjects.Text;

    constructor(scene: GameScene) {
        this.scene = scene;
        this.prizeText = this.scene.add.text(this.scene.sys.canvas.width / 3, this.scene.sys.canvas.height - 35, "Spin the wheel", {
            font: "bold 32px Arial",
            align: "center",
            color: "black"
        });
    }


    spin(img) {
        // can we spin the wheel?
        if (this.canSpin) {

            // resetting text field
            this.prizeText.setText("");

            // the wheel will spin round from 2 to 4 times. This is just coreography
            var rounds = Phaser.Math.Between(2, 4);

            // then will rotate by a random number from 0 to 360 degrees. This is the actual spin
            var degrees = Phaser.Math.Between(0, 360);

            // before the wheel ends spinning, we already know the prize according to "degrees" rotation and the number of slices
            var prize = this.slices - 1 - Math.floor(degrees / (360 / this.slices));

            // now the wheel cannot spin because it's already spinning
            this.canSpin = false;


            // animation tweeen for the spin: duration 3s, will rotate by (360 * rounds + degrees) degrees
            // the quadratic easing will simulate friction
            let that = this;
            this.scene.tweens.add({

                // adding the wheel to tween targets
                targets: [img],

                // angle destination
                angle: 360 * rounds + degrees,

                // tween duration
                duration: this.rotationTime,

                // tween easing
                ease: "Cubic.easeOut",

                // callback scope
                callbackScope: this,

                // function to be executed once the tween has been completed

                onComplete: function (tween) {
                    // displaying prize text
                    that.prizeText.setText(that.slicePrizes[prize]);
                    // player can spin again
                    that.canSpin = true;
                }
            });
        }

    }

}
