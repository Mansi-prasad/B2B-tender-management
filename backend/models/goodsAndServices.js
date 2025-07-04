"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class GoodsAndService extends Model {
    static associate(models) {
      GoodsAndService.belongsTo(models.Company, { foreignKey: "companyId" });
    }
  }
  GoodsAndService.init(
    {
      companyId: DataTypes.INTEGER,
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "GoodsAndService",
    }
  );
  return GoodsAndService;
};
