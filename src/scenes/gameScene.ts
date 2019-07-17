import {Box} from "../objects/box";
import {Plant} from "../objects/plant";
import {Brick} from "../objects/brick";
import {Collectible} from "../objects/collectible";
import {Goomba} from "../objects/goomba";
import {Portal} from "../objects/portal";
import {Tate} from "../objects/tate";

export class GameScene extends Phaser.Scene {
    private backgroundLayer: Phaser.Tilemaps.StaticTilemapLayer;
    private foregroundLayer: Phaser.Tilemaps.StaticTilemapLayer;
    private map: Phaser.Tilemaps.Tilemap;
    private tileset: Phaser.Tilemaps.Tileset;

    // game objects
    private boxes: Phaser.GameObjects.Group;
    private bricks: Phaser.GameObjects.Group;
    private collectibles: Phaser.GameObjects.Group;
    private enemies: Phaser.GameObjects.Group;
    private platforms: Phaser.GameObjects.Group;
    private portals: Phaser.GameObjects.Group;
    private plant: Phaser.GameObjects.Group;
    private player: Tate;

    constructor() {
        super({key: "GameScene"});
    }

    init(): void {
    }

    create(): void {
        // create our tilemap from Tiled JSON
        this.map = this.make.tilemap({key: this.registry.get("level")});
        // // add our tileset and layers to our tilemap
        this.tileset = this.map.addTilesetImage("tiles");
        this.backgroundLayer = this.map.createStaticLayer("backgroundLayer", this.tileset, 0, 0);
        this.foregroundLayer = this.map.createStaticLayer("foregroundLayer", this.tileset, 0, 0);
        this.foregroundLayer.setName("foregroundLayer");
        // set collision for tiles with the property collide set to true
        this.foregroundLayer.setCollisionByProperty({collide: true});

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

        // *****************************************************************
        // CAMERA
        // *****************************************************************
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);


        // *****************************************************************
        // COLLIDERS
        // *****************************************************************
        this.physics.add.collider(this.player, this.foregroundLayer);
        this.physics.add.collider(this.player, this.bricks);
        this.physics.add.collider(this.enemies, this.foregroundLayer);
        this.physics.add.collider(this.enemies, this.boxes);
        this.physics.add.collider(this.enemies, this.bricks);

        this.physics.add.collider(this.player, this.boxes, this.playerHitBox, null, this);

        this.physics.add.overlap(this.player, this.enemies);
        this.physics.add.overlap(this.player, this.portals);
        this.physics.add.overlap(this.player, this.platforms);
        this.physics.add.overlap(this.player, this.collectibles);


    }


    update(time: number): void {
        this.player.update();
    }

    /**
     * Player <-> Box Collision
     * @param _player [Tate]
     * @param _box    [Box]
     */
    private playerHitBox(_player: Tate, _box: Box): void {
        if (_box.body.touching.down && _box.active) {
            // ok, mario has really hit a box on the downside
            _box.yoyoTheBoxUpAndDown();
            this.collectibles.add(_box.spawnBoxContent());

            switch (_box.boxContent) {

                case "coin": {
                    _box.tweenBoxContent({y: _box.y - 40, alpha: 0}, 700, function () {
                        _box.getContent().destroy();
                    });

                    //_box.addCoinAndScore(1, 100);
                    break;
                }
                case "rotatingCoin": {
                    _box.tweenBoxContent({y: _box.y - 40, alpha: 0}, 700, function () {
                        _box.getContent().destroy();
                    });

                    //_box.addCoinAndScore(1, 100);
                    break;
                }
                case "flower": {
                    _box.tweenBoxContent({y: _box.y - 8}, 200, function () {
                        _box.getContent().anims.play("flower");
                    });

                    break;
                }
                case "mushroom": {
                    _box.popUpCollectible();
                    break;
                }
                case "star": {
                    _box.popUpCollectible();
                    break;
                }
                default: {
                    break;
                }
            }
            _box.startHitTimeline();
        }
    }


    private loadObjectsFromTilemap(): void {
        // get the object layer in the tilemap named 'objects'
        const objects = this.map.getObjectLayer("objects").objects as any[];

        objects.forEach(object => {


            if (object.type === "portal") {
                this.portals.add(
                    new Portal({
                        scene: this, x: object.x, y: object.y, height: object.width, width: object.height,
                        spawn: {
                            x: object.properties.marioSpawnX,
                            y: object.properties.marioSpawnY,
                            dir: object.properties.direction
                        }
                    }).setName(object.name)
                );
            }

            if (object.type === "player") {
                this.player = new Tate({scene: this, x: this.registry.get("spawn").x, y: this.registry.get("spawn").y, key: "tate"});
            }

            if (object.type === "plant") {
                this.plant.add(new Plant({scene: this, x: object.x, y: object.y, key: "plant"}));
            }
            if (object.type === "box") {
                this.boxes.add(new Box({scene: this, x: object.x, y: object.y, key: "box", content: object.properties.content}));
            }
            if (object.type === "brick") {
                this.bricks.add(new Brick({scene: this, x: object.x, y: object.y, key: "brick"}));
            }

            if (object.type === "collectible") {
                this.collectibles.add(new Collectible({
                    scene: this,
                    x: object.x,
                    y: object.y,
                    key: object.properties.kindOfCollectible,
                    points: 100
                }));
            }

            if (object.type === "goomba") {
                this.enemies.add(new Goomba({scene: this, x: object.x, y: object.y, key: "goomba"}));
            }


        });
    }

}
