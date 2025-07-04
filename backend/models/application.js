"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Application extends Model {
    static associate(models) {
      Application.belongsTo(models.Tender, { foreignKey: "tenderId" });
      Application.belongsTo(models.Company, { foreignKey: "companyId" });
    }
  }
  Application.init(
    {
      tenderId: DataTypes.INTEGER,
      companyId: DataTypes.INTEGER,
      proposalText: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Application",
    }
  );
  return Application;
};
