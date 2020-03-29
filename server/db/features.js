
/**
 * @param {MongoDb} db
 * @param {Feature} feature
 * @param {object} extraProperties 
 */
const insertFeature = async function(db, feature, requesterInfo){
  var collection = db.collection('features')
  var record = await collection.findOne({ feature })
  if (record) return record
  return collection.insert(
    {
      feature,
      requesterInfo,
      createdAt: (new Date()).valueOf(),
    },
  )
}

module.exports = {
  insertFeature,
}
