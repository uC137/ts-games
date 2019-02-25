export class GameScene extends Phaser.Scene {
    private map: Phaser.Tilemaps.Tilemap;
    private tileset: Phaser.Tilemaps.Tileset;
    // field and game setting

    constructor() {
        super({key: "GameScene"});
    }

    init(): void {
    }

    create(): void {
        // create our tilemap from Tiled JSON
        this.map = this.make.tilemap({ key: this.registry.get("level") });
        this.tileset = this.map.addTilesetImage("tiles");
    }


    update(time: number): void {
    }


}
