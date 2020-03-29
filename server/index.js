require('./types')
var { getConnection } = require('./db/connect')
var { handleServerResponse } = require('./server/server')
var { ServerError } = require('./server/errors')
var FeatureCollection = require('./geojson/FeatureCollection')
var { insertFeature } = require('./db/features')

/**
 * Accept a Geo JSON FeatureCollection as the request body
 * e.g.
 * ```
 * {
 *   "type": "FeatureCollection",
 *   "features": [
 *    {
 *      "type": "Feature",
 *      "geometry": {
 *        "type": "Point",
 *        "coordinates": [
 *          50.123,
 *          51.321,
 *          0
 *        ]
 *      }
 *    }
 *   ]
 * }
 * ```
 * 
 * Find the number of households in a polygon area.
 */
const submitLocationHistory = async event => {
  if (!event.body)
    throw new ServerError('Missing body content.', 400)

  var { requestTimeEpoch, requestId, identity } = event.requestContext
  var { sourceIp, userAgent } = identity

  // We can use this info to debug API abuse and to remove bad data.
  var requesterInfo = {
    requestTimeEpoch,
    requestId,
    sourceIp,
    userAgent,
  }
  
  var featureCollection = new FeatureCollection()
  featureCollection.parse(JSON.parse(event.body))
  var { db, client } = await getConnection()
  await Promise.all(featureCollection.features.map(async feature => {
    await insertFeature(db, feature, requesterInfo)
  }))
  client.close()
}

module.exports = {
  submitLocationHistory: handleServerResponse(submitLocationHistory),
}
