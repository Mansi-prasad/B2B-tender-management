const express = require("express");
const router = express.Router();
const {
  submitApplication,
  getTenderApplications,deleteApplication
} = require("../controllers/applicationController");
const { authMiddleware } = require("../middleware/authMiddleware");

// Submit proposal
router.post("/", authMiddleware, submitApplication);

// Get applications for a tender
router.get("/tender/:tenderId", authMiddleware, getTenderApplications);
router.delete("/:id", authMiddleware, deleteApplication);

module.exports = router;