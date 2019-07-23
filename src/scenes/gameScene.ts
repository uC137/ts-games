export class GameScene extends Phaser.Scene {
    private map: Phaser.Tilemaps.Tilemap;
    private tileset: Phaser.Tilemaps.Tileset;
    private layer: Phaser.Tilemaps.StaticTilemapLayer;


    private enemies: Phaser.GameObjects.Group;
    private obstacles: Phaser.GameObjects.Group;

    constructor() {
        super({key: "GameScene"});
    }

    init(): void {}

    create(): void{
        // create tilemap from tiled JSON
        this.map = this.make.tilemap({ key: "map" });

        this.tileset = this.map.addTilesetImage("tiles");
        this.layer = this.map.createStaticLayer("tileLayer", this.tileset, 0, 0);
        this.layer.setCollisionByProperty({ collide: true });

    }


    update(): void {
    }
}
