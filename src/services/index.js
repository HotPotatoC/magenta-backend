require('module-alias/register');

const auth = require('@services/auth');
const users = require('@services/users');
const posts = require('@services/posts');
const comments = require('@services/comments');

module.exports = {
  auth,
  users,
  posts,
  comments,
};
