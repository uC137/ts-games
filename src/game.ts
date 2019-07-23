import "phaser";
import {BootScene} from "./scenes/bootScene";
import {MenuScene} from "./scenes/mainMenuScene";
import {GameScene} from "./scenes/gameScene";

// main game configuration
const config: GameConfig = {
    title: "Tank",
    version: "1.0",
    width: 1600,
    height: 1200,
    zoom: 0.6,
    type: Phaser.AUTO,
    parent: "game",
    backgroundColor: "#000000",
    scene: [BootScene, MenuScene, GameScene],
    input: {
        keyboard: true,
        mouse: false,
        touch: false,
        gamepad: false
    },
    physics: {
        default: "arcade",
        arcade: {
            gravity: {y: 0},
            debug: false
        }
    },
    render: {pixelArt: false, antialias: true}
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
