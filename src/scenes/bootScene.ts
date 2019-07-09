export class BootScene extends Phaser.Scene {

    constructor() {
        super({key: "BootScene"});
    }

    preload(): void {
        this.load.image('wheel','wheel.png');
        this.load.image('pin','pin.png');
    }


    update(): void {
        this.scene.start("GameScene");
    }
}
