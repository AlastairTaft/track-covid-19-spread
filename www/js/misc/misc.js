
var covid = covid || {}
covid.misc = covid.misc || {}

/**
 * Convert a date object into a short date string.
 * e.g. 2020-03-29
 * @param {Date} date
 * @returns {string}
 */
covid.misc.formatToShortDate = function(date){
  return date.getFullYear() + '-' + 
    covid.misc.zeroPad(date.getMonth() + 1, 2) + '-' + 
    covid.misc.zeroPad(date.getDate(), 2)
}

/**
 * Pad a value with leading zeros so that it matches the specified length.
 * @param {Mixed} val The current value, it will be case to a string.
 * @param {number} length
 * @returns {string}
 */
covid.misc.zeroPad = function(val, length){
  val += ''
  while (val.length < length){
    val = '0' + val
  }
  return val
}