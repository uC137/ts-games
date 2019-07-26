
export class GameScene extends Phaser.Scene {
    // tilemap
    private map: Phaser.Tilemaps.Tilemap;
    private tileset: Phaser.Tilemaps.Tileset;
    private backgroundLayer: Phaser.Tilemaps.StaticTilemapLayer;
    private foregroundLayer: Phaser.Tilemaps.StaticTilemapLayer;


    constructor() {
        super({key: "GameScene"});
    }

    init(): void {
    }

    create(): void {


        // create our tilemap from Tiled JSON
        this.map = this.make.tilemap({ key: this.registry.get("level") });
        // add our tileset and layers to our tilemap
        this.tileset = this.map.addTilesetImage("tileset");
        this.backgroundLayer = this.map.createStaticLayer("bgLayer",this.tileset,0,0);
        this.foregroundLayer = this.map.createStaticLayer("fgLayer",this.tileset,0,0);
        this.foregroundLayer.setName("fgLayer");
        //
        // // set collision for tiles with the property collide set to true
        this.foregroundLayer.setCollisionByProperty({ collide: true });


    }


    update(time: number): void {


    }

}
