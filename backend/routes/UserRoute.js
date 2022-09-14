const express = require("express");
const { createUser, loginUser } = require("../controller/UserController");
const router = express.Router();

router.post("/registration", createUser);
router.post("/login", loginUser);

module.exports = router;