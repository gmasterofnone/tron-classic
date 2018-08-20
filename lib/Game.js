const Player = require ('./Player');
const Trail = require ('./Trail');

module.exports = class Game {
  constructor(ctx) {
    this.ctx = ctx;
    this.paused = false;
    this.roundOver = false;
    this.gameOver = false;
    this.playerNum = 0;
    this.scoreKeeper = {
      roundOver: false,
      gameOver: false,
      green: 3,
      red: 3
    }
    this.players = [
      new Player(26, 270, 10, 10, 'green', 1, 0),
      new Player(1163, 270, 10, 10, 'red', -1, 0),
    ];
    this.trails = [];
  };

  animate() {
    this.players.forEach( player => {
      this.trails.push(new Trail(player.x, player.y, player.height, player.width, player.color))
      this.handlePlayer(player);
      player.draw(this.ctx); 
    })
  };

  handlePlayer(player) {
    const { canvas } = this.ctx;
    if (player.isCollidingWithWall(canvas.width, canvas.height)) {
      player.death();
      this.endGame(player); 
    } else if (this.players[0].isCollidingWith(this.players[1])) {
      this.endGame(player);
    } else if (player.isCollidingWithTrail (this.trails)) {
        this.endGame (player);
    } else {
      player.move();
    }
  };

  endGame(player) {
    this.scoreKeeper.roundOver = true;

    
  };

  isOver() {
    return this.scoreKeeper;
  };

  togglePause() {
    this.paused = !this.paused;
  };

  handleKeyPress(e) {
    const direction = {
      dx: 0,
      dy: 0
    };
    if (e.key === '32') {
      console.log ('spacebar!s')
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      direction.dx = 1;
      this.players[1].changeDirection(direction, this.trails);

    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      direction.dx = -1;
      this.players[1].changeDirection(direction, this.trails);


    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      direction.dy = 1;
      this.players[1].changeDirection(direction, this.trails);


    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      direction.dy = -1;
      this.players[1].changeDirection(direction, this.trails);


    } else if (e.key === 'd' || e.key === 'D') {
      e.preventDefault();
      direction.dx = 1;
      this.players[0].changeDirection(direction, this.trails);


    } else if (e.key === 'a' || e.key === 'A') {
      e.preventDefault();
      direction.dx = -1;
      this.players[0].changeDirection(direction, this.trails);


    } else if (e.key === 's' || e.key === 'S') {
      e.preventDefault();
      direction.dy = 1;
      this.players[0].changeDirection(direction, this.trails);


    } else if (e.key === 'w' || e.key === 'W') {
      e.preventDefault();
      direction.dy = -1;
      this.players[0].changeDirection(direction, this.trails);
    } 
  }
};