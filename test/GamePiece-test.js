const { assert } = require('chai');
const GamePiece = require('../lib/GamePiece.js')
const Trail = require('../lib/Trail.js')
const Game = require('../lib/Game.js')

describe('GamePiece', () => {
  let gamepiece; 

  beforeEach(() => {
    gamepiece = new GamePiece(30, 30, 10, 10, 'green')
  })



  it('should take properties', () => {
    gamepiece = new GamePiece(30, 30, 10, 10, 'green')
    assert.deepEqual(gamepiece, {
      x: 30,
      y: 30,
      height: 10,
      width: 10,
      color: 'green',
      dx: 1,
      dy: 0,
      dxv: 3,
      dyv: 3

    })
  });

  it('should collide with a second gamepiece that occupies the same space', () => {
    gamepiece = new GamePiece(30, 30, 10, 10, 'green')
    const gamepiece2 = new GamePiece(30, 30, 10, 10, 'green')
    const gamepiece3 = new GamePiece(130, 130, 10, 10, 'green')

    const isColliding = gamepiece.isCollidingWith(gamepiece3);
    const isNotColliding = gamepiece.isCollidingWith(gamepiece2);

    assert.isFalse(isColliding);
    assert.isTrue(isNotColliding);

  });

  it('should collide with walls', () => {
    const gamepiece = new GamePiece(700, 1300, 10, 10, 'green')
    const gamepiece2 = new GamePiece(30, 30, 10, 10, 'green')

    const isColliding = gamepiece.isCollidingWithWall(550, 1200);
    const isNotColliding = gamepiece2.isCollidingWithWall(550, 1200);

    assert.isTrue(isColliding);
    assert.isFalse(isNotColliding);

  })


  it('should be able to move and change direction', () => {
    gamepiece = new GamePiece(30, 30, 10, 10, 'green')
    gamepiece.changeDirection({dx:0, dy:1});
    assert.equal (gamepiece.dy, 1)
  })

})

// Setup
// Execution
// Assertion