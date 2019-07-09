export class Wheel {

    private spin: Phaser.Input.Keyboard.Key;
    public canSpin: boolean;

    constructor(scene) {

    }

    create() {

    }

    update(): void {
        // handle angle change

        // handle input
        if (this.spin.isDown && !this.canSpin) {

        }

    }

    spinWheel() {
        console.log('Spining');
    }

}
