export class Enemy extends Phaser.GameObjects.Image {
    private health: number;
    private lastShoot: number;
    private speed: number;
    private barrel: Phaser.GameObjects.Image;
    private lifeBar: Phaser.GameObjects.Graphics;

    constructor(params) {
        super(params.scene, params.x, params.y, params.key, params.frame);

        this.initImage();
        this.scene.add.existing(this);
    }

    getBarbell() {
        return this.barrel;
    }

    private initImage() {

        // variables
        this.health = 1;
        this.lastShoot = 0;
        this.speed = 100;
        // image
        this.setDepth(0);

        this.barrel = this.scene.add.image(0, 0, "barrelRed");
        this.barrel.setOrigin(0.5, 1);
        this.barrel.setDepth(1);


        this.lifeBar = this.scene.add.graphics();
        this.redrawLifebar();


        // physics
        this.scene.physics.world.enable(this);
    }

    update(): void {
        if (this.active) {
            this.barrel.x = this.x;
            this.barrel.y = this.y;
            this.lifeBar.x = this.x;
            this.lifeBar.y = this.y;
            this.handleShooting();
        } else {
            this.destroy();
            this.barrel.destroy();
            this.lifeBar.destroy();
        }
    }


    private handleShooting() {

    }

    private redrawLifebar(): void {
        this.lifeBar.clear();
        this.lifeBar.fillStyle(0xe66a28, 1);
        this.lifeBar.fillRect(-this.width / 2, this.height / 2, this.width * this.health, 15);
        this.lifeBar.lineStyle(2, 0xffffff);
        this.lifeBar.strokeRect(-this.width / 2, this.height / 2, this.width, 15);
        this.lifeBar.setDepth(1);
    }

    public updateHealth(): void {
        if (this.health > 0) {
            this.health -= 0.05;
            this.redrawLifebar();
        } else {
            this.health = 0;
            this.active = false;
        }
    }
}










