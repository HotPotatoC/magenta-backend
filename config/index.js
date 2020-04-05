require('module-alias/register');
const development = require('@config/env/development');
const production = require('@config/env/production');

const defaults = {
  jwt: {
    options: {
      algorithm: 'HS256',
      expiresIn: '2h',
    },
  },
};

module.exports = {
  development: { ...development, ...defaults },
  production: { ...production, ...defaults },
}[process.env.NODE_ENV || 'development'];
