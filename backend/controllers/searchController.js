const { Company } = require("../models");
const { Op } = require("sequelize");

// Search companies by name or industry only
exports.searchCompanies = async (req, res, next) => {
  try {
    const { query } = req.query;

    if (!query || query.trim() === "") {
      return res.status(400).json({ message: "Search Query parameter is required" });
    }

    const companies = await Company.findAll({
      where: {
        [Op.or]: [
          { name: { [Op.iLike]: `%${query}%` } },
          { industry: { [Op.iLike]: `%${query}%` } },
        ],
      },
      attributes: { exclude: ["password"] },
    });

    res.json(companies);
  } catch (err) {
    next(err);
  }
};
