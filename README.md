# Magenta Backend

[![Maintainability](https://api.codeclimate.com/v1/badges/cf84ad8ae3e1c7755d4e/maintainability)](https://codeclimate.com/github/HotPotatoC/magenta-backend/maintainability)

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

To start the app

```shell
$ npm run dev
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

Project rules

```js
// .eslintrc.js
rules: {
    'prefer-promise-reject-errors': 'off',
    'no-underscore-dangle': 'off',
    'func-names': 'off',
    'no-console': 'off',
    'import/no-dynamic-require': 'off',
    'import/no-unresolved': 'off',
    'consistent-return': 'off',
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
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

## Packages And Tools

- [NodeJS](https://nodejs.org/)
- [ExpressJS](http://expressjs.com/)
- [Mongoose](https://mongoosejs.com/)
- [Redis](https://github.com/NodeRedis/node-redis)
- [Jsonwebtoken](https://github.com/auth0/node-jsonwebtoken#readme)
- [Bcrypt](https://github.com/kelektiv/node.bcrypt.js#readme)
- [Joi](https://www.npmjs.com/package/joi)
- [Eslint](https://eslint.org/)
- [Eslint Airbnb](https://github.com/airbnb/javascript)
- [Prettier](https://prettier.io/)
