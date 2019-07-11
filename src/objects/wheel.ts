import {GameScene} from "../scenes/gameScene";

export class Wheel {
    private scene: any;
    public canSpin: boolean;
    public slices = 8;
    public rotationTime = 3000;
    public slicePrizes = ["ბუბლი ჯუჯა!!!", "50 ნადუღი", "500 მჰ", "ტყორინი", "200 ბუბლიდონა", "100 ნადუღი", "150 მჰ", "ტყორინი"];
    public prizeText: Phaser.GameObjects.Text;

    constructor(scene: GameScene) {
        this.scene = scene;
        this.prizeText = this.scene.add.text(this.scene.sys.canvas.width / 5, this.scene.sys.canvas.height - 40, "დაატრიალე ბედის ბორბალი", {
            font: "bold 24px Arial",
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
                    that.prizeText.setText("თქვენ ამოგივიდათ: " + that.slicePrizes[prize]);
                    that.soundMatch(prize, that.scene);

                    // player can spin again
                    that.canSpin = true;
                }
            });
        }

    }

    soundMatch(key, scene: GameScene) : void {
        switch (key) {
            case 0:
                scene.sound.play('bublijuja');
                break;
            case 1:
                scene.sound.play('nadugi');
                break;
            case 2:
                scene.sound.play('mh');
                break;
            case 3:
                scene.sound.play('tyorini');
                scene.cameras.main.shake(300);
                break;
            case 4:
                scene.sound.play('bublidona');
                break;
            case 5:
                scene.sound.play('nadugi');
                break;
            case 6:
                scene.sound.play('mh');
                break;
            case 7:
                scene.sound.play('tyorini');
                scene.cameras.main.shake(300);
                break;
        }
    }
}
