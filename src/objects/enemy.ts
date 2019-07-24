
export class Enemy extends  Phaser.GameObjects.Image {

    constructor(params) {
    super(params.scene, params.x, params.y, params.key, params.frame);

    this.scene.add.existing(this);
  }



}










