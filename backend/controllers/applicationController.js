const { Application, Company, Tender, User } = require("../models");
const { createApplicationSchema } = require("../validators/zodSchemas");

exports.submitApplication = async (req, res) => {
  try {
    const { tenderId, proposalText } = createApplicationSchema.parse(req.body);

    // Pull companyId from the authenticated user
    const companyId = req.user.companyId;

    if (!companyId) {
      return res
        .status(403)
        .json({ message: "Unauthorized: No company assigned to user" });
    }

    // Confirm tender exists
    const tender = await Tender.findByPk(tenderId);
    if (!tender) {
      return res.status(404).json({ message: "Tender not found" });
    }

    // Prevent duplicate applications
    const existing = await Application.findOne({
      where: { tenderId, companyId },
    });

    if (existing) {
      return res
        .status(400)
        .json({ message: "Already applied to this tender" });
    }

    // Create the application
    const application = await Application.create({
      tenderId,
      companyId,
      proposalText,
    });

    res.status(201).json(application);
  } catch (err) {
    console.error("Submit application error:", err);
    if (err.name === "ZodError") {
      return res.status(400).json({
        message: "Validation failed",
        errors: err.errors,
      });
    }
  }
};

// Get all applications for a tender
exports.getTenderApplications = async (req, res) => {
  try {
    const tender = await Tender.findByPk(req.params.tenderId);
    if (!tender) {
      return res.status(404).json({ message: "Tender not found" });
    }

    const applications = await Application.findAll({
      where: { tenderId: req.params.tenderId },
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: Company,
          attributes: ["id", "name", "industry"],
        },
      ],
    });

    res.json(applications);
  } catch (err) {
    console.error("Get applications error:", err);
  }
};

// delete application
exports.deleteApplication = async (req, res) => {
  try {
    const applicationId = req.params.id;

    // Check if the application exists
    const application = await Application.findByPk(applicationId);
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    // Delete the application
    await application.destroy();

    res.json({ message: "Application deleted successfully." });
  } catch (err) {
    console.error("Delete application error:", err);
  }
};
