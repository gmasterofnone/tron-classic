const Player = require ('./Player');
const Trail = require ('./Trail');

module.exports = class Game {
  constructor(ctx) {
    this.ctx = ctx;
    this.paused = false;
    this.gameOver = false;
    this.playerNum = 0;

    this.players = [
      new Player(50, 50, 10, 10, 'green', 'black'),
      new Player(25, 25, 10, 10, 'red', 'black'),

    ];

    this.trails = [

    ];
  }



  // draw one frame of our game
  animate() {
    // draw everything here
    this.players.forEach( player => {
      // start putting the trail in the array

      this.handlePlayer(player);
      
      player.draw(this.ctx);
      this.trails.push(new Trail(player.x, player.y, player.height, player.width, player.color))

    

    //   let found = this.trails.find (trail => {
    //     return (trail.x == player.x && 
    //       trail.y == player.y &&
    //       trail.color == player.color
    //     );
    //   })
    //   found.draw(this.ctx)
      
    })
  }


  animateTrails () {
      
    this.trails[this.playerNum].draw(this.ctx);
    this.playerNum += 2;
    // let lastTrail = this.trails.length - 1;
    // let lastTrail2 = this.trails.length - 2;
    // this.trails[lastTrail].draw(this.ctx);
    // this.trails[lastTrail2].draw(this.ctx);

    // this.counter++
    // console.log(this.trails[lastTrail2].color)
    // // this.trails.forEach (trail => {
    // //   trail.draw(this.ctx);
    // //   console.log ()
    // // })
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