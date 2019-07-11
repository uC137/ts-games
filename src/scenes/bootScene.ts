export class BootScene extends Phaser.Scene {

    constructor() {
        super({key: "BootScene"});
    }

    preload(): void {
        this.load.image('wheel', './src/assets/images/wheel.png');
        this.load.image('pin', './src/assets/images/pin.png');

        this.load.audio('bublidona','./src/assets/sounds/bublidona.mp3');
        this.load.audio('tyorini','./src/assets/sounds/tyorini.mp3');
        this.load.audio('nadugi','./src/assets/sounds/nadugi.mp3');
        this.load.audio('bublijuja','./src/assets/sounds/bublijuja.mp3');
    }

    update(): void {
        this.scene.start("GameScene");
    }
}
