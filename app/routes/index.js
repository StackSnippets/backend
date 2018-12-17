const express = require("express");

const template = require("./template");
const auth = require("./auth");

const router = express.Router();

router.use("/auth", auth);
router.use("/templates", template);

module.exports = router;
