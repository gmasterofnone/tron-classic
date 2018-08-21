const { assert } = require('chai');
const Game = require('../lib/Game');
const Trail = require('../lib/Trail')

describe('Trail', () => {
  it('should instantiate new trail', () => {
    trail = new Trail()

    assert.isObject(trail);

  })

  
})