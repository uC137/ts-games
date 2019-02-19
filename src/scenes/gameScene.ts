import {Snake} from "../objects/snake";
import {Apple} from "../objects/apple";
import {CONST} from "../objects/const";

export class GameScene extends Phaser.Scene {
    // field and game setting
    private fieldSize: number;
    private gameHeight: number;
    private gameWidth: number;
    private boardWidth: number;
    private boardHeight: number;
    private horizontalFields: number;
    private verticalFields: number;
    private tick: number;

    // objects
    private player: Snake;
    private apple: Apple;
    private gameBorder: Phaser.GameObjects.Graphics[];

    // texts
    private scoreText: Phaser.GameObjects.BitmapText;

    constructor() {
        super({key: "GameScene"});
    }

    init(): void {
        this.fieldSize = 8;
        this.gameHeight = this.sys.canvas.height;
        this.gameWidth = this.sys.canvas.width;
        this.boardWidth = this.gameWidth - 2 * this.fieldSize;
        this.boardHeight = this.gameHeight - 2 * this.fieldSize;
        this.horizontalFields = this.boardWidth / this.fieldSize;
        this.verticalFields = this.boardHeight / this.fieldSize;
        this.tick = 0;
    }

    create(): void {
        // objects
        this.gameBorder = [];
        let i = 0;
        for (let x = 0; x < this.gameWidth / this.fieldSize; x++) {
            for (let y = 0; y < this.gameHeight / this.fieldSize; y++) {
                if (y === 0 || x === 0 || y === this.gameHeight / this.fieldSize - 1 || x === this.gameWidth / this.fieldSize - 1) {
                    this.gameBorder[i] = this.add
                        .graphics({
                            x: -this.fieldSize + x * this.fieldSize,
                            y: -this.fieldSize + y * this.fieldSize,
                            fillStyle: {color: 0x61e85b, alpha: 0.3}
                        })
                        .fillRect(this.fieldSize, this.fieldSize, this.fieldSize, this.fieldSize);
                    i++;
                }
            }
        }

        this.player = new Snake(this);
        this.apple = new Apple(this, {
            xPos: this.rndXPos(),
            yPos: this.rndYPos(),
            fSize: this.fieldSize
        });

        // text
        this.scoreText = this.add.bitmapText(this.gameWidth / 2, 1, "snakeFont", "" + CONST.SCORE, 8);
    }


    update(time: number): void {
        if (this.tick === 0) {
            this.tick = time;
        }

        if (!this.player.isDead()) {
            this.scoreText.setText('' + CONST.SCORE);
            if (time - this.tick > this.level()) {
                this.player.move();
                this.checkCollision();
                this.tick = time;
            }

            this.player.handleInput();
        } else {
            this.scene.start("MainMenuScene");
        }

    }

    private level(): number {
        let tickValue = 100;
        switch (true) {
            case CONST.SCORE >= 5:
                return tickValue - 20;
            case CONST.SCORE >= 10:
                return tickValue - 45;
            case CONST.SCORE >= 20:
                return tickValue - 55;
            case CONST.SCORE >= 30:
                return tickValue - 65;
            case CONST.SCORE >= 40:
                return tickValue - 75;
            case CONST.SCORE >= 50:
                return tickValue - 85;
            case CONST.SCORE >= 60:
                return tickValue - 95;
            case CONST.SCORE >= 70:
                return tickValue - 100;
            default:
                return tickValue;
        }
    }

    private rndXPos(): number {
        return (
            Phaser.Math.RND.between(1, this.horizontalFields - 1) * this.fieldSize
        );
    }

    private rndYPos(): number {
        return Phaser.Math.RND.between(1, this.verticalFields - 1) * this.fieldSize;
    }

    private checkCollision(): void {

        let {x: headX, y: headY} = this.player.getHead();

        // border vs. snake collision
        for (let {x, y} of this.gameBorder) {
            if (headX === x && headY === y) {
                //this.player.setDead(true);
                // or
                // infinite walls
                if (x + 3 * this.fieldSize > this.gameWidth) {
                    this.player.getHead().x = -this.fieldSize;
                } else if (x <= -this.fieldSize) {
                    this.player.getHead().x = this.gameWidth - (x + 3 * this.fieldSize);
                }

                if (y + 3 * this.fieldSize > this.gameHeight) {
                    this.player.getHead().y = -this.fieldSize;
                } else if (y <= -this.fieldSize) {
                    this.player.getHead().y = this.gameHeight - (y + 3 * this.fieldSize);
                }


            }
        }

        // player vs. apple collision
        if (headX === this.apple.x && headY === this.apple.y) {
            this.player.growSnake(this);
            CONST.SCORE++;
            this.scoreText.setText('' + CONST.SCORE);
            this.apple.newApplePosition(this.rndXPos(), this.rndYPos());
        }

        this.player.checkSnakeSnakeCollision();

    }


}
