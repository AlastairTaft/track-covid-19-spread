var { assert } = require('./../misc/test')
var { assertIsPosition } = require('./position')

/**
 * A GeoJSON LineString object.
 * See https://tools.ietf.org/html/rfc7946#section-3.1.4
 */
var LineString = function(){}

/**
 * Parse a raw JS object. Will throw if it is not a valid Geo JSON Geometry 
 * object.
 */
LineString.prototype.parse = function(dto){

  assert(
    dto['type'] === 'LineString',
    'Expected Geo JSON Point object to have type "LineString".'
  )
  assert(
    dto['coordinates'] instanceof Array,
    'Expected Geo JSON LineString coordinates property to be an array.'
  )
  dto['coordinates'].forEach(dto => {
    assertIsPosition(dto, 'Geo JSON LineString: ')
  })

  this.type = dto['type']
  this.coordinates = dto['coordinates']

}

module.exports = LineString