export class Tate extends Phaser.GameObjects.Sprite {
    // variables
    currentScene: Phaser.Scene;
    tateSize: string;
    acceleration: number;
    isJumping: boolean;
    isDying: boolean;
    isVulnerable: boolean;
    vulnerableCounter: number;

    // input
    keys: Map<string, Phaser.Input.Keyboard.Key>;

    getKeys(): Map<string, Phaser.Input.Keyboard.Key> {
        return this.keys;
    }

    constructor(params) {
        super(params.scene, params.x, params.y, params.key, params.frame);

        this.currentScene = params.scene;
        this.initSprite();
        this.currentScene.add.existing(this);
    }

    private initSprite() {
        // variables
        this.tateSize = this.currentScene.registry.get("tateSize");
        this.acceleration = 500;
        this.isJumping = false;
        this.isDying = false;
        this.isVulnerable = true;
        this.vulnerableCounter = 100;

        // sprite
        this.setOrigin(0.5, 0.5);
        this.setFlipX(false);

        // input
        this.keys = new Map([
            ["LEFT", this.addKey("LEFT")],
            ["RIGHT", this.addKey("RIGHT")],
            ["DOWN", this.addKey("DOWN")],
            ["JUMP", this.addKey("SPACE")]
        ]);


        // physics
        this.currentScene.physics.world.enable(this);
        this.body.maxVelocity.x = 50;
        this.body.maxVelocity.y = 300;
    }

    update(): void {
        if (!this.isDying) {
            this.handleInput();
            this.handleAnimations();
        } else {
            this.currentScene.sound.stopAll();
            this.currentScene.sound.play('die');
            this.setFrame(12);
            if (this.y > this.currentScene.sys.canvas.height) {
                this.currentScene.scene.stop("GameScene");
                this.currentScene.scene.stop("HUDScene");
                this.currentScene.scene.start("MenuScene");
            }
        }

        if (!this.isVulnerable) {
            if (this.vulnerableCounter > 0) {
                this.vulnerableCounter -= 1;
            } else {
                this.vulnerableCounter = 100;
                this.isVulnerable = true;
            }
        }
    }

    private addKey(key: string): Phaser.Input.Keyboard.Key {
        return this.currentScene.input.keyboard.addKey(key);
    }

    private handleInput() {
        if (this.y > this.currentScene.sys.canvas.height) {
            // tate fell into a hole
            this.isDying = true;
        }

        // evaluate if player is on the floor or on object
        // if neither of that, set the player to be jumping
        if (
            this.body.onFloor() ||
            this.body.touching.down ||
            this.body.blocked.down
        ) {
            this.isJumping = false;
            //this.body.setVelocityY(0);
        }

        // handle movements to left and right
        if (this.keys.get("RIGHT").isDown) {
            this.body.setAccelerationX(this.acceleration);
            this.setFlipX(false);
        } else if (this.keys.get("LEFT").isDown) {
            this.body.setAccelerationX(-this.acceleration);
            this.setFlipX(true);
        } else {
            this.body.setVelocityX(0);
            this.body.setAccelerationX(0);
        }

        // handle jumping
        if (this.keys.get("JUMP").isDown && !this.isJumping) {
            this.currentScene.sound.play('jump');
            this.body.setVelocityY(-180);
            this.isJumping = true;
        }
    }


    private handleAnimations() {

        if (this.body.velocity.y !== 0) {
            this.anims.stop();
            if (this.tateSize === "small") {
                this.setFrame(4);
            } else {
                this.setFrame(10);
            }
        } else if (this.body.velocity.x !== 0) {
            // tate is moving horizontal

            // check if tate is making a quick direction change
            if ((this.body.velocity.x < 0 && this.body.acceleration.x > 0) || (this.body.velocity.x > 0 && this.body.acceleration.x < 0)) {
                if (this.tateSize === "small") {
                    this.setFrame(5);
                } else {
                    this.setFrame(11);
                }
            }

            if (this.body.velocity.x > 0) {
                this.anims.play(this.tateSize + "TateWalk", true);
            } else {
                this.anims.play(this.tateSize + "TateWalk", true);
            }

        } else {
            // tate is standing still
            this.anims.stop();
            if (this.tateSize === "small") {
                this.setFrame(0);
            } else {
                if (this.keys.get("DOWN").isDown) {
                    this.setFrame(13);
                } else {
                    this.setFrame(6);
                }
            }
        }
    }

    shrinkTate(): void {
        this.tateSize = "small";
        this.currentScene.registry.set("tateSize", this.tateSize);
        this.adjustPhysicBodyToSmallSize();
        this.currentScene.sound.play('mh');
    }

    private adjustPhysicBodyToSmallSize(): void {
        this.body.setSize(6, 12);
        this.body.setOffset(6, 4);
    }


    growTate() {
        this.tateSize = "big";
        this.currentScene.registry.set('tateSize', this.tateSize);
        this.adjustPhysicBodyToBigSize();
    }

    private adjustPhysicBodyToBigSize(): void {
        this.body.setSize(8, 16);
        this.body.setOffset(4, 0);
    }

    gotHit(): void {
        this.isVulnerable = false;
        if (this.tateSize === "big") {
            this.shrinkTate();
        } else {
            // tate is dying
            this.isDying = true;

            // sets acceleration, velocity and speed to zero
            // stop all animations
            this.body.stop();
            this.anims.stop();

            // make last dead jump and turn off collision check
            this.body.setVelocityY(-180);

            // this.body.checkCollision.none did not work for me
            this.body.checkCollision.up = false;
            this.body.checkCollision.down = false;
            this.body.checkCollision.left = false;
            this.body.checkCollision.right = false;
        }
    }

    bounceUpAfterHitEnemyOnHead(): void {
        this.currentScene.add.tween({targets: this, props: {y: this.y - 5}, duration: 200, ease: "Power1", yoyo: true});
    }
}
