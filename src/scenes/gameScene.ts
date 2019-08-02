import {Player} from "../objects/player";

export class GameScene extends Phaser.Scene {
    // tilemap
    private map: Phaser.Tilemaps.Tilemap;
    private tileset: Phaser.Tilemaps.Tileset;
    private backgroundLayer: Phaser.Tilemaps.StaticTilemapLayer;
    private foregroundLayer: Phaser.Tilemaps.StaticTilemapLayer;
    private player: Player;


    constructor() {
        super({key: "GameScene"});
    }

    init(): void {
    }

    create(): void {


        // create our tilemap from Tiled JSON
        this.map = this.make.tilemap({key: this.registry.get("level")});
        // add our tileset and layers to our tilemap
        this.tileset = this.map.addTilesetImage("tileset");
        this.backgroundLayer = this.map.createStaticLayer("bgLayer", this.tileset, 0, 0);
        this.foregroundLayer = this.map.createStaticLayer("fgLayer", this.tileset, 0, 0);
        this.foregroundLayer.setName("fgLayer");

        // set collision for tiles with the property collide set to true
        this.foregroundLayer.setCollisionByProperty({collide: true});

        this.loadObjectsFromTilemap();


        // *****************************************************************
        // COLLIDERS
        // *****************************************************************
        this.physics.add.collider(this.player, this.foregroundLayer);


        // *****************************************************************
        // CAMERA
        // *****************************************************************
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels -5);

    }


    update(time: number): void {
        this.player.update(time);
    }


    private loadObjectsFromTilemap(): void {
        // get the object layer in the tilemap named 'objects'
        const objects = this.map.getObjectLayer("objects").objects as any[];

        objects.forEach(object => {
            if (object.type === "portal") {
                // this.portals.add(
                //     new Portal({
                //         scene: this,
                //         x: object.x,
                //         y: object.y,
                //         height: object.width,
                //         width: object.height,
                //         spawn: {
                //             x: object.properties.marioSpawnX,
                //             y: object.properties.marioSpawnY,
                //             dir: object.properties.direction
                //         }
                //     }).setName(object.name)
                // );
            }

            if (object.type === "player") {
                this.player = new Player({scene: this, x: this.registry.get("spawn").x, y: this.registry.get("spawn").y, key: "player"});
            }

            if (object.type === "collectible") {
                // this.collectibles.add(
                //     // new Collectible({scene: this,x: object.x,y: object.y,key: object.properties.kindOfCollectible,points: 100})
                // );
            }

            // if (object.type === "platformMovingUpAndDown") {
            //     this.platforms.add(
            //         new Platform({
            //             scene: this,
            //             x: object.x,
            //             y: object.y,
            //             key: "platform",
            //             tweenProps: {
            //                 y: {
            //                     value: 50,
            //                     duration: 1500,
            //                     ease: "Power0"
            //                 }
            //             }
            //         })
            //     );
            // }
            //
            // if (object.type === "platformMovingLeftAndRight") {
            //     this.platforms.add(
            //         new Platform({
            //             scene: this,
            //             x: object.x,
            //             y: object.y,
            //             key: "platform",
            //             tweenProps: {
            //                 x: {
            //                     value: object.x + 50,
            //                     duration: 1200,
            //                     ease: "Power0"
            //                 }
            //             }
            //         })
            //     );
            // }
        });
    }

}
