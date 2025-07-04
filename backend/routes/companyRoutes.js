const express = require("express");
const router = express.Router();
const {
  registerCompany,
  loginCompany,
  getLoggedInCompany,
  getCompanies,
  getCompany,
  updateCompany,
  deleteCompany,
  uploadLogo,
  uploadImage,
} = require("../controllers/companyController.js");
const { authMiddleware } = require("../middleware/authMiddleware.js");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/register", registerCompany);
router.post("/login", loginCompany);
router.get("/dashboard", authMiddleware, getLoggedInCompany);
router.get("/", getCompanies);
router.get("/single", authMiddleware, getCompany);
router.put("/", authMiddleware, updateCompany);
router.delete("/:id", authMiddleware, deleteCompany);
router.post("/:id/logo", authMiddleware, upload.single("logo"), uploadLogo);
router.post("/:id/image", authMiddleware, upload.single("image"), uploadImage);
module.exports = router;
