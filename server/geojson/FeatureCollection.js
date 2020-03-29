var { assert } = require('./../misc/test')
var Feature = require('./Feature')

/**
 * @class
 * A GeoJSON FeatureCollection object.
 * See https://tools.ietf.org/html/rfc7946#section-3.3
 */
var FeatureCollection = function(){
  /**
   * @type {string}
   */
  this.type = null
  /**
   * @type {Array<Feature>}
   */
  this.features = null

}

/**
 * Parse a raw JS object. Will throw if it is not a valid Geo JSON Feature 
 * Collection object.
 */
FeatureCollection.prototype.parse = function(dto){
  assert(
    dto['type'] == 'FeatureCollection', 
    `Expected GeoJSON Feature Collection object to have type 
    "FeatureCollection".`.replace(/\s+/g, ' ')
  )
  assert(
    dto['features'] instanceof Array,
    'Expected GeoJSON Feature Collection property \'features\' to be an array.'
  )
  this.type = dto['type']
  this.features = dto['features'].map(dto => {
    var feature = new Feature()
    feature.parse(dto)
    return feature
  })
}

module.exports = FeatureCollection