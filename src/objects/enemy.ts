export class Enemy extends Phaser.GameObjects.Sprite {
  // variables
  protected currentScene: Phaser.Scene;
  protected isActivated: boolean;
  protected isDying: boolean;
  protected speed: number;
  protected dyingScoreValue: number;

  constructor(params) {
    super(params.scene, params.x, params.y, params.key, params.frame);

    // variables
    this.currentScene = params.scene;
    this.initSprite();
    this.currentScene.add.existing(this);
  }

  protected initSprite() {
    // variables
    this.isActivated = false;
    this.isDying = false;

    // sprite
    this.setOrigin(0, 0);
    this.setFrame(0);

    // physics
    this.currentScene.physics.world.enable(this);
    this.body.setSize(8, 8);
  }

}
