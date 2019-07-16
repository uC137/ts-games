
import { Collectible } from "./collectible";

export class Box extends Phaser.GameObjects.Sprite {
  // variables
  private currentScene: Phaser.Scene;
  private boxContent: string;
  private content: Collectible;
  private hitBoxTimeline: Phaser.Tweens.Timeline;

  public getContent(): Phaser.GameObjects.Sprite {
    return this.content;
  }
  constructor(params) {
    super(params.scene, params.x, params.y, params.key, params.frame);

    // variables
    this.currentScene = params.scene;
    this.boxContent = params.content;

    this.initSprite();
    this.currentScene.add.existing(this);
  }

  private initSprite() {
    // variables
    this.content = null;
    this.hitBoxTimeline = this.currentScene.tweens.createTimeline({});

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
