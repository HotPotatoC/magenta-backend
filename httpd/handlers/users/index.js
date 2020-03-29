const router = require('express').Router();
const services = require('../../../services');
const tokenMiddleware = require('../../middleware/tokenMiddleware');

router.get('/', tokenMiddleware, (req, res) => {
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
});

router.get('/:username', tokenMiddleware, (req, res) => {
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
});

router.post('/', tokenMiddleware, (req, res) => {
  const payload = req.body;

  services.users.registerNewUser(payload, (err, product) => {
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
      new: product,
    });
  });
});

router.put('/:username', tokenMiddleware, (req, res) => {
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
});

router.delete('/:username', tokenMiddleware, (req, res) => {
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
});

module.exports = {
  path: '/users',
  router,
};
