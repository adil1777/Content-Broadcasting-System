const express = require("express");
const router = express.Router();

// module routes
router.use("/auth", require("../auths/auth.routers"));
router.use("/content", require("../content/content.routes"));

module.exports = router;