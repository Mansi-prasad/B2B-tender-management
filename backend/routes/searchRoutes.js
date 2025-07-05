const express = require("express");
const router = express.Router();
const {searchCompanies} = require("../controllers/searchController");

router.get("/", searchCompanies);

module.exports = router;
