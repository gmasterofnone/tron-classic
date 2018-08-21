const Player = require ('./Player');
const Trail = require ('./Trail');
const moment = require('moment');
moment().format();

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
		};
		this.players = [
			new Player(26, 270, 10, 10, 'green', 1, 0),
			new Player(1163, 270, 10, 10, 'red', -1, 0),
		];
		this.trails = [];
	}

	animate() {
		this.players.forEach( player => {
			this.trails.push(new Trail(player.x, player.y, player.height, player.width, player.color));
			this.handlePlayer(player);
			player.draw(this.ctx); 
		});
	}

	handlePlayer(player) {
		const { canvas } = this.ctx;
		if (player.isCollidingWithWall(canvas.width, canvas.height)) {
			this.endGame(player); 
		} else if (this.players[0].isCollidingWith(this.players[1])) {
			this.endGame(player);
		} else if (player.isCollidingWithTrail (this.trails)) {
			this.endGame (player);
		} else {
			player.move();
		}
	}

	endGame(player) {
		player.death();
		this.scoreKeeper.roundOver = true;
		if (player.score == 0) this.scoreKeeper.gameOver = true;
		// let color = player.color;
		// this.scoreKeeper[color]--;
		// if (this.scoreKeeper[color] > 0) this.scoreKeeper.roundOver = true;
		// else this.scoreKeeper.gameOver = false;

		// console.log (this.scoreKeeper.gameOver)
		// console.log (this.scoreKeeper.roundOver)

    
	}

	isOver () {
		return this.scoreKeeper.gameOver;
	}

	isRoundOver() {
		return this.scoreKeeper.roundOver;
	}

	resetRound () {
		this.scoreKeeper.roundOver = false;
		this.trails = [];
	}

	togglePause() {
		this.paused = !this.paused;
	}

	handleKeyPress(e) {
		e.preventDefault();
    const direction = {
      dx: 0,
      dy: 0
    };
    if (e.key === '32') {
      console.log ('spacebar!s');
    } else if (e.key === 'ArrowRight') {
			direction.dx = 1;
			this.players[1].changeDirection(direction, this.trails);

		} else if (e.key === 'ArrowLeft') {
			direction.dx = -1;
			this.players[1].changeDirection(direction, this.trails);


		} else if (e.key === 'ArrowDown') {
			direction.dy = 1;
			this.players[1].changeDirection(direction, this.trails);


		} else if (e.key === 'ArrowUp') {
			direction.dy = -1;
			this.players[1].changeDirection(direction, this.trails);


		} else if (e.key === 'd' || e.key === 'D') {
			direction.dx = 1;
			this.players[0].changeDirection(direction, this.trails);


		} else if (e.key === 'a' || e.key === 'A') {
			direction.dx = -1;
			this.players[0].changeDirection(direction, this.trails);


		} else if (e.key === 's' || e.key === 'S') {
			direction.dy = 1;
			this.players[0].changeDirection(direction, this.trails);


		} else if (e.key === 'w' || e.key === 'W') {
			direction.dy = -1;
			this.players[0].changeDirection(direction, this.trails);
		} 
	}
};