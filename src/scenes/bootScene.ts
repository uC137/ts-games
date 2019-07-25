export class BootScene extends Phaser.Scene {

    constructor() {
        super({key: "BootScene"});
    }

    preload(): void {
        this.cameras.main.setBackgroundColor(0x000000);

        // load our package
        this.load.pack(
            "preload",
            "src/assets/pack.json",
            "preload"
        );


    }


    update(): void {
        this.scene.start("MainMenuScene");
    }
}
