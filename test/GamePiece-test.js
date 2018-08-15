const { assert } = require('chai');
const GamePiece = require('../lib/GamePiece.js')

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
      dy: 1,
      dxv: 1,
      dyv: 1

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

  it('should collide with walls', () => {})
  it('should be able to move', () => {})
  it('should be able to changeDirection', () => {})
})

// Setup
// Execution
// Assertion