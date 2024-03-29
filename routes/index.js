var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.use("/user", require("./users"));
router.use("/admin", require("./admin"));
router.use("/job", require("./job"));
router.use("/notification", require("./notification"));

module.exports = router;
