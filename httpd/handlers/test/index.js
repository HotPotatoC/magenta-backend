const router = require("express").Router();

router.get("/", (req, res) => {
  res.json({
    msg: "Hello World"
  });
});

module.exports = {
  path: "/test",
  router: router
};
