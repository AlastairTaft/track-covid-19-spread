var { assert } = require('./../misc/test')
var { assertIsPosition } = require('./position')

/**
 * A GeoJSON Point object.
 * See https://tools.ietf.org/html/rfc7946#section-3.1.2
 */
var Point = function(){}

/**
 * Parse a raw JS object. Will throw if it is not a valid Geo JSON Geometry 
 * object.
 */
Point.prototype.parse = function(dto){

  assert(
    dto['type'] === 'Point',
    'Expected Geo JSON Point object to have type "Point".'
  )
  assert(
    typeof dto['coordinates'][0] === 'number' &&
    typeof dto['coordinates'][1] === 'number',
    `Expected Geo JSON Point object coordinates property to be a 
    single position`.replace(/\s+/g, ' '),
  )
  assertIsPosition(dto['coordinates'], 'Geo JSON Point: ')
  
  this.type = dto['type']
  this.coordinates = dto['coordinates']

}

module.exports = Point