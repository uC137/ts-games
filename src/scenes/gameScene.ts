import {Box} from "../objects/box";
import {Plant} from "../objects/plant";

export class GameScene extends Phaser.Scene {
    private foregroundLayer: Phaser.Tilemaps.StaticTilemapLayer;
    private map: Phaser.Tilemaps.Tilemap;
    private tileset: Phaser.Tilemaps.Tileset;
    private backgroundLayer: Phaser.Tilemaps.StaticTilemapLayer;

    // game objects
    private boxes: Phaser.GameObjects.Group;
    private bricks: Phaser.GameObjects.Group;
    private collectibles: Phaser.GameObjects.Group;
    private enemies: Phaser.GameObjects.Group;
    private platforms: Phaser.GameObjects.Group;
    private portals: Phaser.GameObjects.Group;
    private plant: Phaser.GameObjects.Group;

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

        // *****************************************************************
        // GAME OBJECTS
        // *****************************************************************
        this.portals = this.add.group({runChildUpdate: true});
        this.boxes = this.add.group({runChildUpdate: true});
        this.bricks = this.add.group({runChildUpdate: true});
        this.collectibles = this.add.group({runChildUpdate: true});
        this.enemies = this.add.group({runChildUpdate: true});
        this.platforms = this.add.group({runChildUpdate: true});
        this.plant = this.add.group({runChildUpdate: true});


        this.loadObjectsFromTilemap();

    }


    update(time: number): void {
    }


    private loadObjectsFromTilemap(): void {
        // get the object layer in the tilemap named 'objects'
        const objects = this.map.getObjectLayer("objects").objects as any[];

        objects.forEach(object => {

            if (object.type === "box") {
                this.boxes.add(new Box({scene: this, x: object.x, y: object.y, key: "box", content: object.properties.content}));
            }

            if (object.type === "plant") {
                this.plant.add(new Plant({scene: this, x: object.x, y: object.y, key: "plant"}));
            }


        });
    }

}
