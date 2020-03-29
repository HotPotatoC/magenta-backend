# Feedr Backend

This is the backend repository for feedr social media network

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

This project uses [Eslint](https://eslint.org/) + [Airbnb](https://github.com/airbnb/javascript) + [Prettier](https://prettier.io/) configuration

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

## Packages And Tools

- [NodeJS](https://nodejs.org/)
- [ExpressJS](http://expressjs.com/)
- [Mongoose](https://mongoosejs.com/)
- [Redis](https://github.com/NodeRedis/node-redis)
- [Jsonwebtoken](https://github.com/auth0/node-jsonwebtoken#readme)
- [Bcrypt](https://github.com/kelektiv/node.bcrypt.js#readme)
- [Eslint](https://eslint.org/)
- [Eslint Airbnb](https://github.com/airbnb/javascript)
- [Prettier](https://prettier.io/)
