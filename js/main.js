class Game {
    constructor(id) {
        this.canvas = document.getElementById(id);
        this.ctx = this.canvas.getContext("2d");
        this.bg = new Background(this.canvas);
        this.land = new Land(this.canvas);
        this.bird = new Bird();
        this.getReadyMsg = new GetReadyMsg();
        this.getReadyBird = new GetReadyBird();
        this.gameOver = new GameOver();
        this.gameOverMsg = new GameOverMsg();
        this.gameMedal = new GameMedal();
        this.gameRestart = new GameRestart();
        this.pipes = new Pipe();
        this.score = new Score();

        this.frames = 0;
        this.gameState = {
            current: 0,
            ready: 0,
            playing: 1,
            over: 2,
        };
    }

    draw() {
        this.ctx.fillStyle = "#70c5ce";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.bg.draw(this.ctx);
        this.pipes.draw(this.canvas, this.ctx);
        this.land.draw(this.ctx);
        this.bird.draw(this.ctx);
        this.getReadyBird.draw(this.canvas, this.ctx, this.gameState);
        this.getReadyMsg.draw(this.canvas, this.ctx, this.gameState);
        this.gameOverMsg.draw(this.canvas, this.ctx, this.gameState);
        this.gameOver.draw(this.canvas, this.ctx, this.gameState);
        this.gameMedal.draw(this.canvas, this.ctx, this.gameState);
        this.gameRestart.draw(this.canvas, this.ctx, this.gameState);
        this.score.draw(this.canvas, this.ctx, this.gameState);
    }

    update() {
        this.bird.update(this.canvas, this.gameState, this.land, this.frames);
        this.land.update(this.canvas, this.gameState);
        this.pipes.update(
            this.canvas,
            this.bird,
            this.gameState,
            this.score,
            this.frames,
        );
    }

    animate() {
        this.update();
        this.draw();
        this.frames++;
        
        requestAnimationFrame(this.animate.bind(this));
    }

    init() {
        ["click"].forEach((ev) => {
            this.canvas.addEventListener(ev, (event) => {
                switch (this.gameState.current) {
                    case this.gameState.ready:
                        this.gameState.current = this.gameState.playing;
                        swooshSound.play();
                        break;
                    case this.gameState.playing:
                        if (this.bird.y - this.bird.radius <= 0) return;
                        this.bird.flap();
                        flapSound.play();
                        break;
                    case this.gameState.over:
                        if (event.offsetX>165 && event.offsetX<265 && event.offsetY>485 && event.offsetY<530){
                            this.bird.speed = 0;
                            this.pipes.pipeList = [];
                            this.score.current = 0;
                            this.gameState.current = this.gameState.ready;
                        }
                        break;
                    default:
                        break;   
                }
            });
        });
        this.animate();
    }
}

const game = new Game("canvas");
game.init();
