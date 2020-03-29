require('./types')
var dbLocationHistory = require('./db/locationHistory')
var { getConnection } = require('./db/connect')
var { handleServerResponse } = require('./server/server')
var { isValidLocationInput } = require('./input/locationHistory')
var { ServerError } = require('./server/errors')

/**
 * @typedef LocationHistoryInput
 * @property {string} captchaToken Verify the request isn't from a robot
 * @property {string} userId An unique user identifier. Must be anonymous
 * @property {Array<LocationHistoryPoint>}  locationHistory
 * 
 * e.g.
 * ```
 * {
 *   "type": "FeatureCollection",
 *   "userId": "xyz",
 *   "locationHistory": [
 *     {
 *  	   "dateTime": 1585344772667,
 *       "timeAtLocation": 35000,
 *       "location": { "type": "Point", "coordinates": [ 40, 5 ] },
 *       "infected": true
 *   	 }
 *   ]
 * }
 * ```
 * 
 * Find the number of households in a polygon area.
 */
const submitLocationHistory = async event => {
  if (!event.body)
    throw new ServerError('Missing body content.', 400)
  /**
   * @type {LocationHistoryInput}
   */
  var body = JSON.parse(event.body)
  isValidLocationInput(body)
  if (body.locationHistory.length == 0)
    return // Do nothing
  var range = [
    body.locationHistory[0].dateTime,
    body.locationHistory[body.locationHistory.length - 1].dateTime,
  ]
  var { db, client } = await getConnection()
  await dbLocationHistory.clearRange(db, body.userId, range)
  await dbLocationHistory.insertItems(db, body.userId, body.locationHistory)
  client.close()
}

module.exports = {
  submitLocationHistory: handleServerResponse(submitLocationHistory),
}
