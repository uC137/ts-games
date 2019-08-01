export class Player extends Phaser.GameObjects.Sprite {
    // variables
    private currentScene: Phaser.Scene;
    private playerSize: string;
    private acceleration: number;
    private isJumping: boolean;
    private isDoubleJumping: boolean;
    private isDying: boolean;
    private isVulnerable: boolean;
    private vulnerableCounter: number;
    private armed: boolean;
    private hit: number;

    // input
    private keys: Map<string, Phaser.Input.Keyboard.Key>;

    public getKeys(): Map<string, Phaser.Input.Keyboard.Key> {
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
        this.playerSize = this.currentScene.registry.get("liveBar");
        this.acceleration = 500;
        this.isJumping = false;
        this.isDoubleJumping = false;
        this.isDying = false;
        this.isVulnerable = true;
        this.vulnerableCounter = 100;
        this.armed = false;
        this.hit = 0;

        // sprite
        this.setOrigin(0.5, 0.5);
        this.setFlipX(false);

        // input
        this.keys = new Map([
            ["LEFT", this.addKey("LEFT")],
            ["RIGHT", this.addKey("RIGHT")],
            ["DOWN", this.addKey("DOWN")],
            ["HIT", this.addKey("x")],
            ["JUMP", this.addKey("SPACE")]
        ]);
        // combo for double jump
        this.currentScene.input.keyboard.createCombo([32, 32], {resetOnMatch: true});
        this.currentScene.input.keyboard.createCombo([88, 88], {resetOnMatch: true});

        // physics
        this.currentScene.physics.world.enable(this);
        this.body.maxVelocity.x = 80;
        this.body.maxVelocity.y = 300;
        this.body.setSize(48, 36);

    }

    private addKey(key: string): Phaser.Input.Keyboard.Key {
        return this.currentScene.input.keyboard.addKey(key);
    }

    update(): void {
        if (!this.isDying) {
            this.handleInput();
            this.handleAnimations();
        } else {
            //this.setFrame(0);
            if (this.y > this.currentScene.sys.canvas.height) {
                this.currentScene.scene.start("MenuScene");
                this.currentScene.scene.stop("GameScene");
                this.currentScene.scene.stop("HUDScene");
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

    private handleInput() {
        if (this.y > this.currentScene.sys.canvas.height) {
            // player fell into a hole
            this.isDying = true;
        }

        // evaluate if player is on the floor or on object
        // if neither of that, set the player to be jumping
        if (this.body.onFloor() || this.body.touching.down || this.body.blocked.down) {
            this.isJumping = false;
            this.isDoubleJumping = false;
            this.body.setVelocityY(0);
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
            this.handleJump();
        }
    }

    private handleJump(): void {
        // applying jump force
        this.body.setVelocityY(-200);
        // this.body.velocity.y = -400;
        // hero can't jump anymore
        this.isJumping = true;
        // the hero can now double jump
        // this.isDoubleJumping = false;
        if (!this.isDoubleJumping) {
            this.currentScene.input.keyboard.once('keycombomatch', (e) => {
                // the hero double jumping already?
                this.isDoubleJumping = true;
                // applying double jump force
                this.body.setVelocityY(-200);
            });

        }
    }

    private handleAnimations(): void {
        if (this.body.velocity.y !== 0) {
            // player is jumping or falling
            if (this.body.velocity.y > 0) {
                this.anims.play("PlayerFalling", true);
            } else {
                if (this.isDoubleJumping) {
                    this.anims.play("PlayerDoubleJumping", true);
                } else {
                    this.anims.play("PlayerJumping", true);
                }

            }
        } else if (this.body.velocity.x !== 0) {
            // player is moving horizontal
            // check if player is making a quick direction change
            if ((this.body.velocity.x < 0 && this.body.acceleration.x > 0) || (this.body.velocity.x > 0 && this.body.acceleration.x < 0)) {
                this.setFrame(9);
            }
            if (this.body.velocity.x > 0 || this.body.velocity.x < 0) {
                if (this.keys.get("HIT").isDown) {
                    this.handleHit();
                } else {
                    this.anims.play("PlayerRun", true);
                }
            }

        } else {
            if (this.keys.get("HIT").isDown) {
                this.handleHit();
            } else if (this.keys.get("DOWN").isDown) { // CrunchedDown
                this.anims.play("PlayerCrunchedDown", true);
            } else {
                // standing still
                if (this.armed) {
                    this.anims.play("PlayerIdleArmed", true);
                } else {
                    this.anims.play("PlayerIdle", true);
                }
            }

        }
    }

    private handleHit(): void {
        this.currentScene.input.keyboard.on('keycombomatch', () => this.hit = 2);
        this.armed = true;

        switch (this.keys.get("HIT").isDown) {
            case this.hit === 0:
                this.hit = -1;
                this.anims.play("PlayerHit", true);
                break;
            case this.hit === 2:
                this.hit = -1;
                this.anims.play("PlayerHitCombo", true);
                break;
        }

        this.hit = 0;
    }

    private bounceUpAfterHitEnemyOnHead(): void {
        this.currentScene.add.tween({
            targets: this,
            props: {y: this.y - 5},
            duration: 200,
            ease: "Power1",
            yoyo: true
        });
    }

    protected gotHit(): void {
        this.isVulnerable = false;
        if (this.playerSize === "big") {

        } else {
            // player is dying
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
}
