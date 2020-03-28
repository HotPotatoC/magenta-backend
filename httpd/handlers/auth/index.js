const router = require("express").Router();

router.get("/", (req, res) => {
  res.json({
    msg: "auth"
  });
});

module.exports = {
  path: "/auth",
  router
};
