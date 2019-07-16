

export class Plant extends Phaser.GameObjects.Sprite {
    // variables
    private currentScene: Phaser.Scene;


    constructor(params) {
        super(params.scene, params.x, params.y, params.key, params.frame);

        // variables
        this.currentScene = params.scene;
        this.initSprite();
        this.currentScene.add.existing(this);
    }

    private initSprite() {
        // sprite
        this.setOrigin(0, 0);
        this.setFrame(0);

        // physics
        this.currentScene.physics.world.enable(this);
        this.body.setSize(8, 8);
        this.body.setAllowGravity(false);
        this.body.setImmovable(true);
    }

    update(): void {}

}
