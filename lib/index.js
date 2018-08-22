const Game = require('./Game');
const canvas = document.querySelector('#game');
const ctx = canvas.getContext('2d');
let game = new Game(ctx);
const moment = require('moment');
moment().format();

document.addEventListener('keydown', addPadHover);
document.addEventListener('keyup', removePadHover);

gameControl();

function gameControl() {
	let startGame = document.querySelector('.start-game');
	startGame.addEventListener('click', function() {
		let announcement = document.querySelector('.announce');
		announcement.innerText = 'READY TO PLAY!!!';
		window.requestAnimationFrame(gameLoop); 
	});
	let pauseGame = document.querySelector('.pause-game');
	pauseGame.addEventListener('click', function() {
		game.togglePause();
		gameTimeout();
	});
}

function gameLoop () {
	if (game.isOver()) {
    game = new Game(ctx);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    gameControl();

		announceGame();
		return; 
	} else if (game.isRoundOver()) {
		announceScore();
		waitAMoment ();
	} else if (!game.paused) {
		game.animate();
	}
	updateScore();
	window.requestAnimationFrame(gameLoop);

}

function reset () {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	game.resetRound();
	game.animate();
}

function waitAMoment () {
	setTimeout (() => reset (), 2000);
}

function updateScore() {
	let playerOneLives = document.querySelector('.p1-lives');
	playerOneLives.innerText = '0' + game.players[0].score;
	let playerTwoLives = document.querySelector('.p2-lives');
	playerTwoLives.innerText = '0' + game.players[1].score;
}

function announceScore() {
	let announcement = document.querySelector('.announce');
	if (game.players[0].score > game.players[1].score) {
		return announcement.innerText = `PLAYER ONE LEADS BY ${game.players[0].score - game.players[1].score}!!!`;
	} else if (game.players[0].score < game.players[1].score) {
		return announcement.innerText = `PLAYER TWO LEADS BY ${game.players[1].score - game.players[0].score}!!!`;
	} else {
		return announcement.innerText = 'PLAYERS ARE TIED!!!';
	}
}

function announceGame() {
	let announcement = document.querySelector('.announce');
	if (game.players[0].score > game.players[1].score) {
		return announcement.innerText = 'PLAYER ONE WINS GAME!!!';
	} else if (game.players[0].score < game.players[1].score) {
		return announcement.innerText = 'PLAYER TWO WINS GAME!!!';
	} else {
		return announcement.innerText = 'GAME ENDS IN TIE!!!';
	}
}

function gameTimeout() {
	let announcement = document.querySelector('.announce');
	console.log(announcement.innerText);
	if (announcement.innerText === 'READY TO PLAY!!!') {
		return announcement.innerText = 'GAME IS PAUSED!!!'; 
	} else if (announcement.innerText === 'GAME IS PAUSED!!!') {
		return announcement.innerText = 'READY TO PLAY!!!';
	} 
}

document.addEventListener('keydown', handleKeyPress);

function handleKeyPress(e) {
	e.preventDefault();
	game.handleKeyPress(e);
}

function addPadHover(e) {
  console.log(e.keyCode);
	let padKey = document.querySelector(`.key${e.keyCode}`);
	if (padKey) {
		padKey.classList.add('btn-hover');
	}
}

function removePadHover(e) {
	let padKey = document.querySelector(`.key${e.keyCode}`);
	if (padKey) {
		padKey.classList.remove('btn-hover');
	}
}