
/**
 * Throws an error if the condition is not true.
 * @param {Mixed} condition If it's not truthy an error is thrown
 * @param {string} msg The thrown error message
 */
const assert = function(condition, msg){
  if (!condition)
    throw new Error(msg)
}

module.exports = {
  assert,
}
