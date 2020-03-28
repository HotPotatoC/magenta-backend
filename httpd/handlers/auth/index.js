const router = require("express").Router();
const config = require("../../../config");
const services = require("../../../services");

router.post("/login", (req, res) => {
  const {email, password} = req.body;

  services.auth
    .login(email, password)
    .then(({token, user, status}) => {
      return res.status(status).json({
        message: "Successfully logged in",
        user: {
          id: user._id,
          username: user.username,
          email: user.email
        },
        token,
        expiresIn: config.jwt.options.expiresIn
      });
    })
    .catch(({err, status}) => {
      if (status === 500) {
        console.log(err);
        res.status(status).json({
          status: res.statusCode,
          message: "There was a problem on our side."
        });
        return;
      }

      if (status === 401) {
        return res.status(status).json({
          msg: "Unauthorized user please login to proceed"
        });
      }
    });
});

router.get("/token", (req, res) => {
  //
});

module.exports = {
  path: "/auth",
  router
};
