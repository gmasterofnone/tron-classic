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
  
  it('it should add trail into array', () => {
    const game =  new Game(ctx)

    game.animate();
    // comment out draw in animate();
    // thank you ctx!
    assert.equal(game.trails.length > 1, true);

  })

  it('it should reset round', () => {
    const game =  new Game(ctx)
    const player = game.players[0];

    player.x = ctx.canvas.width;
    game.handlePlayer(player);
    assert.equal(game.scoreKeeper.roundOver, true)
  })

  it('should collide with trails', () => {
    const game =  new Game(ctx)
    game.handleKeyPress ('w')
    game.animate();
    game.handleKeyPress ('a')
    game.animate();
    game.handleKeyPress ('s')
    game.animate();

    // comment out draw in animate();
    // thank you ctx!
    assert.equal (game.handlePlayer(game.players[0]), true)


  })
  
})