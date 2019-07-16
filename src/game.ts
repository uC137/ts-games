import "phaser";
import {BootScene} from "./scenes/bootScene";
import {MenuScene} from "./scenes/mainMenuScene";
import {GameScene} from "./scenes/gameScene";
import {HUDScene} from "./scenes/HUDScene";

// main game configuration
const config: GameConfig = {
    title: "Tate-Tute",
    version: "1.0",
    width: 160,
    height: 144,
    zoom: 5,
    type: Phaser.AUTO,
    parent: "game",
    scene: [BootScene, MenuScene, HUDScene, GameScene],
    input: {
        keyboard: true,
        mouse: false,
        touch: false,
        gamepad: false
    },
    physics: {
        default: "arcade",
        arcade: {
            gravity: {y: 475},
            debug: false
        }
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
