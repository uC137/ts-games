
export class Tate extends Phaser.GameObjects.Sprite {
  // variables
  private currentScene: Phaser.Scene;
  private tateSize: string;
  private acceleration: number;
  private isJumping: boolean;
  private isDying: boolean;
  private isVulnerable: boolean;
  private vulnerableCounter: number;

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
    this.tateSize = this.currentScene.registry.get("tateSize");
    this.acceleration = 500;
    this.isJumping = false;
    this.isDying = false;
    this.isVulnerable = true;
    this.vulnerableCounter = 100;

    // sprite
    this.setOrigin(0.5, 0.5);
    this.setFlipX(false);



    // physics
    // this.currentScene.physics.world.enable(this);
    // this.body.maxVelocity.x = 50;
    // this.body.maxVelocity.y = 300;
  }

  update(): void {
  }
}
