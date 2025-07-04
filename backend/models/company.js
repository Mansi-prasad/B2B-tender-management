// module.exports = (sequelize, DataTypes) => {
//   const Company = sequelize.define("Company", {
//     name: DataTypes.STRING,
//     industry: DataTypes.STRING,
//     description: DataTypes.TEXT,
//     logoUrl: DataTypes.STRING,
//     images: DataTypes.STRING,
//     address: DataTypes.STRING,
//     email: DataTypes.STRING,
//     phone: DataTypes.STRING,
//   });
//   Company.associate = (models) => {
//     Company.hasMany(models.Tender, { foreignKey: "companyId" });
//     Company.hasMany(models.Application, { foreignKey: "companyId" });
//     Company.hasMany(models.GoodsAndServices, { foreignKey: "companyId" });
//   };
//   return Company;
// };


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
