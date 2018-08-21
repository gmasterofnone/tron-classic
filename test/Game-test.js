// Game-test.js
const { assert } = require('chai');
const Game = require('../lib/Game');



const ctx = {
  canvas: {
    width: 300,
    height: 300
  }
}

describe('Game', () => {
  
  // it('should end the game if block collides with wall', () => {
  //   const game =  new Game(ctx)
  //   const player = game.players[0];

  //   player.x = ctx.canvas.width;
  //   game.handlePlayer(player);
  //   assert.isFalse(game.gameOver)

  // })

  it('should end the game if block collides with wall', () => {
    const game =  new Game(ctx)
    const player = game.players[0];

    player.x = ctx.canvas.width;
    game.handlePlayer(player);
    assert.isFalse(game.gameOver)

  })
  
  it.skip('it should add trail into array', () => {
    const game =  new Game(ctx)

    game.animate();
    console.log (game)
    assert.equal(Game.trails.length > 1, true);

  })

  it('it should reset round', () => {
    const game =  new Game(ctx)
    const player = game.players[0];

    player.x = ctx.canvas.width;
    game.handlePlayer(player);
    assert.equal(game.scoreKeeper.roundOver, true)
  })
  
})