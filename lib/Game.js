const Player = require ('./Player');
const Trail = require ('./Trail');

module.exports = class Game {
  constructor(ctx) {
    this.ctx = ctx;
    this.paused = false;
    this.gameOver = false;
    this.playerNum = 0;

    this.players = [
      new Player(100, 300, 10, 10, 'green', 1),
      new Player(1075, 300, 10, 10, 'red', -1),

    ];

    this.trails = [

    ];
  }



  // draw one frame of our game
  animate() {
    // draw everything here
    this.players.forEach( player => {
      // start putting the trail in the array
      this.trails.push(new Trail(player.x, player.y, player.height, player.width, player.color))

      this.handlePlayer(player);
      player.draw(this.ctx);

      
    })
  }


  animateTrails () {
      
  
  }

  handlePlayer(player) {
    const { canvas } = this.ctx;
    if (player.isCollidingWithWall(canvas.width, canvas.height)) {
      this.endGame(); 
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
      this.players[0].changeDirection(direction, this.trails);

    } else if (e.key === 'ArrowLeft') {
      direction.dx = -1;
      this.players[0].changeDirection(direction, this.trails);


    } else if (e.key === 'ArrowDown') {
      direction.dy = 1;
      this.players[0].changeDirection(direction, this.trails);


    } else if (e.key === 'ArrowUp') {
      direction.dy = -1;
      this.players[0].changeDirection(direction, this.trails);


    } else if (e.key === 'd' || e.key === 'D') {
      direction.dx = 1;
      this.players[1].changeDirection(direction, this.trails);


    } else if (e.key === 'a' || e.key === 'A') {
      direction.dx = -1;
      this.players[1].changeDirection(direction, this.trails);


    } else if (e.key === 's' || e.key === 'S') {
      direction.dy = 1;
      this.players[1].changeDirection(direction, this.trails);


    } else if (e.key === 'w' || e.key === 'W') {
      direction.dy = -1;
      this.players[1].changeDirection(direction, this.trails);


    } 
  }
}