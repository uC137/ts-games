import "phaser";
import {BootScene} from "./scenes/bootScene";
import {MainMenuScene} from "./scenes/mainMenuScene";
import {GameScene} from "./scenes/gameScene";

// main game configuration
const config: GameConfig = {
    title: "Wheel",
    version: "1.0",
    width: 550,
    height: 550,
    // zoom: 2,
    type: Phaser.CANVAS,
    backgroundColor: 0x880044,
    parent: "game",
    scene: [BootScene, MainMenuScene, GameScene],
    input: {
        keyboard: false,
        mouse: true,
        touch: false,
        gamepad: false
    },
    // physics : {
    //     default: "arcade",
    //     arcade: {
    //         gravity: { y: 475 },
    //         debug: false
    //     }
    // },
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
