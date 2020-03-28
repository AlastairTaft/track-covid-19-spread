
/**
 * 
 * @typedef LocationHistoryPoint
 * @property {number} dateTime Time arrived at the location, EPOCH
 * @property {number} timeAtLocation Time spent at the location in milliseconds
 * @property {GeoJSONPoint} location The location
 * @property {boolean} infected True if the user is believed to have COVID-19
 * at this point in time
 * 
 * @typedef GeometryObject
 * @property {string} type
 * @property {Array} coordinates
 * 
 * @typedef GeoJSONPoint 
 * @extends GeometryObject
 * 
 */