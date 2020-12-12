// Export environmental variables
/* eslint-disable global-require */
if (process.env.NODE_ENV === 'production') {
  module.exports = require('./prod');
} else {
  module.exports = require('./dev');
}
