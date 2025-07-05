"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Company extends Model {
    static associate(models) {
      Company.hasMany(models.Tender, { foreignKey: "companyId" });
      Company.hasMany(models.Application, { foreignKey: "companyId" });
      Company.hasMany(models.GoodsAndService, { foreignKey: "companyId" });
    }
  }
  Company.init(
    {
      name: DataTypes.STRING,
      industry: DataTypes.STRING,
      description: DataTypes.TEXT,
      logoUrl: DataTypes.STRING,
      images: DataTypes.STRING,
      address: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      phone: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Company",
    }
  );
  return Company;
};
