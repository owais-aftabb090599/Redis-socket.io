const express = require("express");
const { Chatting } = require("../controller/controller");
const router = express.Router();

router.route("/chatting").post(Chatting);

module.exports = router;
