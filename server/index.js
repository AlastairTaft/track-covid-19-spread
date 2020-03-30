require('./types')
var { getConnection } = require('./db/connect')
var { handleServerResponse } = require('./server/server')
var { ServerError } = require('./server/errors')
var FeatureCollection = require('./geojson/FeatureCollection')
var { insertFeature, searchFeatures } = require('./db/features')

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

  return {
    // As a convenience return some valid JSON so that client's don't 
    // fall over trying to parse the response.
    "all good": "👌"
  }
}

/**
 * Get location history
 */
const getLocationHistory = async event => {
  var geoWithin = event.queryStringParameters['geo-within']
  var { limit, skip } = event.queryStringParameters
  var limit = limit !== undefined ? parseInt(limit) : limit
  var skip = skip !== undefined ? parseInt(skip) : skip
  geoWithin = JSON.parse(geoWithin)

  if (limit !== undefined && isNaN(limit))
    throw new ServerError('Invalid value for \'limit\'.')
  if (limit !== undefined && limit > 500)
    throw new ServerError('Max value for \'limit\' is 500.')
  if (skip !== undefined && isNaN(skip))
    throw new ServerError('Invalid value for \'skip\'.')

  var { db, client } = await getConnection()
  var features = await searchFeatures(
    db, 
    { 
      geoWithin,
      skip,
      limit,
    },
  )
  client.close()
  return {
    // TODO Make this a feature collection
    features
  }
}

module.exports = {
  submitLocationHistory: handleServerResponse(submitLocationHistory),
  getLocationHistory: handleServerResponse(getLocationHistory),
}
