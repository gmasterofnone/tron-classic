const GamePiece = require('./GamePiece');

module.exports = class Player extends GamePiece {
	constructor(x, y, height, width, color, dx, score) {
		super(x, y, height, width, color);
		this.dx = dx;
		this.score = 3;

	} 

	draw(ctx) {
		const {x, y, height, width} = this;
		super.draw(ctx);

		// draw block border
		// ctx.strokeStyle = borderColor;
		// ctx.strokeRect(x, y, width, height);
	}

	death () {
		if (this.score > 0) this.score--;
	}
};