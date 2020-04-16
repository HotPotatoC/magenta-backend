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

function registerUserHandler(req, res) {
  const payload = req.body;

  services.users.registerNewUser(payload, (err) => {
    if (err) {
      console.log(err);
      res.status(500).json({
        status: res.statusCode,
        message: 'There was a problem on our side.',
      });
      return;
    }

    res.status(201).json({
      message: 'Successfully inserted a new user to the collection',
    });
  });
}

function updateUserHandler(req, res) {
  const { username } = req.params;
  const payload = req.body;

  services.users.updateUserByUsername(username, payload, (err) => {
    if (err) {
      console.log(err);
      res.status(500).json({
        status: res.statusCode,
        message: 'There was a problem on our side.',
      });
      return;
    }
    res.status(200).json({
      message: 'Successfully updated user',
    });
  });
}

function deleteUserHandler(req, res) {
  const { username } = req.params;
  services.users.deleteUserByUsername(username, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({
        status: res.statusCode,
        message: 'There was a problem on our side.',
      });
      return;
    }

    res.status(200).json({
      msg: `Successfully deleted ${result.deletedCount} data`,
    });
  });
}

module.exports = {
  getUsersHandler,
  getOneUserHandler,
  registerUserHandler,
  updateUserHandler,
  deleteUserHandler,
};
