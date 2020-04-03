const services = require('../../services');

function getUsersHandler(req, res) {
  services.users.getUsers((err, docs) => {
    if (err) {
      console.log(err);
      res.status(500).json({
        status: res.statusCode,
        message: 'There was a problem on our side.',
      });
      return;
    }

    res.status(200).json({
      docs,
    });
  });
}

function getOneUserHandler(req, res) {
  const { username } = req.params;

  services.users.getUserByUsername(username, (err, doc) => {
    if (err) {
      console.log(err);
      res.status(500).json({
        status: res.statusCode,
        message: 'There was a problem on our side.',
      });
      return;
    }

    res.status(200).json(doc);
  });
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
