export class Uch extends Phaser.GameObjects.Sprite {
    private jumpKey: Phaser.Input.Keyboard.Key;
    private isDead: boolean;
    private isFlapping: boolean;


    constructor(params) {
        super(params.scene, params.x, params.y, params.key, params.frame);
        // image
        this.setScale(1);
        this.setOrigin(0, 0);

        // variables
        this.isDead = false;
        this.isFlapping = false;

        // physics
        this.scene.physics.world.enable(this);
        this.body.setGravityY(1000);
        this.body.setSize(40, 50);

        this.scene.anims.create({
            key: "ciko",
            frameRate: 6,
            repeat: -1,
            frames: this.scene.anims.generateFrameNumbers("uchA", {
                frames: [0, 1]
            })
        });

        // input
        this.jumpKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.scene.add.existing(this);
    }

    update(): void {
        // handle angle change
        if (this.angle < 10) {
            this.angle += 2;
        }

        this.anims.play("ciko", true);
        // handle input
        if (this.jumpKey.isDown && !this.isFlapping) {
            this.randomSound();
            this.isFlapping = true;
            this.body.setVelocityY(-350);
            this.scene.tweens.add({targets: this, props: {angle: -20}, duration: 150, ease: "Power0"});
        } else if (this.jumpKey.isUp && this.isFlapping) {
            this.isFlapping = false;
        }

        // check if off the screen
        if (this.y + this.height > this.scene.sys.canvas.height || this.y < 0) {
            this.isDead = true;
            this.randomSound(true);
        }
    }

    public getDead(): boolean {
        return this.isDead;
    }

    public setDead(dead: boolean): void {
        this.isDead = dead;
        if (this.isDead) {
            this.anims.stop();
            this.setFrame(2);
            this.randomSound(dead);
        }
    }


    public randomSound(dead = false): void {
        if (dead) {
            switch (Math.floor(Math.random() * 2) + 1) {
                case 1:
                    this.scene.sound.play('dead1');
                    break;
                case 2:
                    this.scene.sound.play('dead2');
                    break;
            }
        } else {
            this.scene.sound.play('mh');
        }

    }
}
