require('./../types')


/**
 * Clear records for a user between a range of dates.
 * @param {MongoDb} db
 * @param {string} userId
 * @param {number} range[0]
 * @param {number} range[1]
 */
const clearRange = async function(db, userId, range){
  var collection = db.collection('locationHistory')
  await collection.remove({
    userId: userId,
    dateTime: {
      $gte: range[0],
      $lte: range[1],
    },
  })
}

/**
 * @param {MongoDb} db
 * @param {string} userId
 * @param {Array<LocationHistoryPoint>} historyItems
 */
const insertItems = async function(db, userId, historyItems){
  var collection = db.collection('locationHistory')
  var result = await collection.insertMany(historyItems.map(i => ({
    ...i,
    userId,
  })))
  console.log('insertItems#result', result)
}

module.exports = {
  clearRange,
  insertItems,
}