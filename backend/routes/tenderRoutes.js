const express = require("express");
const router = express.Router();
const {
  createTender,
  getAllTenders,
  getTender,
  updateTender,
  deleteTender,
  getCompanyTenders,
} = require("../controllers/tenderController");
const { authMiddleware } = require("../middleware/authMiddleware");

// Create tender
router.post("/", authMiddleware, createTender);

// Get all tenders (paginated)
router.get("/", getAllTenders);

// Get all tenders for a company
router.get("/mytenders", authMiddleware, getCompanyTenders);

// Get tender by ID
router.get("/:id", getTender);

// Update tender
router.put("/:id", authMiddleware, updateTender);

// Delete tender
router.delete("/:id", authMiddleware, deleteTender);

module.exports = router;
