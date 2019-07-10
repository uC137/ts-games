export class BootScene extends Phaser.Scene {

    constructor() {
        super({key: "BootScene"});
    }

    preload(): void {
        this.load.image('wheel', './src/assets/images/wheel.png');
        this.load.image('pin', './src/assets/images/pin.png');
    }

    update(): void {
        this.scene.start("GameScene");
    }
}
