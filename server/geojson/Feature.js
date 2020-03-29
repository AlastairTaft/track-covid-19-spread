var { assert } = require('./../misc/test')
var packageJSON = require('./../../package.json')
var Point = require('./Point')
var LineString = require('./LineString')

/**
 * @typedef Geometry
 * @property {string} type
 * @property {Array} coordinates
 */

const GEOMETRY_TYPES = [
  "Point", 
  "MultiPoint", 
  "LineString",
  "MultiLineString", 
  "Polygon", 
  "MultiPolygon", 
  "GeometryCollection",
]

/**
 * @class
 * A GeoJSON Feature object.
 * See https://tools.ietf.org/html/rfc7946#section-3.2
 */
var Feature = function(){
  /**
   * @type {string}
   */
  this.type = null
  /**
   * @type {Geometry}
   */
  this.geometry = null
  /**
   * @type {object}
   */
  this.properties = null
}

/**
 * Parse a raw JS object. Will throw if it is not a valid Geo JSON Feature 
 * object.
 */
Feature.prototype.parse = function(dto){

  assert(
    dto['type'] == 'Feature', 
    'Expected GeoJSON Feature object to have type "Feature".'
  )
  assert(
    dto['geometry'] === null || dto['geometry'],
    'Expected GeoJSON Feature object to have property \'geometry\'.',
  )
  assert(
    dto['properties'] === null || dto['properties'],
    'Expected GeoJSON Feature object to have property \'properties\'.',
  )

  this.type = dto['type']
  if (dto['geometry']){
    // Ensure it is a valid geometry type.
    assert(
      dto['geometry']['type'], 
      `Expected Geo JSON Geometry object to have a type.`
    )
    assert(
      GEOMETRY_TYPES.includes(dto['geometry']['type']), 
      `Invalid Geo JSON Geometry type '${dto['type']}'.`
    )
    switch (dto['geometry']['type']){
      case 'Point': var geometry = new Point(); break;
      case 'LineString': var geometry = new LineString(); break;
      default: 
        throw new Error(
          `API does not yet support Geo JSON Geometry type '${dto['type']}'. 
          Please file an issue 
          ${packageJSON && packageJSON['bugs'] && packageJSON['bugs']['url']}.`
          .replace(/\s+/g, ' ')
        )
    }
    geometry.parse(dto['geometry'])
    this.geometry = geometry

  } else {
    this.geometry = null
  }
  this.properties = dto['properties']
  
}

module.exports = Feature