# Magenta Backend

This is the backend repository for magenta social media network

## Getting Started

Install the dependencies

```shell
$ npm install
```

Create a .env file

```shell
$ cp .env.example .env
```

Set your `.env` file and set your secret keys

```shell
JWT_SECRET_KEY=Your_Secret_Key
SESSION_SECRET_KEY=Your_Secret_Key
```

To start the app

```shell
$ npm run start:dev
```

Lint the project

```shell
$ npm run lint

# fix
$ npm run lint:fix
```

## Code Style

This project code style uses [Eslint](https://eslint.org/) + [Airbnb](https://github.com/airbnb/javascript) + [Prettier](https://prettier.io/) configuration

```js
// .eslintrc.js
module.exports = {
  extends: ['airbnb-base', 'plugin:prettier/recommended'],
  plugins: ['prettier'],
```

Eslint rules

```js
// .eslintrc.js
rules: {
    'prefer-promise-reject-errors': 'off',
    'no-underscore-dangle': 'off',
    'func-names': 'off',
    'no-console': 'off',
    'import/no-dynamic-require': 'off',
  },
```

Prettier Configurations

```js
// .prettierrc
{
  "tabWidth": 2,
  "useTabs": false,
  "singleQuote": true
}
```

## Module Aliases

This project implements module aliases using the [module-alias](https://github.com/ilearnio/module-alias) package to ease the usage of imports/requires

Existing aliases:

```javascript
// package.json
"_moduleAliases": {
    "@app": "./",
    "@config": "./config",
    "@middlewares": "./middlewares",
    "@models": "./models",
    "@httpd": "./httpd",
    "@services": "./services",
    "@validation": "./validation"
  },
```

e.g

```javascript
require('module-alias/register');

const config = require('@config/express');
```

## Packages And Tools

- [NodeJS](https://nodejs.org/)
- [ExpressJS](http://expressjs.com/)
- [Mongoose](https://mongoosejs.com/)
- [Redis](https://github.com/NodeRedis/node-redis)
- [Jsonwebtoken](https://github.com/auth0/node-jsonwebtoken#readme)
- [Bcrypt](https://github.com/kelektiv/node.bcrypt.js#readme)
- [Joi](https://www.npmjs.com/package/joi)
- [module-alias](https://github.com/ilearnio/module-alias)
- [Eslint](https://eslint.org/)
- [Eslint Airbnb](https://github.com/airbnb/javascript)
- [Prettier](https://prettier.io/)
