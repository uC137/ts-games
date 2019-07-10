import "phaser";
import {BootScene} from "./scenes/bootScene";
import {GameScene} from "./scenes/gameScene";

// main game configuration
const config: GameConfig = {
    title: "Wheel",
    version: "1.0",
    width: 550,
    height: 550,
    // zoom: 2,
    type: Phaser.AUTO,
    backgroundColor: 0xffffff,
    parent: "game",
    scene: [BootScene, GameScene],
    input: {
        keyboard: false,
        mouse: true,
        touch: false,
        gamepad: false
    },
    render: {pixelArt: true, antialias: false}
};

// game class
export class Game extends Phaser.Game {
    constructor(config: GameConfig) {
        super(config);
    }
}

// when the page is loaded, create our game instance
window.addEventListener("load", () => {
    var game = new Game(config);
});
