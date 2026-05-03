const express = require("express");
const {ROLES}= require("../utils/enum");
const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");
const {
  registerController,
  loginController,
  updateUserRoleController
} = require("./auth.controllers");

const router = express.Router();

// Register
router.post("/register", registerController);

// Login
router.post("/login", loginController);

//update user role 
router.patch(
  "/users/:id/role",
  authMiddleware,
  roleMiddleware(ROLES.PRINCIPAL),
  updateUserRoleController
);

module.exports = router;