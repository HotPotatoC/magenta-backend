const services = require('../../../services');

const getUsersHandler = (req, res) => {
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
};

const getOneUserHandler = (req, res) => {
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
};

const registerUserHandler = (req, res) => {
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
};

const updateUserHandler = (req, res) => {
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
};

const deleteUserHandler = (req, res) => {
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
};

module.exports = {
  getUsersHandler,
  getOneUserHandler,
  registerUserHandler,
  updateUserHandler,
  deleteUserHandler,
};
