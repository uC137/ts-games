
export class GameScene extends Phaser.Scene {
    private foregroundLayer: Phaser.Tilemaps.StaticTilemapLayer;
    private map: Phaser.Tilemaps.Tilemap;
    private tileset: Phaser.Tilemaps.Tileset;
    private backgroundLayer: Phaser.Tilemaps.StaticTilemapLayer;

    constructor() {
        super({key: "GameScene"});
    }

    init(): void {}

    create(): void {
        // create our tilemap from Tiled JSON
        this.map = this.make.tilemap({ key: this.registry.get("level") });
        // // add our tileset and layers to our tilemap
        this.tileset = this.map.addTilesetImage("tiles");
        this.backgroundLayer = this.map.createStaticLayer("backgroundLayer",this.tileset,0,0);
        this.foregroundLayer = this.map.createStaticLayer("foregroundLayer",this.tileset,0,0);
        this.foregroundLayer.setName("foregroundLayer");
        // set collision for tiles with the property collide set to true
        this.foregroundLayer.setCollisionByProperty({ collide: true });


    }


    update(time: number): void {

    }


}
