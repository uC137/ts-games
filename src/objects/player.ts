export class Player extends Phaser.GameObjects.Image {
    private lastShoot: number;
    private health: number;
    private speed: number;
    private barrel: Phaser.GameObjects.Image;
    private lifeBar: Phaser.GameObjects.Graphics;
    private bullets: Phaser.GameObjects.Group;

    //input
    private cursors: Phaser.Input.Keyboard.CursorKeys;
    private rotateKeyLeft: Phaser.Input.Keyboard.Key;
    private rotateKeyRight: Phaser.Input.Keyboard.Key;
    private shootingKey: Phaser.Input.Keyboard.Key;

    constructor(params) {
        super(params.scene, params.x, params.y, params.key, params.frame);

        this.initImage();
        this.scene.add.existing(this);
    }


    private initImage() {
        // variables
        this.health = 1;
        this.lastShoot = 0;
        this.speed = 300;

        // image
        this.setOrigin(0.5, 0.5);
        this.setDepth(0);
        this.angle = 180;

        this.barrel = this.scene.add.image(this.x, this.y, "barrelBlue");
        this.barrel.setOrigin(0.5, 1);
        this.barrel.setDepth(1);
        this.barrel.angle = 180;

        this.lifeBar = this.scene.add.graphics();
        this.redrawLifebar();

        // game objects
        this.bullets = this.scene.add.group({active: true, maxSize: 10, runChildUpdate: true});

        // input
        this.cursors = this.scene.input.keyboard.createCursorKeys();
        this.rotateKeyLeft = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.rotateKeyRight = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.shootingKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // physics
        this.scene.physics.world.enable(this);
    }

    update(): void {

        if (this.active) {
            this.barrel.x = this.x;
            this.barrel.y = this.y;
            this.lifeBar.x = this.x;
            this.lifeBar.y = this.y;


            this.handleInput();


        } else {
            this.destroy();
            this.barrel.destroy();
            this.lifeBar.destroy();
        }


    }


    private handleInput() {
        // move tank forward
        // small corrections with (- MATH.PI / 2) to align tank correctly
        if (this.cursors.up.isDown) {
            this.scene.physics.velocityFromRotation(this.rotation - Math.PI / 2, this.speed, this.body.velocity);
        } else if (this.cursors.down.isDown) {
            this.scene.physics.velocityFromRotation(this.rotation - Math.PI / 2, -this.speed, this.body.velocity);
        } else {
            this.body.setVelocity(0, 0,);
        }

        // rotate tank
        if (this.cursors.left.isDown) {
            this.rotation -= 0.02;
        } else if (this.cursors.right.isDown) {
            this.rotation += 0.02;
        }


        // rotate barrel
        if (this.rotateKeyLeft.isDown) {
            this.barrel.rotation -= 0.05;
        } else if (this.rotateKeyRight.isDown) {
            this.barrel.rotation += 0.05;
        }


    }

    public getBullets(): Phaser.GameObjects.Group {
        return this.bullets;
    }

    private redrawLifebar() {

    }
}
