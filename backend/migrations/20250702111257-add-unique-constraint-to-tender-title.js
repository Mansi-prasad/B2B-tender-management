'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.addConstraint("Tenders", {
      fields: ["title"],
      type: "unique",
      name: "unique_tender_title" // 👈 custom constraint name
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint("Tenders", "unique_tender_title");
  }
};
