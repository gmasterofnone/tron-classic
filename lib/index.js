const Game = require('./Game');

const canvas = document.querySelector('#game');
const ctx = canvas.getContext('2d');
const game = new Game(ctx);

// Start animation loop
window.requestAnimationFrame(gameLoop);

function gameLoop () {

  if (game.isOver()) {
    console.log('Game Over');

  } else {
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