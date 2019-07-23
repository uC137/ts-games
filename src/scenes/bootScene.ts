
export class BootScene extends Phaser.Scene {
    private loadingBar: Phaser.GameObjects.Graphics;
    private progressBar: Phaser.GameObjects.Graphics;

    constructor() {
        super({key: "BootScene"});
    }

    preload(): void {
        // set the background, create the loading and progress bar
        this.cameras.main.setBackgroundColor(0x000000);
        this.createLoadingGraphics();


        // pass value to change the loading bar fill
        this.load.on(
            "progress",
            (value) => {
                this.progressBar.clear();
                this.progressBar.fillStyle(0xfff6d3, 1);
                this.progressBar.fillRect(this.cameras.main.width / 4,this.cameras.main.height / 2 - 16,(this.cameras.main.width / 2) * value,16);
            },
            this
        );

        // delete bar graphics, when loading complete
        this.load.on(
            "complete",
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
        this.scene.start("MenuScene");
    }

    private createLoadingGraphics(): void {
        this.loadingBar = this.add.graphics();
        this.loadingBar.fillStyle(0x3b7fb2, 1);
        this.loadingBar.fillRect(this.cameras.main.width / 4 - 2,this.cameras.main.height / 2 - 18,this.cameras.main.width / 2 + 4,22);
        this.progressBar = this.add.graphics();
    }
}
