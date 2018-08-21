const Game = require('./Game');
const canvas = document.querySelector('#game');
const ctx = canvas.getContext('2d');
const game = new Game(ctx);
const moment = require('moment');
moment().format();

document.addEventListener('keydown', addPadHover);
document.addEventListener('keyup', removePadHover);

gameControl();

function gameControl() {
  let startGame = document.querySelector('.start-game');
  startGame.addEventListener('click', function() {
   
    window.requestAnimationFrame(gameLoop); 
  });
  let pauseGame = document.querySelector('.pause-game');
  pauseGame.addEventListener('click', function() {
    game.togglePause();
  });
};

function gameLoop () {
  if (game.isOver()) {
    return; 
  } else if (game.isRoundOver()) {
    console.log ('hi')
    waitAMoment ();
  } else if (!game.paused) {
    game.animate();
  }
  updateScore();
  window.requestAnimationFrame(gameLoop)

};

function reset () {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  game.players[0].x = 26;
  game.players[0].y = 270;
  game.players[0].dx = 1;
  game.players[0].dy = 0;
  game.players[1].x = 1163;
  game.players[1].dy = 0;
  game.players[1].dx = -1;
  game.players[1].y = 270;
  game.resetRound();
  game.animate();
}

function waitAMoment () {
  // let currentTime = moment(),
  // eventTime = moment().add(5, 'seconds');
  // console.log (currentTime)
  // console.log (eventTime)
  // let diffTime = eventTime - currentTime;
  // let duration = moment.duration(diffTime, 'seconds');
  // let interval = 1000;
  // var timerStart = moment.duration(duration).seconds();

  setTimeout (function(){
    reset (); 

  }, 2000);

}

function updateScore() {
  let playerOneLives = document.querySelector('.p1-lives');
  playerOneLives.innerText = '0' + game.players[0].score;
  let playerTwoLives = document.querySelector('.p2-lives');
  playerTwoLives.innerText = '0' + game.players[1].score;
}

// Add key press event handler
document.addEventListener('keydown', handleKeyPress);

function handleKeyPress(e) {
  game.handleKeyPress(e);
}

function addPadHover(e) {
  let padKey = document.querySelector(`.key${e.keyCode}`);
  if (padKey) {
    padKey.classList.add("btn-hover");
  }
}

function removePadHover(e) {
  let padKey = document.querySelector(`.key${e.keyCode}`);
  if (padKey) {
    padKey.classList.remove('btn-hover');
  }
}