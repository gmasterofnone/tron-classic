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
      return true
    
	}

	endGame(player) {
		player.death();
		this.scoreKeeper.roundOver = true;
		if (player.score == 0) this.scoreKeeper.gameOver = true;
	}

	isOver () {
		return this.scoreKeeper.gameOver;
	}

	isRoundOver() {
		return this.scoreKeeper.roundOver;
	}

	resetRound () {
    this.players[0].x = 26;
    this.players[0].y = 270;
    this.players[0].dx = 1;
    this.players[0].dy = 0;
    this.players[1].x = 1163;
    this.players[1].dy = 0;
    this.players[1].dx = -1;
    this.players[1].y = 270;
		this.scoreKeeper.roundOver = false;
		this.trails = [];
	}

	togglePause() {
		this.paused = !this.paused;
	}

	handleKeyPress(e) {
    const direction = {
      dx: 0,
      dy: 0
    };
    if (e.key === '32') {

    } else if (e.key === 'ArrowRight') {
			direction.dx = 1;
			this.players[1].changeDirection(direction);

		} else if (e.key === 'ArrowLeft') {
			direction.dx = -1;
			this.players[1].changeDirection(direction);

		} else if (e.key === 'ArrowDown') {
			direction.dy = 1;
			this.players[1].changeDirection(direction);

		} else if (e.key === 'ArrowUp') {
			direction.dy = -1;
			this.players[1].changeDirection(direction);

		} else if (e.key === 'd' || e.key === 'D') {
			direction.dx = 1;
			this.players[0].changeDirection(direction);

		} else if (e.key === 'a' || e.key === 'A') {
			direction.dx = -1;
			this.players[0].changeDirection(direction);

		} else if (e.key === 's' || e.key === 'S') {
			direction.dy = 1;
			this.players[0].changeDirection(direction);

		} else if (e.key === 'w' || e.key === 'W') {
			direction.dy = -1;
			this.players[0].changeDirection(direction);
		} 
	}
};