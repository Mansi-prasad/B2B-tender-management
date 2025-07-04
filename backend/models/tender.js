"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Tender extends Model {
    static associate(models) {
      Tender.belongsTo(models.Company, { foreignKey: "companyId" });
      Tender.hasMany(models.Application, { foreignKey: "tenderId" });
    }
  }
  Tender.init(
    {
      companyId: DataTypes.INTEGER,
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
      deadline: DataTypes.DATE,
      budget: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: "Tender",
    }
  );
  return Tender;
};
