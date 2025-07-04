const { Company } = require("../models");
const supabase = require("../utils/supabaseClient");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  registerCompanySchema,
  loginCompanySchema,
  updateCompanySchema,
  uploadImageSchema,
} = require("../validators/zodSchemas");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;
// Register Company
exports.registerCompany = async (req, res) => {
  try {
    // Validate input
    const validatedData = registerCompanySchema.parse(req.body);

    const { email, password } = validatedData;

    // Check if company already exists
    const existingCompany = await Company.findOne({ where: { email } });
    if (existingCompany) {
      return res
        .status(400)
        .json({ message: "Company already registered with this email." });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create company
    const company = await Company.create({
      ...validatedData,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "Company registered successfully.",
      companyId: company.id,
    });
  } catch (error) {
    console.error("Registration error:", error);

    // Zod validation errors
    if (error.name === "ZodError") {
      const errorMsg = error.errors[0];
      return res.status(400).json({
        message: `${errorMsg.field || errorMsg.path[0]}: ${errorMsg.message}`,
      });
    }

    // Sequelize unique constraint errors
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(400).json({
        message: error.errors[0].message,
      });
    }
    res.status(500).json({ message: "Server error during registration." });
  }
};

// login by company details
exports.loginCompany = async (req, res) => {
  try {
    // Validate input
    const { email, password } = loginCompanySchema.parse(req.body);
    console.log(email, password);
    // Find company
    const company = await Company.findOne({ where: { email } });
    if (!company) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, company.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    // Generate JWT
    const token = jwt.sign({ companyId: company.id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({
      message: "Login successful.",
      token,
      company,
    });
  } catch (error) {
    console.error("Login error:", error.message);

    if (error.name === "ZodError") {
      const errorMsg = error.errors[0];

      return res.status(400).json({
        message: `${errorMsg.field || errorMsg.path[0]}: ${errorMsg.message}`,
      });
    }

    res.status(500).json({ message: "Server error during login." });
  }
};

// Get the logged-in company's details

exports.getLoggedInCompany = async (req, res, next) => {
  try {
    const companyId = req.company.companyId; // From auth middleware
    const company = await Company.findByPk(companyId, {
      attributes: { exclude: ["password"] }, // Never send password
    });

    if (!company) {
      return res.status(404).json({ message: "Company not found." });
    }

    res.json(company);
  } catch (err) {
    console.error("Error fetching company profile:", err);
    res.status(500).json({ message: "Server error fetching profile." });
  }
};

// Get all companies

exports.getCompanies = async (req, res, next) => {
  try {
    const companies = await Company.findAll();
    res.status(200).json(companies);
  } catch (err) {
    console.log("ERROR! to get companies: ", err);
    res.status(500).json({ message: err.message });
    next(err);
  }
};

// Get the authenticated user's company

exports.getCompany = async (req, res) => {
  try {
    const companyId = req.company.companyId;
    if (!companyId) {
      return res.status(403).json({ message: "No associated company." });
    }
    const company = await Company.findByPk(companyId);
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }
    res.json(company);
  } catch (err) {
    console.log("Error! to get the company data: ", err);
    return res.status(500).json({
      message: "Server error, to fetch the company data ",
    });
  }
};

//  Update a company

exports.updateCompany = async (req, res) => {
  try {
    const companyId = req.company.companyId;
    if (!companyId) {
      return res.status(403).json({ message: "No associated company." });
    }
    const company = await Company.findByPk(companyId);
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    const validated = updateCompanySchema.parse(req.body);

    await company.update(validated);

    res.json(company);
  } catch (err) {
    console.log("error!", err);
    if (err.name === "ZodError") {
      return res.status(400).json({
        message: "Validation failed",
        errors: err.errors,
      });
    }
  }
};

// Delete a company
exports.deleteCompany = async (req, res, next) => {
  try {
    const company = await Company.findByPk(req.params.id);
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    await company.destroy();

    res.json({ message: "Company deleted successfully!" });
  } catch (err) {
    next(err);
  }
};

// Upload logo
// Expects: { fileName, mimeType, fileBase64 }
exports.uploadLogo = async (req, res, next) => {
  try {
    const company = await Company.findByPk(req.params.id);
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    const validated = uploadImageSchema.parse(req.body);

    const ext = path.extname(validated.fileName);
    const filename = `logos/${uuidv4()}${ext}`;

    const buffer = Buffer.from(validated.fileBase64, "base64");

    const { error } = await supabase.storage
      .from("company-assets")
      .upload(filename, buffer, {
        contentType: validated.mimeType,
      });

    if (error) throw error;

    const {
      data: { publicUrl },
    } = supabase.storage.from("company-assets").getPublicUrl(filename);

    await company.update({ logoUrl: publicUrl });

    res.json({ logoUrl: publicUrl });
  } catch (err) {
    if (err.name === "ZodError") {
      return res.status(400).json({
        message: "Validation failed",
        errors: err.errors,
      });
    }
    next(err);
  }
};

/**
 * Upload image
 * Expects: { fileName, mimeType, fileBase64 }
 */
exports.uploadImage = async (req, res, next) => {
  try {
    const company = await Company.findByPk(req.params.id);
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    const validated = uploadImageSchema.parse(req.body);

    const ext = path.extname(validated.fileName);
    const filename = `images/${uuidv4()}${ext}`;

    const buffer = Buffer.from(validated.fileBase64, "base64");

    const { error } = await supabase.storage
      .from("company-assets")
      .upload(filename, buffer, {
        contentType: validated.mimeType,
      });

    if (error) throw error;

    const {
      data: { publicUrl },
    } = supabase.storage.from("company-assets").getPublicUrl(filename);

    await company.update({ images: publicUrl });

    res.json({ imageUrl: publicUrl });
  } catch (err) {
    if (err.name === "ZodError") {
      return res.status(400).json({
        message: "Validation failed",
        errors: err.errors,
      });
    }
    next(err);
  }
};
