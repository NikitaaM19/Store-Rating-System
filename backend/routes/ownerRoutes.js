const express = require("express");
const router = express.Router();

const { getDashboard } = require("../controllers/ownerController");

router.get("/dashboard/:ownerId", getDashboard);

module.exports = router;