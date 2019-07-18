export class Portal extends Phaser.GameObjects.Zone {
  // variables
  currentScene: Phaser.Scene;
  portalDestinationForTate: any;


  constructor(params) {
    super(params.scene, params.x, params.y, params.width, params.height);

    // variables
    this.currentScene = params.scene;
    this.portalDestinationForTate = params.spawn;
    this.initZone();
    this.currentScene.add.existing(this);
  }

  getPortalDestination(): {} {
    return this.portalDestinationForTate;
  }

  private initZone() {
    this.setOrigin(0, 0);

    // physics
    this.currentScene.physics.world.enable(this);
    this.body.setSize(this.height, this.width);
    this.body.setOffset(0, 0);
    this.body.setAllowGravity(false);
    this.body.setImmovable(true);
  }

  update(): void {}
}
