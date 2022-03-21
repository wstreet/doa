const createDebug = require('debug')

module.exports = function (namespace) {
  const debug = createDebug(namespace)
  debug.enabled = true;
  return debug
}