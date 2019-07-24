import {Player} from "../objects/player";
import {Enemy} from "../objects/enemy";
import {Obstacle} from "../objects/obstacle";

export class GameScene extends Phaser.Scene {
    private map: Phaser.Tilemaps.Tilemap;
    private tileset: Phaser.Tilemaps.Tileset;
    private layer: Phaser.Tilemaps.StaticTilemapLayer;


    private player: Player;
    private enemies: Phaser.GameObjects.Group;
    private obstacles: Phaser.GameObjects.Group;

    constructor() {
        super({key: "GameScene"});
    }

    init(): void {
    }

    create(): void {
        // create tilemap from tiled JSON
        this.map = this.make.tilemap({key: "map"});

        this.tileset = this.map.addTilesetImage("tiles");
        this.layer = this.map.createStaticLayer("tileLayer", this.tileset, 0, 0);
        this.layer.setCollisionByProperty({collide: true});

        this.obstacles = this.add.group({runChildUpdate: true});
        this.enemies = this.add.group({});
        this.initObjects();

        this.physics.add.collider(this.player, this.layer);
        this.physics.add.collider(this.player, this.obstacles);


        this.cameras.main.startFollow(this.player);
        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);


        this.enemies.children.each((enemy: Enemy) => {

            //
            // this.physics.add.overlap(
            //     this.player.getBullets(),
            //     enemy,
            //     this.playerBulletHitEnemy,
            //     null,
            //     this
            // );
            // this.physics.add.overlap(
            //     enemy.getBullets(),
            //     this.player,
            //     this.enemyBulletHitPlayer,
            //     null
            // );
            //
            // this.physics.add.collider(
            //     enemy.getBullets(),
            //     this.obstacles,
            //     this.bulletHitObstacles,
            //     null
            // );
            // this.physics.add.collider(
            //     enemy.getBullets(),
            //     this.layer,
            //     this.bulletHitLayer,
            //     null
            // );
        }, this);


    }


    update(): void {
        this.player.update();

        this.enemies.children.each((enemy: Enemy) => {
            enemy.update();

            if (this.player.active && enemy.active) {
                let angle = Phaser.Math.Angle.Between(enemy.body.x, enemy.body.y, this.player.body.x, this.player.body.y);
                let distance = Phaser.Math.Distance.Between(enemy.body.x, enemy.body.y, this.player.body.x, this.player.body.y);
                if (distance < 500) {
                    enemy.getBarbell().angle = (angle + Math.PI / 2) * Phaser.Math.RAD_TO_DEG
                }
            }


        })

    }


    private initObjects(): void {
        // find the object layer in the tilemap named 'objects'
        const objects = this.map.getObjectLayer("objects").objects as any[];
        objects.map((obj) => {
            if (obj.type === "player") {
                this.player = new Player({scene: this, x: obj.x, y: obj.y, key: "tankBlue"});
            } else if (obj.type === "enemy") {
                let enemy = new Enemy({scene: this, x: obj.x, y: obj.y, key: "tankRed"});
                this.enemies.add(enemy);
            } else {
                let obstacle = new Obstacle({scene: this, x: obj.x, y: obj.y - 40, key: obj.type});
                this.obstacles.add(obstacle);
            }
        });
    }

    private bulletHitLayer(bullet): void {
        bullet.destroy();
    }

    private bulletHitObstacles(bullet, obstacle): void {
        bullet.destroy();
    }

    private playerBulletHitEnemy(bullet, enemy): void {
        bullet.destroy();
        enemy.updateHealth();
    }

    private enemyBulletHitPlayer(bullet, player): void {
        bullet.destroy();
        player.updateHealth();
    }

}
