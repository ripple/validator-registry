'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {

    return queryInterface.createTable('CorrelationScores', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      cluster: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        notNull: true
      },
      date: {
        type: Sequelize.STRING,
        notNull: true
      },
      quorum: {
        type: Sequelize.INTEGER,
        notNull: true
      },
      coefficients: {
        type: Sequelize.JSON,
        notNull: true
      },
      createdAt: {
        type: Sequelize.DATE,
        notNull: true
      },
      updatedAt: {
        type: Sequelize.DATE,
        notNull: true
      }
    })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('CorrelationScores');
  }
};
