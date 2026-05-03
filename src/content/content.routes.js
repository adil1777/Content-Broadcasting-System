const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");
const upload = require("../middlewares/upload.middleware");
const { ROLES } = require("../utils/enum");

const {
  uploadContentController,
  getAllContentController,
  getPendingContentController,
  approveContentController,
  rejectContentController
} = require("./content.controllers");


//UPLOAD CONTENT ONLY BY TEACHER
router.post(
  "/upload",
  authMiddleware,
  roleMiddleware(ROLES.TEACHER),
  upload.single("file"),
  uploadContentController
);

//GET ALL CONTENT ONLY BY PRINCIPLE
router.get(
  "/",
  authMiddleware,
  roleMiddleware(ROLES.PRINCIPAL),
  getAllContentController
);

//GET ALL PENDING CONTENT ONLY BY PRINCIPLE
router.get(
  "/pending",
  authMiddleware,
  roleMiddleware(ROLES.PRINCIPAL),
  getPendingContentController
);

//UPDATE CONTENT STATUS TO APPROVED 
router.put(
  "/:id/approve",
  authMiddleware,
  roleMiddleware(ROLES.PRINCIPAL),
  approveContentController
);

//UPDATE CONTENT STATUS TO  REJECTED 
router.put(
  "/:id/reject",
  authMiddleware,
  roleMiddleware(ROLES.PRINCIPAL),
  rejectContentController
);

module.exports = router;