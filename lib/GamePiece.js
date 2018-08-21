const Game = require ('./Game');

module.exports = class GamePiece {
	constructor(x, y, height, width, color) {
		this.x = x;
		this.y = y;
		this.height = height;
		this.width = width;
		this.color = color;
		this.dx = 1;
		this.dy = 0;
		this.dxv = 3;
		this.dyv = 3;
	}

	isCollidingWith(object) {
		return (
			this.x < object.x + object.width && 
      this.x + this.width > object.x &&
      this.y < object.y + object.height &&
      this.y + this.height > object.y
		);
	}

	isCollidingWithWall(canvasWidth, canvasHeight) {
		return (
			this.x < 0 ||
      this.x + this.width > canvasWidth ||
      this.y < 0 || 
      this.y + this.height > canvasHeight
		);
	}

	isCollidingWithTrail (trails) {
		let greenTrail = trails.filter (trail => trail.color == 'green');
		let redTrail = trails.filter (trail => trail.color == 'red');
		greenTrail.pop ();
		redTrail.pop ();
		let redWin, greenWin;
		if (this.color == 'green' && (this.coordinateCheck (redTrail) || this.coordinateCheck (greenTrail))) {
			redWin = true;
			return redWin;
		} else if (this.color == 'red' && (this.coordinateCheck (redTrail) || this.coordinateCheck (greenTrail))) {
			greenWin = true;
			return greenWin;
		}
	}

	coordinateCheck (trails) {
		let collide = false;
		trails.forEach (trail => {
			if (
				this.x == trail.x && 
        this.y == trail.y
			) {
				collide = true;
				return;
			}
		});
		if (collide == true) return true;
	}

	draw(ctx) {
		const { x, y, height, width, color } = this;

		ctx.fillStyle = color;
		ctx.fillRect(x, y, width, height);
	}

	move() {
		this.x += this.dx * this.dxv;
		this.y += this.dy * this.dyv;
	}

	changeDirection(direction) {
		if (this.checkTrail (direction)) {
			this.dx = direction.dx;
			this.dy = direction.dy;
		} 
	}

	checkTrail (direction) {
		let fakeTron = {
			dx: direction.dx,
			dy: direction.dy
		};
		if ((this.dx == 1 && fakeTron.dx == -1) || (this.dx == -1 && fakeTron.dx == 1)) return false;
		else if ((this.dy == 1 && fakeTron.dy == -1) || (this.dy == -1 && fakeTron.dy == 1)) return false;
		return true;

	}



};