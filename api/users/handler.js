require('module-alias/register');

const services = require('@services');

async function getUsersHandler(req, res) {
  try {
    const docs = await services.users.getUsers();

    const response = docs.map((doc) => ({
      ...doc.toObject(),
      links: [
        {
          rel: 'user',
          href: `/users/${doc.username}`,
          action: 'GET',
        },
        {
          rel: 'user',
          href: `/users/${doc.username}`,
          action: 'PUT',
        },
        {
          rel: 'user',
          href: `/users/${doc.username}`,
          action: 'DELETE',
        },
      ],
    }));

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      status: res.statusCode,
      message: 'There was a problem on our side.',
    });
  }
}

async function getOneUserHandler(req, res) {
  try {
    const { username } = req.params;
    const doc = await services.users.getUserByUsername(username);

    const response = {
      ...doc.toObject(),
      links: [
        {
          rel: 'user',
          href: `/users/${doc.username}`,
          action: 'GET',
        },
        {
          rel: 'user',
          href: `/users/${doc.username}`,
          action: 'PUT',
        },
        {
          rel: 'user',
          href: `/users/${doc.username}`,
          action: 'DELETE',
        },
      ],
    };

    return res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      status: res.statusCode,
      message: 'There was a problem on our side.',
    });
  }
}

async function updateUserHandler(req, res) {
  const { username } = req.params;
  const payload = req.body;

  try {
    await services.users.updateUserByUsername(username, payload);

    return res.status(200).json({
      status: res.statusCode,
      message: 'Successfully updated user',
    });
  } catch (error) {
    if (error === 404) {
      return res.status(404).json({
        status: res.statusCode,
        message: `No user with name '${username}'.`,
      });
    }
    return res.status(500).json({
      status: res.statusCode,
      message: 'There was a problem on our side.',
    });
  }
}

async function deleteUserHandler(req, res) {
  const { username } = req.params;
  try {
    const result = await services.users.deleteUserByUsername(username);

    if (result === 404) {
      return res.status(404).json({
        status: res.statusCode,
        message: `No user with name '${username}'.`,
      });
    }
    return res.status(200).json({
      status: res.statusCode,
      message: `Successfully deleted ${result.deletedCount} data`,
    });
  } catch (error) {
    return res.status(500).json({
      status: res.statusCode,
      message: 'There was a problem on our side.',
    });
  }
}

module.exports = {
  getUsersHandler,
  getOneUserHandler,
  updateUserHandler,
  deleteUserHandler,
};
