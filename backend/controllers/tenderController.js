const { Tender, Company } = require("../models");
const {
  createTenderSchema,
  updateTenderSchema,
} = require("../validators/zodSchemas");

// Create tender
// exports.createTender = async (req, res) => {
//   try {
//     const validated = createTenderSchema.parse(req.body);

//     const company = await Company.findByPk(validated.companyId);
//     if (!company) {
//       return res.status(404).json({ message: "Company not found" });
//     }

//     const tender = await Tender.create(validated);
//     res.status(201).json(tender);
//   } catch (error) {
//     // Zod validation errors
//     if (error.name === "ZodError") {
//       const errorMsg = error.errors[0];
//       return res.status(400).json({
//         message: `${errorMsg.field || errorMsg.path[0]}: ${errorMsg.message}`,
//       });
//     }

//     // Sequelize unique constraint errors
//     if (error.name === "SequelizeUniqueConstraintError") {
//       return res.status(400).json({
//         message: error.errors[0].message,
//       });
//     }
//     res.status(500).json({ message: "Server error during creating tender." });
//   }
// };

exports.createTender = async (req, res) => {
  try {
    const validated = createTenderSchema.parse(req.body);

    const companyId = req.company.companyId; // automatically from middleware
    if (!companyId) {
      return res
        .status(401)
        .json({ message: "Unauthorized. Company ID missing." });
    }

    const company = await Company.findByPk(companyId);
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    const tender = await Tender.create({
      ...validated,
      companyId, // inject the companyId
    });

    res.status(201).json(tender);
  } catch (error) {
    if (error.name === "ZodError") {
      const errorMsg = error.errors[0];
      return res.status(400).json({
        message: `${errorMsg.field || errorMsg.path[0]}: ${errorMsg.message}`,
      });
    }
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(400).json({
        message: error.errors[0].message,
      });
    }
    res.status(500).json({ message: "Server error during creating tender." });
  }
};

// Get all tenders
exports.getAllTenders = async (req, res) => {
  try {
    const tenders = await Tender.findAll({
      order: [["createdAt", "DESC"]],
    });
    res.json({
      total: tenders.length,
      tenders,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error getting all tenders." });
  }
};

// Get tender by ID
exports.getTender = async (req, res, next) => {
  try {
    const tender = await Tender.findByPk(req.params.id);
    if (!tender) {
      return res.status(404).json({ message: "Tender not found" });
    }
    res.json(tender);
  } catch (err) {
    console.error("Error fetching tender:", err);
    res.status(500).json({ message: "Server error." });
  }
};

// Update tender
// exports.updateTender = async (req, res) => {
//   try {
//     const validated = updateTenderSchema.parse(req.body);

//     const tender = await Tender.findByPk(req.params.id);
//     if (!tender) {
//       return res.status(404).json({ message: "Tender not found" });
//     }

//     await tender.update(validated);
//     res.json({ message: "Tender updated successfully.", tender });
//   } catch (err) {
//     if (err.name === "ZodError") {
//       return res
//         .status(400)
//         .json({ message: "Validation failed", errors: err.errors });
//     }
//     // Sequelize unique constraint errors
//     if (err.name === "SequelizeUniqueConstraintError") {
//       return res.status(400).json({
//         message: err.errors[0].message,
//       });
//     }
//     console.error(err);
//     res.status(500).json({ message: "Server error updating tender." });
//   }
// };

// Update tender
exports.updateTender = async (req, res) => {
  try {
    // Validate the body
    const validated = updateTenderSchema.parse(req.body);

    // Find the tender
    const tender = await Tender.findByPk(req.params.id);
    if (!tender) {
      return res.status(404).json({
        message: "Tender not found.",
        errors: [],
      });
    }

    // Update
    await tender.update(validated);

    res.json({
      message: "Tender updated successfully.",
      tender,
    });
  } catch (err) {
    console.error("Error updating tender:", err);

    // Zod validation errors
    if (err.name === "ZodError") {
      return res.status(400).json({
        message: "Validation failed.",
        errors: err.errors.map((e) => ({
          field: e.path?.[0],
          message: e.message,
        })),
      });
    }

    // Sequelize unique constraint errors
    if (err.name === "SequelizeUniqueConstraintError") {
      return res.status(400).json({
        message: "Database constraint error.",
        errors: err.errors.map((e) => ({
          field: e.path,
          message: e.message,
        })),
      });
    }

    // Any other error
    res.status(500).json({
      message: "Server error updating tender.",
      errors: [],
    });
  }
};

// Delete tender
exports.deleteTender = async (req, res) => {
  try {
    const tender = await Tender.findByPk(req.params.id);
    if (!tender) {
      return res.status(404).json({ message: "Tender not found" });
    }
    await tender.destroy();
    res.json({ message: "Tender deleted successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error deleting tender." });
  }
};

// Get tenders for a specific company
exports.getCompanyTenders = async (req, res) => {
  try {
    const companyId = req.company.companyId;
    if (!companyId) {
      return res.status(400).json({ message: "No companyId in token." });
    }
    const tenders = await Tender.findAll({
      where: { companyId },
      order: [["createdAt", "DESC"]],
    });

    res.json(tenders);
  } catch (err) {
    console.error("Error fetching tenders:", err.message);
    res.status(500).json({ message: "Server error fetching tenders." });
  }
};
