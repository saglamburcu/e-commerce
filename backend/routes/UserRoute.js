const express = require("express");
const { createUser, loginUser, logoutUser, forgotPassword, resetPassword } = require("../controller/UserController");
const router = express.Router();

router.post("/registration", createUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.post("/password/forgot", forgotPassword);
router.put("/password/reset", resetPassword);

module.exports = router;