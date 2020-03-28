const MongoClient = require('mongodb').MongoClient

/**
 * Convience function for connecting to the Mongo DB.
 */
const getConnection = async function(){
  const url = process.env.MONGO_URL
  const dbName = process.env.MONGO_DATABASE
  const client = new MongoClient(url)
  await client.connect()
  const db = client.db(dbName)
  return { client, db }
}

module.exports = {
  getConnection,
}
