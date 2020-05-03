const path = require('path');
const development = require('./env/development');
const production = require('./env/production');

const defaults = {
  root: path.normalize(path.join(__dirname, '/..')),
  jwt: {
    options: {
      expiresIn: '2h',
    },
  },
};

module.exports = {
  development: { ...development, ...defaults },
  production: { ...production, ...defaults },
}[process.env.NODE_ENV || 'development'];
