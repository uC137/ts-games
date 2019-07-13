import {Pipe} from "../objects/pipe";


export class GameScene extends Phaser.Scene {

    private pipes: Phaser.GameObjects.Group;
    private background: Phaser.GameObjects.TileSprite;
    private scoreText: Phaser.GameObjects.BitmapText;
    private timer: Phaser.Time.TimerEvent;

    constructor() {
        super({key: "GameScene"});
    }

    init(): void {
        this.registry.set("score", 0);
    }

    create(): void {
        // objects
        this.background = this.add.tileSprite(0, 0, 590, 600, "background").setOrigin(0, 0);
        this.scoreText = this.add.bitmapText(this.sys.canvas.width / 2 - 14, 30, "font", this.registry.values.score).setDepth(2);
        this.pipes = this.add.group({});

        this.addNewRowOfPipes();
        this.timer = this.time.addEvent({
            delay: 1500,
            callback: this.addNewRowOfPipes,
            callbackScope: this,
            loop: true
        });
    }


    update(time: number): void {

        Phaser.Actions.Call(
            this.pipes.getChildren(), function (pipe) {
                pipe.body.setVelocityX(0);
            }, this);
    }


    private addNewRowOfPipes(): void {
        // update the score
        this.registry.values.score += 1;
        this.scoreText.setText(this.registry.values.score);

        // randomly pick a number between 1 and 5
        let hole = Math.floor(Math.random() * 5) + 1;

        // add 6 pipes with one big hole at position hole and hole + 1
        for (let i = 0; i < 10; i++) {
            if (i !== hole && i !== hole + 1 && i !== hole + 2) {
                if (i === hole - 1) {
                    this.addPipe(400, i * 60, 0);
                } else if (i === hole + 3) {
                    this.addPipe(400, i * 60, 1);
                } else {
                    this.addPipe(400, i * 60, 2);
                }
            }
        }
    }

    private addPipe(x, y, frame): void {
        // create a new pipe at the position x and y and add it to group
        this.pipes.add(
            new Pipe({scene: this, x: x, y: y, frame: frame, key: "pipe"})
        );
    }

}
