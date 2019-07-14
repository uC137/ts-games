import "phaser";
import {BootScene} from "./scenes/bootScene";
import {MainMenuScene} from "./scenes/mainMenuScene";
import {GameScene} from "./scenes/gameScene";

// main game configuration
const config: GameConfig = {
    title: "BirdMan",
    version: "1.0",
    width: 590,
    height: 600,
    type: Phaser.AUTO,
    parent: "game",
    scene: [BootScene, MainMenuScene, GameScene],
    input: {
        keyboard: true,
        mouse: false,
        touch: true,
        gamepad: false
    }, physics: {
        default: "arcade",
        arcade: {
            gravity: {y: 300}
        }
    },
    backgroundColor: "#98d687",
    render: { pixelArt: true, antialias: false }
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
