const express = require("express");
const { Chatting, InitialInputValues } = require("../controller/controller");
const router = express.Router();

router.route("/chatting").post(Chatting);
router.route("/InitialInputValues").get(InitialInputValues);

module.exports = router;
