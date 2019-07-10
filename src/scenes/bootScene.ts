export class BootScene extends Phaser.Scene {

    constructor() {
        super({key: "BootScene"});
    }

    preload(): void {
        this.load.image('wheel', './src/assets/images/wheel.png');
        this.load.image('pin', './src/assets/images/pin.png');

        this.load.audio('sample','./src/sounds/sample.mp3')
        this.load.audio('bublidona','./src/sounds/bublidona.aac')
        this.load.audio('tyorini','./src/sounds/tyorini.aac')
    }

    update(): void {
        this.scene.start("GameScene");
    }
}
