var { ServerError } = require('./errors')

/**
 * Do boiler plate server response handling.
 * @param {Function} handler
 * @return {Function}
 */
const handleServerResponse = handler => async (...args) => {
  try {
    var result = await handler(...args)
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Methods': 'POST,OPTIONS',
        'Access-Control-Allow-Headers':
          'Content-Type, Content-Encoding',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(result, null, 2),
    }
  } catch (err) {
    console.error(err)
    var statusCode = err instanceof ServerError ? err.statusCode : 500
    return {
      statusCode,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Methods': 'POST,OPTIONS',
        'Access-Control-Allow-Headers':
          'Content-Type, Content-Encoding',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(
        {
          message: err.message,
          stack: process.env.NODE_ENV === 'dev' ? err.stack : undefined,
        },
        null,
        2,
      ),
    }
  }
}

module.exports = {
  handleServerResponse,
}
