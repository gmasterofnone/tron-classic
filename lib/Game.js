const Player = require('./Player');

module.exports = class Game {
  constructor(ctx) {
    this.ctx = ctx;
    this.paused = false;
    this.gameOver = false;

    this.players = [
      new Player(50, 50, 10, 10, 'green  ', 'black'),
      new Player(25, 25, 10, 10, 'red', 'black'),

    ];
  }



  // draw one frame of our game
  animate() {
    // draw everything here
    this.players.forEach( player => {

      this.handlePlayer(player);
      
      player.draw(this.ctx);
    })
  }

  handlePlayer(player) {
    const { canvas } = this.ctx;
    if (player.isCollidingWithWall(canvas.width, canvas.height)) {
        // this.endGame(); 
      const newDirection = {
        dx: player.dx * -1,
        dy: player.dy * -1,
      }
      player.changeDirection(newDirection);
      player.move();
    } else if (this.players[0].isCollidingWith(this.players[1])) {
      this.endGame();
    } else {
      player.move();
    }
  }

  endGame() {
    this.gameOver = true;
  }

  isOver() {
    return this.gameOver;
  }

  togglePause() {
    this.paused = !this.paused;
  }

  handleKeyPress(e) {
    const direction = {
      dx: 0,
      dy: 0
    };

    if (e.key === 'ArrowRight') {
      direction.dx = 1;
      this.players[0].changeDirection(direction);

    } else if (e.key === 'ArrowLeft') {
      direction.dx = -1;
      this.players[0].changeDirection(direction);

    } else if (e.key === 'ArrowDown') {
      direction.dy = 1;
      this.players[0].changeDirection(direction);

    } else if (e.key === 'ArrowUp') {
      direction.dy = -1;
      this.players[0].changeDirection(direction);

    } else if (e.key === 'd' || e.key === 'D') {
      direction.dx = 1;
      this.players[1].changeDirection(direction);

    } else if (e.key === 'a' || e.key === 'A') {
      direction.dx = -1;
      this.players[1].changeDirection(direction);

    } else if (e.key === 's' || e.key === 'S') {
      direction.dy = 1;
      this.players[1].changeDirection(direction);

    } else if (e.key === 'w' || e.key === 'W') {
      direction.dy = -1;
      this.players[1].changeDirection(direction);

    } 
  }
}