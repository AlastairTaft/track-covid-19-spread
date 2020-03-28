var { ServerError } = require('./../server/errors')

/**
 * Throws a ServerError if the dto is invalid input.
 * @param {object} dto
 */
const isValidLocationInput = function(dto){
  if (!dto['captchaToken'])
    throw new ServerError('Missing captcha token.', 400) 
  if (!dto['userId'])
    throw new ServerError('Missing userId.', 400) 
  if (!dto['locationHistory'])
    throw new ServerError('Missing locationHistory.', 400) 
  dto['locationHistory'].forEach(isValidLocationItemInput)
  dto['locationHistory'].reduce((pre, cur) => {
    if (pre && pre['dateTime'] > cur['dateTime'])
      throw new ServerError(
        'Location history is not in chronological order.',
        400,
      )
    return cur
  })
}

/**
 * Throws a ServerError if the dto is invalid input.
 * @param {object} dto
 */
const isValidLocationItemInput = function(dto){
  if (!Number.isInteger(dto['dateTime']))
    throw new ServerError(
      'Location history item is missing or has invalid dateTime prop.', 400) 
  if (!dto['location'])
    throw new ServerError(
      'Location history item is missing location prop.', 400) 
  isValidGeoPoint(dto['location'])
  if (dto['infected'] !== true && dto['infected'] !== false)
    throw new ServerError(
      'Location history item is missing or has invalid infected prop.', 400) 
}

const isValidGeoPoint = function(dto){
  if (dto['type'] != 'Point')
    throw new ServerError('Type must be \'Point\' for a Geo Point.', 400)
}

module.exports = {
  isValidLocationInput,
  isValidLocationItemInput,
}
