let frames = 0;

const gameState = {
  current: 0,
  ready: 0,
  playing: 1,
  over: 2,
};

const DEGREE = Math.PI / 180;

const sprite = new Image();
sprite.src = "./img/sprite.png";

const scoreSound = new Audio();
scoreSound.src = "./audio/point.wav";

const flapSound = new Audio();
flapSound.src = "./audio/flap.wav";

const hitSound = new Audio();
hitSound.src = "./audio/hit.wav";

const swooshSound = new Audio();
swooshSound.src = "./audio/swooshing.wav";

const dieSound = new Audio();
dieSound.src = "./audio/die.wav";
