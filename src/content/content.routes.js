const express = require("express");
const router = express.Router();

const { uploadContentController } = require("./content.controllers");
const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");
const upload = require("../middlewares/upload.middleware");
const ROLES = require("../utils/enum");

router.post(
  "/upload",
  authMiddleware,
  roleMiddleware(ROLES.TEACHER),
  upload.single("file"),
  uploadContentController
);

module.exports = router;