const router = require("express").Router();
const User = require("../../../models/User");
const bcrypt = require("bcrypt");

router.get("/", (req, res) => {
  res.json({
    msg: "User"
  });
});

router.post("/", (req, res) => {
  let {username, email, password} = req.body;

  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      throw err;
    }

    User.create({username, email, password: hash})
      .then(() => {
        res.status(201).json({
          msg: "Successfully inserted a new user to the collection"
        });
      })
      .catch(err =>
        res.status(400).json({
          msg: err.message
        })
      );
  });
});

module.exports = {
  path: "/users",
  router: router
};
