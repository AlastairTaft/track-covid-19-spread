
/**
 * @param {MongoDb} db
 * @param {Feature} feature
 * @param {object} extraProperties 
 */
const insertFeature = async function(db, feature, requesterInfo){
  var collection = db.collection('features')
  var record = await collection.findOne({ feature })
  if (record) return record
  return collection.insertOne(
    {
      feature,
      requesterInfo,
      createdAt: (new Date()).valueOf(),
    },
  )
}

/**
 * Search features.
 * @param {MongoDb} db
 */
const searchFeatures = async function(db, options){
  var { geoWithin, skip = 0, limit = 500 } = options
  var collection = db.collection('features')
  var features = await collection.find(
    { 
      'feature.geometry': { 
        $geoWithin: { $geometry: geoWithin } 
      } 
    },
    {projection:{_id:0}},
  ).skip(skip).limit(limit) 
  return features.toArray()
}

module.exports = {
  insertFeature,
  searchFeatures,
}
