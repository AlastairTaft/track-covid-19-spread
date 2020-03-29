var { assert } = require('./../misc/test')

/**
 * Assert a value is a valid position object.
 * @param {Mixed} position
 */
const assertIsPosition = function(position, msgPrefix = ''){
  assert(position instanceof Array, msgPrefix + 'Position is not an array.')
  assert(
    (
      position[2] === undefined || 
      typeof position[2] === 'number'
    ),
    msgPrefix + 'Expected the third value for the position to be a number',
  )
}

module.exports = {
  assertIsPosition,
}
