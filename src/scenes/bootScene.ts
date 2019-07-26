export class BootScene extends Phaser.Scene {
    // graphics
    private loadingBar: Phaser.GameObjects.Graphics;
    private progressBar: Phaser.GameObjects.Graphics;

    constructor() {
        super({key: "BootScene"});
    }

    preload(): void {
        this.createLoadingGraphics();

        // pass value to change the loading bar fill
        this.load.on("progress",
            (value) => {
                this.progressBar.clear();
                this.progressBar.fillStyle(0x88e453, 1);
                this.progressBar.fillRect(
                    this.cameras.main.width / 4,
                    this.cameras.main.height / 2 - 16,
                    (this.cameras.main.width / 2) * value,
                    16
                );
            },
            this
        );

        // delete bar graphics, when loading complete
        this.load.on("complete",
            () => {
                this.progressBar.destroy();
                this.loadingBar.destroy();
            },
            this
        );

        // load our package
        this.load.pack("preload", "src/assets/pack.json", "preload");
    }


    update(): void {
        this.scene.start("MainMenuScene");
    }



    private createLoadingGraphics(): void {
        this.loadingBar = this.add.graphics();
        this.loadingBar.fillStyle(0xffffff, 1);
        this.loadingBar.fillRect(
            this.cameras.main.width / 4 - 2,
            this.cameras.main.height / 2 - 18,
            this.cameras.main.width / 2 + 4,
            20
        );
        this.progressBar = this.add.graphics();
    }


}
