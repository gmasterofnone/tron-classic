const Game = require('./Game');
const canvas = document.querySelector('#game');
const ctx = canvas.getContext('2d');
const game = new Game(ctx);


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
    // ctx.clearRect(0, 0, canvas.width, canvas.height)
    // game.players[0].x = 26;
    // game.players[0].y = 270;
    // game.players[0].x = 1163;
    // game.players[0].y = 270;
    // game.animate();
  } else if (!game.paused) {
    game.animate();
  } 

  window.requestAnimationFrame(gameLoop)
  document.addEventListener('keydown', handleKeyPress);
  function handleKeyPress(e) {
  game.handleKeyPress(e);
  }
  updateScore();
};

function updateScore() {
  let playerOneLives = document.querySelector('.p1-lives');
  playerOneLives.innerText = '0' + game.players[0].score;
  let playerTwoLives = document.querySelector('.p2-lives');
  playerTwoLives.innerText = '0' + game.players[1].score;
}