const { assert } = require('chai');
const Game = require('../lib/Game');
const Player = require('../lib/Player')

describe('Player', () => {
  it('should instantiate new player', () => {
    player = new Player(26, 270, 10, 10, 'green', 1, 0)

    assert.isObject(player);

  })

  it('should take properties', () => {
    player = new Player(26, 270, 10, 10, 'green', 1)
    assert.deepEqual(player, {
      x: 26,
      y: 270,
      height: 10,
      width: 10,
      color: 'green',
      dx: 1,
      dy: 0,
      dxv: 3,
      dyv: 3,
      score: 3
    })
  })

  it('When player dies their score should decrease', () => {
    player = new Player(26, 270, 10, 10, 'green', 1, 0)

    assert.equal(player.score, 3);
    player.death();
    assert.equal(player.score, 2);

  })
})