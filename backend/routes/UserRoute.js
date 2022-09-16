const express = require("express");
const { createUser, loginUser, logoutUser, forgotPassword, resetPassword, userDetails, updatePassword, updateProfile, getAllUsers, getSingleUser } = require("../controller/UserController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const router = express.Router();

router.post("/registration", createUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.post("/password/forgot", forgotPassword);
router.put("/password/reset", resetPassword);
router.get("/me", isAuthenticatedUser, userDetails);
router.put("/me/updatepassword", isAuthenticatedUser, updatePassword);
router.put("/me/update/info", isAuthenticatedUser, updateProfile);
router.get("/admin/users", isAuthenticatedUser, authorizeRoles("admin"), getAllUsers);
router.get("/admin/user/:id", isAuthenticatedUser, authorizeRoles("admin"), getSingleUser);

module.exports = router;