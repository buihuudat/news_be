const notificationController = require("../controllers/notificationController");

const router = require("express").Router();

router.put("/:id", notificationController.updateSeen);

module.exports = router;
