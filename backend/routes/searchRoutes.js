const express = require("express");
const router = express.Router();
const {searchCompanies} = require("../controllers/searchController");

// GET /api/search/companies?query=...
router.get("/", searchCompanies);

module.exports = router;
