require('module-alias/register');

const path = require('path');
const development = require('@config/env/development');
const production = require('@config/env/production');

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
